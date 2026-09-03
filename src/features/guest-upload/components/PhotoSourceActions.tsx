import { Camera, Images } from "lucide-react";

import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";

type PhotoSourceActionsProps = {
  onCameraCapture: () => void;
  onGallerySelect: () => void;
};

export function PhotoSourceActions({
  onCameraCapture,
  onGallerySelect,
}: PhotoSourceActionsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      <AppCard
        onClick={onCameraCapture}
        className="cursor-pointer border border-borderSoft !p-4 transition hover:border-primaryLight hover:bg-primarySoft/30 sm:!p-5"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primarySoft text-primaryDark sm:h-14 sm:w-14">
            <Camera size={24} strokeWidth={1.9} />
          </div>

          <div className="min-w-0">
            <AppText
              as="h3"
              variant="subtitle"
              className="!text-[14px] text-primaryDark sm:!text-[16px]"
            >
              Fotoğraf çek
            </AppText>

            <AppText
              variant="caption"
              className="mt-1 !text-[12px] sm:!text-[13px]"
            >
              Kamerayı aç
            </AppText>
          </div>
        </div>
      </AppCard>

      <AppCard
        onClick={onGallerySelect}
        className="cursor-pointer border border-borderSoft !p-4 transition hover:border-primaryLight hover:bg-primarySoft/30 sm:!p-5"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primarySoft text-primaryDark sm:h-14 sm:w-14">
            <Images size={24} strokeWidth={1.9} />
          </div>

          <div className="min-w-0">
            <AppText
              as="h3"
              variant="subtitle"
              className="!text-[14px] text-primaryDark sm:!text-[16px]"
            >
              Galeriden seç
            </AppText>

            <AppText
              variant="caption"
              className="mt-1 !text-[12px] sm:!text-[13px]"
            >
              Cihazınızdan seçin
            </AppText>
          </div>
        </div>
      </AppCard>
    </div>
  );
}
