import { QrCode } from "lucide-react";

import { AppCard, AppText } from "@/components/ui";

export function QrScanInfoCard() {
  return (
    <AppCard className="w-full rounded-t-[32px] rounded-b-none bg-white px-6 py-8 sm:px-10 sm:py-10">
      <div className="mx-auto flex max-w-[560px] flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primarySoft text-primaryDark sm:h-[72px] sm:w-[72px]">
          <QrCode size={32} strokeWidth={2} />
        </div>

        <AppText
          as="h1"
          variant="serifSubtitle"
          className="mt-6 !text-[30px] font-medium leading-tight text-textDark sm:!text-[34px]"
        >
          QR Kodu Okut
        </AppText>

        <AppText
          variant="body"
          className="mt-5 max-w-[470px] !text-[14px] leading-7 text-textMuted sm:!text-[15px]"
        >
          Davetiyedeki QR kodu kamera alanına getirin. Kod okunduğunda fotoğraf
          yükleme ekranına otomatik yönlendirileceksiniz.
        </AppText>
      </div>
    </AppCard>
  );
}
