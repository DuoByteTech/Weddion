import { Images } from "lucide-react";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { AppActionCard } from "@/components/common/AppActionCard";
import type { HomeActionItem } from "../types/home.types";

type HomeActionPanelProps = {
  item: HomeActionItem;
};

export function HomeActionPanel({ item }: HomeActionPanelProps) {
  return (
    <AppCard className="flex h-full min-h-[360px] flex-col justify-center p-7 sm:p-8 lg:p-10 shadow-card">
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primarySoft text-primaryDark shadow-smSoft">
          <Images size={30} strokeWidth={1.9} />
        </div>

        <AppText
          as="h2"
          variant="serifSubtitle"
          className="!text-[36px] leading-[1.05] tracking-[-0.01em]"
        >
          Anılarını bizimle paylaş
        </AppText>
      </div>

      <AppText
        variant="body"
        className="mt-6 max-w-[460px] text-[15px] leading-7"
      >
        Etkinlik kodunu girerek sana özel fotoğraf yükleme alanına geç. Düğün,
        nişan veya davet anılarını kolayca paylaş.
      </AppText>

      <AppActionCard
        className="mt-8"
        title={item.title}
        description={item.description}
        icon={item.icon}
      />
    </AppCard>
  );
}
