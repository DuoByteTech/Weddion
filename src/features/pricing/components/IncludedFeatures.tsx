import { AppContainer } from "@/components/ui/AppContainer";
import { AppText } from "@/components/ui/AppText";

import { features } from "@/features/product-features/data//features.data";

export function IncludedFeatures() {
  return (
    <section className="py-16 sm:py-20">
      <AppContainer className="!max-w-[1200px]">
        <div className="mx-auto mb-10 max-w-[650px] text-center sm:mb-14">
          <AppText
            variant="captionStrong"
            className="mb-3 uppercase tracking-[0.16em]"
          >
            Neler dahil?
          </AppText>

          <AppText
            as="h2"
            variant="serifTitle"
            className="!text-4xl sm:!text-5xl"
          >
            Tek plan. Tüm Weddion.
          </AppText>

          <AppText
            variant="body"
            className="mx-auto mt-4 max-w-[560px] !leading-6"
          >
            Karmaşık paketler veya özellik karşılaştırmaları yok. Mevcut Weddion
            deneyimini lansman döneminde ücretsiz kullan.
          </AppText>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-borderSoft bg-white/65 p-6 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-cardSoft"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-primarySoft">
                <Icon size={20} className="text-primaryDark" />
              </div>

              <AppText as="h3" variant="subtitle" className="!text-base">
                {title}
              </AppText>

              <AppText variant="body" className="mt-2 !leading-6">
                {description}
              </AppText>
            </div>
          ))}
        </div>
      </AppContainer>
    </section>
  );
}
