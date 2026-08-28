import lavenderCornerBloom from "@/assets/images/illustration/auth/lavender-corner-bloom.png";
import lavenderFloralFrame from "@/assets/images/illustration/auth/lavender-floral-frame.png";

import { FloralDecorations } from "@/components/common/FloralDecorations";

import { AuthHeader } from "@/features/auth/components/AuthHeader";
import { ResetPasswordFormCard } from "@/features/auth/components/reset-password/ResetPasswordFormCard";
import { ResetPasswordHero } from "@/features/auth/components/reset-password/ResetPasswordHero";

export function ResetPasswordPage() {
  return (
    <main className="relative h-screen overflow">
      <FloralDecorations
        leftImage={{
          src: lavenderCornerBloom,
          className:
            "absolute bottom-[-40px] left-[-50px] hidden w-[340px] select-none object-contain opacity-80 lg:block xl:w-[430px]",
        }}
        rightImage={{
          src: lavenderFloralFrame,
          className:
            "absolute right-[-45px] top-[-10px] hidden w-[310px] select-none object-contain opacity-75 lg:block xl:w-[390px]",
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <AuthHeader />

        <div className="mx-auto grid min-h-0 w-full max-w-7xl flex-1 grid-cols-1 items-center gap-10 py-4 lg:grid-cols-2 xl:gap-12">
          <ResetPasswordHero />

          <ResetPasswordFormCard />
        </div>
      </div>
    </main>
  );
}
