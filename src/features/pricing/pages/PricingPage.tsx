import { PricingHero } from "../components/PricingHero";
import { LaunchPlanCard } from "../components/LaunchPlanCard";
import { IncludedFeatures } from "../components/IncludedFeatures";
import { PricingFaq } from "../components/PricingFaq";

export function PricingPage() {
  return (
    <div className="overflow-hidden">
      <PricingHero />
      <LaunchPlanCard />
      <IncludedFeatures />
      <PricingFaq />
    </div>
  );
}
