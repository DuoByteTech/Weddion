import type { GuestInvitation } from "@/features/guest-access/types/guest-access.types";
import { supabase } from "@/lib/supabase";
import {
  finalizeGuestPhotoUpload,
  uploadGuestPhotoSecurely,
} from "@/services/r2ImageService";
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
  if (file.type && file.type.startsWith("image/")) {
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

    case "jpg":
    default:
      return "image/jpeg";
  }
}

export async function getInvitationByGuestSlug(
  slug: string,
): Promise<GuestInvitation | null> {
  const normalizedSlug = slug.trim();

  if (!normalizedSlug) {
    return null;
  }

  const { data, error } = await supabase.rpc(
    "get_invitation_for_guest_by_slug",
    {
      target_slug: normalizedSlug,
    },
  );

  if (error) {
    throw new Error(error.message);
  }

  return (data?.[0] ?? null) as GuestInvitation | null;
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

  const createdPhotos: UploadedGuestPhotoRecord[] = [];

  try {
    for (const file of files) {
      /*
       * Fotoğrafı web tarafında maksimum
       * 3 MB olacak şekilde hazırla.
       */
      const preparedFile = await compressGuestPhoto(file);

      const contentType = getContentType(preparedFile);

      const fileSize = preparedFile.size;

      /*
       * Client-side temel kontrol.
       *
       * Asıl güvenlik Supabase
       * guest-photo-upload Edge Function'da.
       */
      if (!Number.isFinite(fileSize) || fileSize <= 0) {
        throw new Error(`"${file.name}" dosyasının boyutu belirlenemedi.`);
      }

      /*
       * Güvenli yükleme akışı:
       *
       * 1. create-upload
       * 2. invitation + upload code kontrolü
       * 3. server R2 key üretir
       * 4. kısa süreli presigned URL alınır
       * 5. browser doğrudan R2'ye yükler
       * 6. confirm-upload
       * 7. R2 HEAD kontrolü
       * 8. gerçek boyut / MIME kontrolü
       * 9. DB kaydı
       */
      const uploadResult = await uploadGuestPhotoSecurely({
        invitationId,
        guestUploadCode: normalizedCode,
        file: preparedFile,
        contentType,
        fileSize,
      });

      createdPhotos.push(uploadResult.photo as UploadedGuestPhotoRecord);
    }

    /*
     * Tüm fotoğraflar başarıyla yüklendikten sonra
     * yalnızca oluşmuş gerçek DB kayıtlarının ID'lerini
     * backend'e gönderiyoruz.
     *
     * Backend bu fotoğrafları doğrular ve
     * yükleme başına tek bildirim oluşturur.
     */
    if (createdPhotos.length > 0) {
      await finalizeGuestPhotoUpload({
        invitationId,
        guestUploadCode: normalizedCode,
        photoIds: createdPhotos.map((photo) => photo.id),
      });
    }

    return true;
  } catch (error) {
    console.error("Guest photo upload error:", error);

    throw new Error(
      error instanceof Error ? error.message : "Fotoğraflar yüklenemedi.",
    );
  }
}
