import { Images, Trash2, X } from "lucide-react";

import { AppButton } from "@/components/ui/AppButton";
import { AppText } from "@/components/ui/AppText";

export type SelectedGuestPhoto = {
  id: string;
  file: File;
  previewUrl: string;
};

type SelectedPhotosSectionProps = {
  photos: SelectedGuestPhoto[];
  onRemove: (id: string) => void;
  onRemoveAll: () => void;
};

export function SelectedPhotosSection({
  photos,
  onRemove,
  onRemoveAll,
}: SelectedPhotosSectionProps) {
  const count = photos.length;

  return (
    <section className="border-t border-borderSoft pt-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AppText
            as="h2"
            variant="serifSubtitle"
            className="!text-[28px] sm:!text-[32px]"
          >
            Seçilen Fotoğraflar
          </AppText>

          <div className="flex h-9 min-w-9 items-center justify-center rounded-full bg-primarySoft px-3">
            <AppText
              variant="subtitle"
              className="!text-[14px] text-primaryDark"
            >
              {count}
            </AppText>
          </div>
        </div>

        {count > 0 ? (
          <AppButton
            type="button"
            variant="ghost"
            onClick={onRemoveAll}
            className="!h-9 !px-3"
          >
            <Trash2 size={16} />
            Tümünü Kaldır
          </AppButton>
        ) : null}
      </div>

      {count === 0 ? (
        <div className="mt-6 flex min-h-[150px] flex-col items-center justify-center rounded-[26px] border-2 border-primaryLight bg-primarySoft/30 px-5 py-8 text-center sm:min-h-[170px]">
          <Images size={48} strokeWidth={1.6} className="text-primaryDark" />

          <AppText
            variant="body"
            className="mt-3 !text-[13px] text-textMuted sm:!text-[14px]"
          >
            Henüz fotoğraf seçilmedi...
          </AppText>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-primarySoft"
            >
              <img
                src={photo.previewUrl}
                alt={photo.file.name}
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                onClick={() => onRemove(photo.id)}
                aria-label="Fotoğrafı kaldır"
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm"
              >
                <X size={17} strokeWidth={2.2} />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
