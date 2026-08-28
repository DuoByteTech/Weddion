import lavenderSideFrame from "@/assets/images/illustration/lavender-floral-side-frame.png";
import purpleFloralBorder from "@/assets/images/illustration/purple-watercolor-floral-border.png";

import { FloralDecorations } from "@/components/common/FloralDecorations";

import { HomeFeatureStrip } from "../components/HomeFeatureStrip";
import { HomeHero } from "../components/HomeHero";

export function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <FloralDecorations
        leftImage={{ src: purpleFloralBorder }}
        rightImage={{ src: lavenderSideFrame }}
      />

      <div className="relative z-10">
        <HomeHero />
        <HomeFeatureStrip />
      </div>
    </main>
  );
}
