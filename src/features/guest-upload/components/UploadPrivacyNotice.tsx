import { ShieldCheck } from "lucide-react";

import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";

export function UploadPrivacyNotice() {
  return (
    <AppCard className="!rounded-[24px] bg-primarySoft/50 !p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/60 text-primaryDark">
          <ShieldCheck size={26} strokeWidth={1.8} />
        </div>

        <AppText
          variant="body"
          className="!text-[13px] leading-6 text-textMuted sm:!text-[14px]"
        >
          Yüklediğiniz fotoğraflar sadece etkinlik sahipleri tarafından
          görüntülenebilir.
        </AppText>
      </div>
    </AppCard>
  );
}
