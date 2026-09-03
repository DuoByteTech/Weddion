import { KeyRound, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { AppContainer } from "@/components/ui/AppContainer";
import { AppLogo } from "@/components/common/AppLogo";
import { AppText } from "@/components/ui/AppText";

import { HomeActionPanel } from "./HomeActionPanel";

import type { HomeActionItem } from "../types/home.types";

const actionItems: HomeActionItem[] = [
  {
    title: "QR kod okutarak devam et",
    description:
      "Davet sahibinin paylaştığı QR kodu okutarak fotoğraf yükleme alanına ulaş.",
    icon: QrCode,
    path: "/qr-scan",
  },
  {
    title: "Etkinlik kodu ile devam et",
    description:
      "Davet sahibinin paylaştığı özel kodu girerek fotoğraf yükleme alanına ulaş.",
    icon: KeyRound,
    path: "/guest-access",
  },
];

export function HomeHero() {
  const navigate = useNavigate();

  const handleActionClick = (item: HomeActionItem) => {
    if (!item.path) {
      return;
    }

    navigate(item.path);
  };

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

        <HomeActionPanel items={actionItems} onItemClick={handleActionClick} />
      </div>
    </AppContainer>
  );
}
