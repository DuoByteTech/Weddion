import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { AppContainer } from "@/components/ui/AppContainer";
import { AppText } from "@/components/ui/AppText";

const questions = [
  {
    question: "Weddion gerçekten ücretsiz mi?",
    answer:
      "Evet. Weddion'un mevcut özellikleri lansman döneminde ücretsiz olarak sunuluyor.",
  },
  {
    question: "Kredi kartı bilgisi girmem gerekiyor mu?",
    answer:
      "Hayır. Weddion'u kullanmaya başlamak için kredi kartı veya ödeme bilgisi girmen gerekmez.",
  },
  {
    question: "Weddion ileride ücretli olacak mı?",
    answer:
      "Weddion geliştikçe farklı planlar veya ek özellikler sunulabilir. Herhangi bir ücretlendirme değişikliği olduğunda kullanıcılar açık şekilde bilgilendirilecektir.",
  },
];

export function PricingFaq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="pb-24 pt-10 sm:pb-28 sm:pt-14">
      <AppContainer className="!max-w-[850px]">
        <div className="mb-10 text-center">
          <AppText
            variant="captionStrong"
            className="mb-3 uppercase tracking-[0.16em]"
          >
            Merak ettiklerin
          </AppText>

          <AppText
            as="h2"
            variant="serifTitle"
            className="!text-4xl sm:!text-5xl"
          >
            Sıkça sorulan sorular
          </AppText>
        </div>

        <div className="space-y-3">
          {questions.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border border-borderSoft bg-white/70"
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                >
                  <AppText
                    as="span"
                    variant="subtitle"
                    className="!text-sm sm:!text-[15px]"
                  >
                    {item.question}
                  </AppText>

                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-primaryDark transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-borderSoft px-5 py-5 sm:px-6">
                    <AppText variant="body" className="!leading-6">
                      {item.answer}
                    </AppText>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl bg-primarySoft/65 px-6 py-5 text-center">
          <AppText variant="body" className="!text-[12px] !leading-5">
            Lansman dönemi ve sunulan özellikler zaman içinde güncellenebilir.
            Değişiklikler kullanıcılarla açık şekilde paylaşılır.
          </AppText>
        </div>
      </AppContainer>
    </section>
  );
}
