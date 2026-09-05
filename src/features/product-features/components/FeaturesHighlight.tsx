import { Check, Heart, HeartHandshake, Images, QrCode } from "lucide-react";

import { AppCard } from "@/components/ui/AppCard";
import { AppContainer } from "@/components/ui/AppContainer";
import { AppText } from "@/components/ui/AppText";

const highlights = [
  "Misafirlerin üyelik oluşturmadan fotoğraf paylaşabilsin.",
  "QR kod veya etkinlik koduyla saniyeler içinde erişim sağlansın.",
  "Paylaşılan tüm anılar tek bir özel galeride toplansın.",
];

export function FeaturesHighlight() {
  return (
    <section className="py-10 sm:py-14 lg:py-16">
      <AppContainer className="!max-w-[1200px]">
        <AppCard
          className="
              relative overflow-hidden
              border border-primaryLight/80
              !p-0
              shadow-card
            "
        >
          <div
            className="
                absolute -right-20 -top-20
                h-72 w-72 rounded-full
                bg-primarySoft/80 blur-3xl
              "
          />

          <div className="relative grid lg:grid-cols-[1fr_0.9fr]">
            <div className="p-7 sm:p-10 lg:p-14">
              <div
                className="
                    flex h-14 w-14 items-center justify-center
                    rounded-2xl bg-primarySoft text-primaryDark
                  "
              >
                <HeartHandshake size={28} />
              </div>

              <AppText
                as="h2"
                variant="serifSubtitle"
                className="mt-7 !text-[36px] sm:!text-[44px]"
              >
                Sen anı yaşa,
                <br />
                Weddion onları toplasın.
              </AppText>

              <AppText
                variant="body"
                className="mt-5 max-w-[540px] !text-[15px] leading-7"
              >
                Misafirlerinin çektiği birbirinden farklı kareleri tek tek
                istemek yerine, Weddion ile herkes aynı özel alanda
                paylaşabilsin.
              </AppText>

              <div className="mt-8 flex flex-col gap-4">
                {highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-3">
                    <div
                      className="
                          mt-0.5 flex h-6 w-6 shrink-0
                          items-center justify-center
                          rounded-full bg-primarySoft text-primaryDark
                        "
                    >
                      <Check size={14} strokeWidth={2.5} />
                    </div>

                    <AppText variant="body" className="!text-[14px] leading-6">
                      {highlight}
                    </AppText>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="
                  relative flex min-h-[350px]
                  items-center justify-center
                  bg-gradient-to-br
                  from-primarySoft
                  via-backgroundSoft
                  to-primaryLight/60
                  p-8
                "
            >
              <div className="relative h-[270px] w-[270px] sm:h-[310px] sm:w-[310px]">
                <div
                  className="
                      absolute left-0 top-8
                      flex h-40 w-40
                      rotate-[-7deg]
                      items-center justify-center
                      rounded-[28px]
                      border border-white
                      bg-white/85
                      shadow-card
                    "
                >
                  <Images
                    size={55}
                    strokeWidth={1.4}
                    className="text-primaryDark"
                  />
                </div>

                <div
                  className="
                      absolute bottom-2 right-0
                      flex h-40 w-40
                      rotate-[7deg]
                      items-center justify-center
                      rounded-[28px]
                      border border-white
                      bg-white/90
                      shadow-cardStrong
                    "
                >
                  <QrCode
                    size={55}
                    strokeWidth={1.4}
                    className="text-primaryDark"
                  />
                </div>

                <div
                  className="
                      absolute left-1/2 top-1/2
                      flex h-16 w-16
                      -translate-x-1/2 -translate-y-1/2
                      items-center justify-center
                      rounded-full
                      bg-primarySoft text-white
                      shadow-button
                    "
                >
                  <Heart
                    size={27}
                    fill="currentColor"
                    className="text-primaryDark"
                  />
                </div>
              </div>
            </div>
          </div>
        </AppCard>
      </AppContainer>
    </section>
  );
}
