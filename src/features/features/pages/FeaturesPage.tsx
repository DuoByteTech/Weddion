import lavenderSideFrame from "@/assets/images/illustration/lavender-floral-side-frame.png";
import purpleFloralBorder from "@/assets/images/illustration/purple-watercolor-floral-border.png";

import { FloralDecorations } from "@/components/common/FloralDecorations";

import { FeaturesCta } from "../components/FeaturesCta";
import { FeaturesGrid } from "../components/FeaturesGrid";
import { FeaturesHero } from "../components/FeaturesHero";
import { FeaturesHighlight } from "../components/FeaturesHighlight";

export function FeaturesPage() {
  return (
    <div className="relative overflow-hidden">
      <FloralDecorations
        leftImage={{
          src: purpleFloralBorder,
          className:
            "absolute left-[-70px] top-0 hidden w-[360px] select-none object-contain opacity-65 lg:block xl:w-[420px]",
        }}
        rightImage={{
          src: lavenderSideFrame,
          className:
            "absolute right-[-40px] top-[180px] hidden w-[290px] select-none object-contain opacity-60 lg:block xl:w-[330px]",
        }}
      />

      <div className="relative z-10">
        <FeaturesHero />
        <FeaturesGrid />
        <FeaturesHighlight />
        <FeaturesCta />
      </div>
    </div>
  );
}
