import { supabase } from "@/lib/supabase";
import { deleteR2Object, uploadFileToR2 } from "@/services/r2ImageService";
import { compressGuestPhoto } from "@/utils/imageCompression";

type UploadGuestPhotosParams = {
  invitationId: string;
  guestUploadCode: string;
  files: File[];
};

type UploadedGuestPhotoRecord = {
  id: string;
  invitation_id: string;
  storage_path: string;
  upload_code: string;
  status: string;
  created_at: string;
  expires_at: string;
};

function normalizeGuestUploadCode(code: string) {
  return code.trim().toUpperCase();
}

function getExtension(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (
    extension === "png" ||
    extension === "webp" ||
    extension === "heic" ||
    extension === "heif" ||
    extension === "jpeg" ||
    extension === "jpg"
  ) {
    return extension === "jpeg" ? "jpg" : extension;
  }

  return "jpg";
}

function getContentType(file: File) {
  if (file.type.startsWith("image/")) {
    return file.type;
  }

  const extension = getExtension(file);

  switch (extension) {
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "heic":
      return "image/heic";
    case "heif":
      return "image/heif";
    default:
      return "image/jpeg";
  }
}

function buildGuestPhotoPath(
  invitationId: string,
  guestUploadCode: string,
  file: File,
) {
  const extension = getExtension(file);

  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}.${extension}`;

  return `guest-photos/${invitationId}/${normalizeGuestUploadCode(
    guestUploadCode,
  )}/${fileName}`;
}

export async function uploadGuestPhotos({
  invitationId,
  guestUploadCode,
  files,
}: UploadGuestPhotosParams) {
  if (files.length === 0) {
    return true;
  }

  const normalizedCode = normalizeGuestUploadCode(guestUploadCode);
  const uploadedPaths: string[] = [];
  const createdPhotos: UploadedGuestPhotoRecord[] = [];

  try {
    for (const file of files) {
      const preparedFile = await compressGuestPhoto(file);

      const storagePath = buildGuestPhotoPath(
        invitationId,
        normalizedCode,
        preparedFile,
      );

      const contentType = getContentType(preparedFile);

      await uploadFileToR2({
        file: preparedFile,
        key: storagePath,
        contentType,
        requireAuth: false,
      });

      uploadedPaths.push(storagePath);

      const { data, error } = await supabase.rpc("upload_guest_photo_record", {
        target_invitation_id: invitationId,
        target_upload_code: normalizedCode,
        target_storage_path: storagePath,
      });

      if (error) {
        try {
          await deleteR2Object(storagePath, false);
        } catch (rollbackError) {
          console.error("R2 rollback hatası:", rollbackError);
        }

        if (error.message.includes("GUEST_PHOTO_LIMIT_REACHED")) {
          throw new Error(
            "Fotoğraf yükleme limiti doldu. Bu hesap için en fazla 100 aktif fotoğraf bulunabilir.",
          );
        }

        throw new Error(error.message);
      }

      if (data) {
        createdPhotos.push(data as UploadedGuestPhotoRecord);
      }
    }

    if (createdPhotos.length > 0) {
      const { error: notificationError } = await supabase.rpc(
        "create_guest_photo_upload_notification",
        {
          target_invitation_id: invitationId,
          target_upload_code: normalizedCode,
          target_photo_count: createdPhotos.length,
          target_first_photo_id: createdPhotos[0]?.id ?? null,
        },
      );

      if (notificationError) {
        console.error("Guest photo notification error:", notificationError);
      }
    }

    return true;
  } catch (error) {
    await Promise.allSettled(
      uploadedPaths.map((path) => deleteR2Object(path, false)),
    );

    throw new Error(
      error instanceof Error ? error.message : "Fotoğraflar yüklenemedi.",
    );
  }
}
