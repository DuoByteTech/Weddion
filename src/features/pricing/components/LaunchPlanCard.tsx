import { ArrowRight, Check, Gift, Heart, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppContainer } from "@/components/ui/AppContainer";
import { AppText } from "@/components/ui/AppText";

const includedItems = [
  "Dijital davetiye oluşturma",
  "QR kod ile misafir fotoğraf yükleme",
  "Düğün galerisi",
  "Çeyiz planlama",
  "Düğün hazırlık araçları",
  "Weddion'un mevcut özelliklerine erişim",
];

export function LaunchPlanCard() {
  const navigate = useNavigate();

  return (
    <section className="py-10 sm:py-14">
      <AppContainer className="!max-w-[980px]">
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[40px] bg-primaryLight/35 blur-3xl" />

          <AppCard className="relative overflow-hidden !rounded-[32px] !border !border-primaryLight !bg-white/90 !p-0 shadow-cardStrong">
            <div className="absolute right-0 top-0 h-56 w-56 translate-x-20 -translate-y-20 rounded-full bg-primaryLight/60 blur-3xl" />

            <div className="grid lg:grid-cols-[1fr_0.9fr]">
              <div className="p-7 sm:p-10 lg:p-12">
                <div className="mb-7 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primarySoft text-primaryDark">
                    <Heart size={21} />
                  </div>

                  <div>
                    <AppText
                      variant="captionStrong"
                      className="!text-[11px] uppercase tracking-[0.16em]"
                    >
                      Weddion
                    </AppText>

                    <AppText as="h2" variant="title" className="mt-0.5">
                      Lansman Planı
                    </AppText>
                  </div>
                </div>

                <AppText
                  variant="body"
                  className="max-w-[500px] !text-sm !leading-6"
                >
                  Düğün hazırlıklarını kolaylaştıran Weddion özelliklerini
                  lansman döneminde herhangi bir ücret ödemeden kullan.
                </AppText>

                <div className="mt-8 space-y-4">
                  {includedItems.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primarySoft">
                        <Check size={12} className="text-primaryDark" />
                      </div>

                      <AppText
                        variant="body"
                        className="!text-[13px] !text-textDark sm:!text-sm"
                      >
                        {item}
                      </AppText>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative flex flex-col justify-center border-t border-borderSoft bg-gradient-to-br from-primarySoft/65 via-backgroundSoft to-white p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                <div className="mb-5 flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-cardSoft">
                  <Gift size={14} className="text-primaryDark" />

                  <span className="font-manropeSemiBold text-[11px] text-primaryDark">
                    Lansmana özel
                  </span>
                </div>

                <div className="flex items-end gap-2">
                  <span className="font-cormorantSemiBold text-6xl leading-none text-textDark sm:text-7xl">
                    ₺0
                  </span>

                  <span className="mb-2 font-manropeMedium text-sm text-textMuted">
                    / şu anda
                  </span>
                </div>

                <AppText variant="body" className="mt-5 !leading-6">
                  Kredi kartı gerekmez. Abonelik oluşturulmaz. Mevcut
                  özellikleri ücretsiz kullanmaya başlayabilirsin.
                </AppText>

                <AppButton
                  className="mt-8 w-full"
                  onClick={() => navigate("/register")}
                >
                  <span className="flex items-center justify-center gap-2">
                    Ücretsiz Kullanmaya Başla
                    <ArrowRight size={17} />
                  </span>
                </AppButton>

                <div className="mt-4 flex items-center justify-center gap-1.5">
                  <Sparkles size={13} className="text-primaryDark" />

                  <span className="font-manropeMedium text-[11px] text-textMuted">
                    Lansman dönemi boyunca ücretsiz
                  </span>
                </div>
              </div>
            </div>
          </AppCard>
        </div>
      </AppContainer>
    </section>
  );
}
