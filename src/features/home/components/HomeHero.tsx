import { KeyRound } from "lucide-react";
import { AppContainer } from "@/components/ui/AppContainer";
import { AppLogo } from "@/components/common/AppLogo";
import { AppText } from "@/components/ui/AppText";
import { HomeActionPanel } from "./HomeActionPanel";
import type { HomeActionItem } from "../types/home.types";

const actionItems: HomeActionItem[] = [
  {
    title: "Etkinlik kodu ile devam et",
    description:
      "Davet sahibinin paylaştığı özel kodu girerek fotoğraf yükleme alanına ulaş.",
    icon: KeyRound,
  },
];

export function HomeHero() {
  return (
    <AppContainer className="!max-w-[1200px] py-14">
      <div className="grid items-stretch gap-10 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <AppLogo size="xl" showName className="mb-7" />

          <AppText as="h1" variant="serifTitle" className="leading-[0.95]">
            Davetiyeni <br /> zarifçe oluştur
          </AppText>

          <AppText
            variant="body"
            className="mt-6 max-w-[480px] text-[15px] leading-7"
          >
            Misafirlerini yönet, katılım al ve etkinlik anılarını tek yerde
            topla.
          </AppText>
        </div>

        {actionItems.map((item) => (
          <HomeActionPanel key={item.title} item={item} />
        ))}
      </div>
    </AppContainer>
  );
}
