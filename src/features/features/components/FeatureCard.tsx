import type { FeatureItem } from "../types/features.types";

import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";

type FeatureCardProps = FeatureItem;

export function FeatureCard({
  title,
  description,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <AppCard
      className="
        group h-full border border-borderSoft/70
        bg-white/75
        shadow-cardSoft
        transition-all duration-300
        hover:-translate-y-1
        hover:border-primaryLight
        hover:bg-white
        hover:shadow-card
      "
    >
      <div
        className="
          flex h-14 w-14 items-center justify-center
          rounded-2xl
          bg-primarySoft
          text-primaryDark
          transition
          group-hover:bg-primaryLight
        "
      >
        <Icon size={27} strokeWidth={1.9} />
      </div>

      <AppText
        as="h3"
        variant="subtitle"
        className="mt-6 !text-[17px] leading-tight"
      >
        {title}
      </AppText>

      <AppText variant="body" className="mt-3 !text-[14px] leading-6">
        {description}
      </AppText>
    </AppCard>
  );
}
