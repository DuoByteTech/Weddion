import { Sparkles } from "lucide-react";

import { AppContainer } from "@/components/ui/AppContainer";
import { AppText } from "@/components/ui/AppText";

export function PricingHero() {
  return (
    <section className="relative pt-16 pb-10 sm:pt-20 lg:pt-24">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primaryLight/45 blur-[120px]" />

      <AppContainer className="!max-w-[1000px] text-center">
        <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-primaryLight bg-white/70 px-4 py-2 shadow-cardSoft">
          <Sparkles size={15} className="text-primaryDark" />

          <span className="font-manropeSemiBold text-xs text-primaryDark sm:text-sm">
            Lansmana özel
          </span>
        </div>

        <AppText
          as="h1"
          variant="serifTitle"
          className="mx-auto max-w-[850px] !leading-[0.98]"
        >
          Düğününü planlarken
          <span className="block text-primaryDark">ücretleri düşünme.</span>
        </AppText>

        <AppText
          variant="body"
          className="mx-auto mt-6 max-w-[660px] !text-sm !leading-7 sm:!text-base"
        >
          Weddion&apos;un sunduğu özellikleri lansman döneminde ücretsiz
          kullanabilirsin. Davetiyeni oluştur, anılarını topla ve düğün
          hazırlıklarını tek yerden yönet.
        </AppText>
      </AppContainer>
    </section>
  );
}
