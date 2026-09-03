import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppBackButton } from "@/components/ui/AppBackButton";
import { AppButton } from "@/components/ui/AppButton";
import { AppContainer } from "@/components/ui/AppContainer";
import { AppText } from "@/components/ui/AppText";
import { GuestEventHero } from "../components/GuestEventHero";
import { PhotoSourceActions } from "../components/PhotoSourceActions";
import {
  SelectedPhotosSection,
  type SelectedGuestPhoto,
} from "../components/SelectedPhotosSection";
import { UploadPrivacyNotice } from "../components/UploadPrivacyNotice";
import type { GuestInvitation } from "@/features/guest-access/types/guest-access.types";
import type { GuestEventInfo } from "../types/guest-upload.types";
import { uploadGuestPhotos } from "@/services/guestPhotoService";

const MAX_PHOTOS_PER_UPLOAD = 20;

type GuestUploadLocationState = {
  invitation?: GuestInvitation;
};

export function GuestPhotoUploadPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedGuestPhoto[]>(
    [],
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { invitation } =
    (location.state as GuestUploadLocationState | null) ?? {};

  const event: GuestEventInfo | null = invitation
    ? {
        brideName: invitation.bride_name,
        groomName: invitation.groom_name,
        eventDate: invitation.event_date,
        eventTime: invitation.event_time ?? "",
      }
    : null;

  useEffect(() => {
    return () => {
      selectedPhotos.forEach((photo) => {
        URL.revokeObjectURL(photo.previewUrl);
      });
    };
  }, []);

  const handleGallerySelect = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    fileInputRef.current?.click();
  };

  const handleCameraCapture = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    cameraInputRef.current?.click();
  };

  const addSelectedFiles = (files: File[]) => {
    if (files.length === 0) {
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);

    const remainingPhotoCount = MAX_PHOTOS_PER_UPLOAD - selectedPhotos.length;

    if (remainingPhotoCount <= 0) {
      setErrorMessage("Tek seferde en fazla 20 fotoğraf seçebilirsiniz.");
      return;
    }

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length !== files.length) {
      setErrorMessage("Sadece fotoğraf dosyaları seçebilirsiniz.");
    }

    const acceptedFiles = imageFiles.slice(0, remainingPhotoCount);

    if (imageFiles.length > remainingPhotoCount) {
      setErrorMessage(
        `Tek seferde en fazla ${MAX_PHOTOS_PER_UPLOAD} fotoğraf seçebilirsiniz.`,
      );
    }

    const newPhotos: SelectedGuestPhoto[] = acceptedFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setSelectedPhotos((currentPhotos) => [...currentPhotos, ...newPhotos]);
  };

  const handleFilesSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    addSelectedFiles(files);
    event.target.value = "";
  };

  const handleCameraSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    addSelectedFiles(files);
    event.target.value = "";
  };

  const handleRemovePhoto = (id: string) => {
    setSelectedPhotos((currentPhotos) => {
      const photoToRemove = currentPhotos.find((photo) => photo.id === id);

      if (photoToRemove) {
        URL.revokeObjectURL(photoToRemove.previewUrl);
      }

      return currentPhotos.filter((photo) => photo.id !== id);
    });

    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleRemoveAll = () => {
    selectedPhotos.forEach((photo) => {
      URL.revokeObjectURL(photo.previewUrl);
    });

    setSelectedPhotos([]);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleUploadPhotos = async () => {
    if (!invitation) {
      setErrorMessage("Etkinlik bilgisi bulunamadı.");
      return;
    }

    if (selectedPhotos.length === 0) {
      return;
    }

    if (!invitation.guest_upload_code) {
      setErrorMessage("Etkinlik yükleme kodu bulunamadı.");
      return;
    }

    try {
      setIsUploading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      const uploadCount = selectedPhotos.length;

      await uploadGuestPhotos({
        invitationId: invitation.id,
        guestUploadCode: invitation.guest_upload_code,
        files: selectedPhotos.map((photo) => photo.file),
      });

      selectedPhotos.forEach((photo) => {
        URL.revokeObjectURL(photo.previewUrl);
      });

      setSelectedPhotos([]);

      setSuccessMessage(
        uploadCount > 1
          ? `${uploadCount} fotoğraf başarıyla yüklendi.`
          : "Fotoğraf başarıyla yüklendi.",
      );
    } catch (error) {
      console.error("Fotoğraf yükleme hatası:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Fotoğraflar yüklenemedi. Lütfen tekrar deneyin.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  if (!event) {
    return (
      <main className="relative min-h-screen bg-background">
        <AppBackButton onClick={() => navigate("/guest-access")} />
        <AppContainer className="!max-w-[620px] py-24">
          <div className="text-center">
            <AppText
              as="h1"
              variant="serifTitle"
              className="!text-[38px] leading-none"
            >
              Etkinlik bulunamadı
            </AppText>
            <AppText variant="body" className="mt-4 leading-7 text-textMuted">
              Fotoğraf yüklemek için geçerli bir etkinlik kodu veya QR kod
              kullanmalısınız.
            </AppText>
            <AppButton
              type="button"
              onClick={() => navigate("/guest-access")}
              className="mx-auto mt-7"
            >
              Etkinlik Kodu Gir
            </AppButton>
          </div>
        </AppContainer>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-background">
      <AppContainer className="!max-w-[860px] py-6 sm:py-8 lg:py-10">
        <AppBackButton onClick={() => navigate(-1)} />
        <GuestEventHero event={event} />
        <section className="mt-8">
          <div className="flex items-center gap-2">
            <AppText
              as="h2"
              variant="serifTitle"
              className="!text-[34px] leading-none sm:!text-[42px]"
            >
              Anılarınızı paylaşın
            </AppText>
            <Sparkles
              size={28}
              strokeWidth={1.8}
              className="text-primaryDark"
            />
          </div>
          <AppText
            variant="body"
            className="mt-3 !text-[14px] leading-6 text-textMuted sm:!text-[15px]"
          >
            Bu özel günden fotoğraflarınızı etkinlik galerisine yükleyin.
          </AppText>
        </section>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesSelected}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleCameraSelected}
          className="hidden"
        />
        <div className="mt-7">
          <PhotoSourceActions
            onCameraCapture={handleCameraCapture}
            onGallerySelect={handleGallerySelect}
          />
        </div>
        {errorMessage ? (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
            <AppText variant="body" className="!text-[13px] !text-red-500">
              {errorMessage}
            </AppText>
          </div>
        ) : null}
        {successMessage ? (
          <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3">
            <AppText variant="body" className="!text-[13px] !text-green-700">
              {successMessage}
            </AppText>
          </div>
        ) : null}
        <div className="mt-9">
          <SelectedPhotosSection
            photos={selectedPhotos}
            onRemove={handleRemovePhoto}
            onRemoveAll={handleRemoveAll}
          />
        </div>
        <div className="mt-8">
          <UploadPrivacyNotice />
        </div>
        <AppButton
          type="button"
          disabled={selectedPhotos.length === 0 || isUploading}
          onClick={() => {
            void handleUploadPhotos();
          }}
          className="mt-9 w-full"
        >
          {isUploading
            ? "Fotoğraflar Yükleniyor..."
            : `Fotoğrafları Yükle${
                selectedPhotos.length > 0 ? ` (${selectedPhotos.length})` : ""
              }`}
        </AppButton>
      </AppContainer>
    </main>
  );
}
