import { useNavigate } from "react-router-dom";

import { AppLogo } from "@/components/common/AppLogo";
import { FloralDecorations } from "@/components/common/FloralDecorations";
import { AppText } from "@/components/ui/AppText";

import { EventCodeCard } from "../components/EventCodeCard";
import { AppBackButton } from "@/components/ui/AppBackButton";

export function GuestAccessPage() {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7F2FA]">
      <FloralDecorations />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 sm:px-6 lg:px-10">
        <header className="flex h-20 items-center sm:h-24">
          <AppBackButton onClick={() => navigate(-1)} />
        </header>

        <section className="flex flex-1 flex-col items-center pb-10">
          <div className="mb-8 flex flex-col items-center text-center sm:mb-10">
            <AppLogo size="lg" showName />

            <AppText
              variant="body"
              className="mt-3 text-[13px] text-[#817A90] sm:text-[14px]"
            >
              Online davetiye ve etkinlik platformu
            </AppText>
          </div>

          <EventCodeCard />

          <div className="mt-auto pt-12 text-center sm:pt-16">
            <AppText
              variant="body"
              className="text-[12px] text-[#817A90] sm:text-[13px]"
            >
              Weddion ile davetiyeler artık daha romantik ve modern.
            </AppText>

            <div
              className="mx-auto mt-3 flex items-center justify-center gap-2 text-[#C9AFE0]"
              aria-hidden="true"
            >
              <span className="h-px w-8 bg-current opacity-60" />
              <span className="text-[16px]">✦</span>
              <span className="text-[18px]">♥</span>
              <span className="text-[16px]">✦</span>
              <span className="h-px w-8 bg-current opacity-60" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
