import { Heart } from "lucide-react";

import heartDivider from "@/assets/images/purple-heart-divider.png";

import { AppText } from "@/components/ui/AppText";

import type { GuestEventInfo } from "../types/guest-upload.types";

type GuestEventHeroProps = {
  event: GuestEventInfo;
};

export function GuestEventHero({ event }: GuestEventHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[32px] bg-white/80 px-6 py-8 text-center sm:px-10 sm:py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 bottom-0 h-44 w-44 rounded-full bg-primarySoft/70 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-0 h-44 w-44 rounded-full bg-primarySoft/70 blur-3xl"
      />

      <div className="relative z-10 flex flex-col items-center">
        <Heart
          size={25}
          strokeWidth={0}
          fill="currentColor"
          className="text-primary"
        />

        <AppText
          as="h1"
          variant="serifTitle"
          className="mt-4 !text-[34px] leading-none sm:!text-[42px]"
        >
          {event.brideName} & {event.groomName}
        </AppText>

        <AppText
          variant="body"
          className="mt-3 !text-[14px] text-textMuted sm:!text-[15px]"
        >
          {event.eventDate} • {event.eventTime}
        </AppText>

        <img
          src={heartDivider}
          alt=""
          aria-hidden="true"
          className="mt-5 h-auto w-[150px] opacity-80"
        />
      </div>
    </section>
  );
}
