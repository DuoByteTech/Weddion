import { AppContainer } from "@/components/ui/AppContainer";
import { AppText } from "@/components/ui/AppText";

import { features } from "../data/features.data";

import { FeatureCard } from "./FeatureCard";

export function FeaturesGrid() {
  return (
    <section className="relative py-10 sm:py-14 lg:py-16">
      <AppContainer className="!max-w-[1200px]">
        <div className="mx-auto mb-10 max-w-[680px] text-center sm:mb-12">
          <AppText
            as="p"
            variant="captionStrong"
            className="uppercase tracking-[0.18em]"
          >
            Weddion ile
          </AppText>

          <AppText
            as="h2"
            variant="serifSubtitle"
            className="mt-3 !text-[34px] sm:!text-[42px]"
          >
            Düğün sürecinin her anı
            <br className="hidden sm:block" /> tek bir yerde
          </AppText>

          <AppText
            variant="body"
            className="mx-auto mt-5 max-w-[560px] !text-[14px] leading-7 sm:!text-[15px]"
          >
            Davetiyenden misafir fotoğraflarına kadar özel gününü daha kolay,
            düzenli ve unutulmaz hale getiren araçları keşfet.
          </AppText>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </AppContainer>
    </section>
  );
}
