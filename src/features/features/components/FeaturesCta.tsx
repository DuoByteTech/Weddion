import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import purpleHeartDivider from "@/assets/images/purple-heart-divider.png";

import { AppButton } from "@/components/ui/AppButton";
import { AppContainer } from "@/components/ui/AppContainer";
import { AppText } from "@/components/ui/AppText";

export function FeaturesCta() {
  const navigate = useNavigate();

  return (
    <section className="pt-12 pb-20 sm:pt-16 sm:pb-24">
      <AppContainer className="!max-w-[900px]">
        <div className="text-center">
          <img
            src={purpleHeartDivider}
            alt=""
            className="mx-auto mb-5 h-8 w-auto object-contain opacity-80"
          />

          <AppText
            as="h2"
            variant="serifSubtitle"
            className="!text-[36px] sm:!text-[46px]"
          >
            Özel gününü Weddion ile
            <br className="hidden sm:block" /> daha unutulmaz yap.
          </AppText>

          <AppText
            variant="body"
            className="mx-auto mt-5 max-w-[520px] !text-[15px] leading-7"
          >
            Davetiyeni oluştur, misafirlerini bir araya getir ve tüm güzel
            anlarını tek yerde sakla.
          </AppText>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <AppButton
              className="gap-2 sm:min-w-[160px]"
              onClick={() => navigate("/register")}
            >
              Ücretsiz Başla
              <ArrowRight size={17} />
            </AppButton>

            <AppButton
              variant="outline"
              className="sm:min-w-[150px]"
              onClick={() => navigate("/")}
            >
              Ana Sayfa
            </AppButton>
          </div>
        </div>
      </AppContainer>
    </section>
  );
}
