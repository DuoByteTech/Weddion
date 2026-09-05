import { Heart, Images, QrCode, Sparkles } from "lucide-react";

import { AppContainer } from "@/components/ui/AppContainer";
import { AppText } from "@/components/ui/AppText";

export function FeaturesHero() {
  return (
    <section className="relative pt-12 pb-10 sm:pt-16 lg:pt-20">
      <AppContainer className="!max-w-[1200px]">
        <div className="mx-auto max-w-[840px] text-center">
          <div
            className="
              mx-auto mb-6 flex w-fit items-center gap-2
              rounded-full border border-borderSoft
              bg-white/70 px-4 py-2
              shadow-sm backdrop-blur
            "
          >
            <Sparkles size={16} className="text-primaryDark" />

            <AppText as="span" variant="captionStrong" className="!text-[12px]">
              Özel günün için tasarlandı
            </AppText>
          </div>

          <AppText
            as="h1"
            variant="serifTitle"
            className="
              !text-[48px]
              leading-[0.95]
              sm:!text-[64px]
              lg:!text-[76px]
            "
          >
            Düğününün her anı
            <br />
            <span className="text-primaryDark">Weddion'da</span>
          </AppText>

          <AppText
            variant="body"
            className="
              mx-auto mt-7 max-w-[650px]
              !text-[15px] leading-7
              sm:!text-[16px]
            "
          >
            Dijital davetiyeler oluştur, misafirlerinle bağlantıda kal ve özel
            gününün tüm anılarını tek bir yerde topla.
          </AppText>
        </div>

        <div className="mx-auto mt-12 grid max-w-[800px] grid-cols-3 gap-3 sm:gap-5">
          <div
            className="
              flex flex-col items-center justify-center
              rounded-2xl border border-borderSoft
              bg-white/70 px-3 py-5
              text-center shadow-cardSoft
              backdrop-blur
            "
          >
            <QrCode size={25} className="mb-3 text-primaryDark" />

            <AppText
              variant="captionStrong"
              className="!text-[11px] sm:!text-[13px]"
            >
              Kolay Paylaşım
            </AppText>
          </div>

          <div
            className="
              flex flex-col items-center justify-center
              rounded-2xl border border-borderSoft
              bg-white/70 px-3 py-5
              text-center shadow-cardSoft
              backdrop-blur
            "
          >
            <Images size={25} className="mb-3 text-primaryDark" />

            <AppText
              variant="captionStrong"
              className="!text-[11px] sm:!text-[13px]"
            >
              Ortak Galeri
            </AppText>
          </div>

          <div
            className="
              flex flex-col items-center justify-center
              rounded-2xl border border-borderSoft
              bg-white/70 px-3 py-5
              text-center shadow-cardSoft
              backdrop-blur
            "
          >
            <Heart size={25} className="mb-3 text-primaryDark" />

            <AppText
              variant="captionStrong"
              className="!text-[11px] sm:!text-[13px]"
            >
              Tüm Anılar
            </AppText>
          </div>
        </div>
      </AppContainer>
    </section>
  );
}
