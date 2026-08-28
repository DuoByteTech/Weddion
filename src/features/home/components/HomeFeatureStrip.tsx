import { CalendarHeart, Heart, UsersRound } from "lucide-react";
import { AppContainer } from "@/components/ui/AppContainer";
import {
  AppFeatureItem,
  AppFeatureItemGrid,
} from "@/components/common/AppFeatureItem";
import { AppText } from "@/components/ui/AppText";
import type { HomeFeatureItem } from "../types/home.types";
import { AppCard } from "@/components/ui/AppCard";
import purpleHeartDivider from "@/assets/images/purple-heart-divider.png";

const features: HomeFeatureItem[] = [
  {
    title: "Kolay Davetiye Oluşturma",
    description:
      "Zarif şablonlar ve kişiselleştirme araçlarıyla davetiyeni dakikalar içinde hazırla.",
    icon: CalendarHeart,
  },
  {
    title: "Misafir Yönetimi",
    description:
      "RSVP takibi yap, misafir listeni düzenle ve katılım durumlarını kolayca yönet.",
    icon: UsersRound,
  },
  {
    title: "Anıları Topla",
    description:
      "Fotoğraf ve videoları tek bir yerde topla, özel anılarını ölümsüzleştir.",
    icon: Heart,
  },
];

export function HomeFeatureStrip() {
  return (
    <AppContainer className="pt-4">
      <AppCard className="shadow-cardSoft">
        <AppFeatureItemGrid>
          {features.map((feature) => (
            <AppFeatureItem
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              iconSize={28}
              className="py-5 md:px-6 md:py-2 first:md:pl-0 last:md:pr-0"
            />
          ))}
        </AppFeatureItemGrid>
      </AppCard>

      <div className="mt-7 text-center">
        <AppText
          as="p"
          variant="serifSubtitle"
          className="!text-[24px] leading-tight !text-primaryDark"
        >
          Weddion ile davetiyeler artık daha romantik ve modern.
        </AppText>

        <div className="my-4 flex justify-center">
          <img
            src={purpleHeartDivider}
            alt=""
            className="h-8 w-auto object-contain opacity-80"
          />
        </div>
      </div>
    </AppContainer>
  );
}
