import { Images } from "lucide-react";

import { AppText } from "@/components/ui/AppText";

type SelectedPhotosSectionProps = {
  count?: number;
};

export function SelectedPhotosSection({
  count = 0,
}: SelectedPhotosSectionProps) {
  return (
    <section className="border-t border-borderSoft pt-8">
      <div className="flex items-center gap-3">
        <AppText
          as="h2"
          variant="serifSubtitle"
          className="!text-[28px] sm:!text-[32px]"
        >
          Seçilen Fotoğraflar
        </AppText>

        <div className="flex h-9 min-w-9 items-center justify-center rounded-full bg-primarySoft px-3">
          <AppText variant="subtitle" className="!text-[14px] text-primaryDark">
            {count}
          </AppText>
        </div>
      </div>

      <div className="mt-6 flex min-h-[150px] flex-col items-center justify-center rounded-[26px] border-2 border-primaryLight bg-primarySoft/30 px-5 py-8 text-center sm:min-h-[170px]">
        <Images size={48} strokeWidth={1.6} className="text-primaryDark" />

        <AppText
          variant="body"
          className="mt-3 !text-[13px] text-textMuted sm:!text-[14px]"
        >
          Henüz fotoğraf seçilmedi...
        </AppText>
      </div>
    </section>
  );
}
