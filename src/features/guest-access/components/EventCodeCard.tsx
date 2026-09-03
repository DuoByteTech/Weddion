import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { KeyRound, QrCode } from "lucide-react";

import { AppText } from "@/components/ui/AppText";
import { AppButton } from "@/components/ui/AppButton";

const CODE_LENGTH = 9;

export function EventCodeCard() {
  const navigate = useNavigate();

  const [characters, setCharacters] = useState<string[]>(
    Array(CODE_LENGTH).fill(""),
  );

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const code = characters.join("");

  const handleCodeChange = (index: number, value: string) => {
    const normalizedValue = value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(-1);

    const updatedCharacters = [...characters];

    updatedCharacters[index] = normalizedValue;

    setCharacters(updatedCharacters);

    if (normalizedValue && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace") {
      if (characters[index]) {
        const updatedCharacters = [...characters];

        updatedCharacters[index] = "";

        setCharacters(updatedCharacters);

        return;
      }

      if (index > 0) {
        const updatedCharacters = [...characters];

        updatedCharacters[index - 1] = "";

        setCharacters(updatedCharacters);

        inputRefs.current[index - 1]?.focus();
      }
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleQrScanClick = () => {
    navigate("/qr-scan");
  };

  return (
    <div className="w-full max-w-[620px] rounded-[32px] border border-[#EEE6F3] bg-white/95 p-6 shadow-[0_24px_70px_rgba(89,58,113,0.08)] backdrop-blur-sm sm:p-8 lg:p-10">
      <div className="flex items-start gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#F0E6F6] text-[#A875D1] sm:size-16">
          <KeyRound size={28} strokeWidth={1.8} />
        </div>

        <div>
          <AppText
            as="h1"
            variant="serifTitle"
            className="text-[30px] leading-none text-[#2F2638] sm:text-[38px]"
          >
            Etkinlik Kodunu Gir
          </AppText>

          <AppText
            variant="body"
            className="mt-3 max-w-[450px] text-[13px] leading-6 text-[#777085] sm:text-[14px]"
          >
            Size verilen etkinlik kodunu girerek fotoğraflarınızı yükleyin ve
            anıları paylaşın.
          </AppText>
        </div>
      </div>

      <div className="my-7 h-px bg-[#E9DFF1]" />

      <div>
        <AppText
          as="label"
          variant="body"
          className="mb-4 block text-[15px] font-semibold text-[#817A90]"
        >
          Etkinlik Kodu
        </AppText>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {characters.map((character, index) => {
            return (
              <div key={index} className="contents">
                {index === 3 && (
                  <span className="shrink-0 px-0.5 text-[18px] font-semibold text-[#A875D1] sm:px-1 sm:text-[20px]">
                    -
                  </span>
                )}

                <input
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  type="text"
                  value={character}
                  maxLength={1}
                  placeholder="-"
                  autoComplete="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  aria-label={`Etkinlik kodu ${index + 1}. karakter`}
                  onChange={(event) =>
                    handleCodeChange(index, event.target.value)
                  }
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  onFocus={(event) => event.currentTarget.select()}
                  className={[
                    "h-[54px] min-w-0 flex-1 text-center",
                    "rounded-xl border bg-white",
                    "text-[16px] font-semibold uppercase text-[#6A5875]",
                    "placeholder:text-[#C9C0D0]",
                    "transition-all duration-200",
                    "outline-none",
                    "sm:h-[60px] sm:rounded-2xl sm:text-[18px]",
                    "border-[#DED8E7]",
                    "focus:border-[#A875D1]",
                    "focus:shadow-[0_0_0_3px_rgba(168,117,209,0.08)]",
                  ].join(" ")}
                />
              </div>
            );
          })}
        </div>

        <AppButton
          type="button"
          disabled={code.length !== CODE_LENGTH}
          className="mt-7 w-full"
        >
          Kodu Kontrol Et
        </AppButton>

        <AppButton
          type="button"
          variant="outline"
          onClick={handleQrScanClick}
          className="mt-4 w-full"
        >
          <QrCode size={22} strokeWidth={2} />
          QR Kod Okut
        </AppButton>
      </div>
    </div>
  );
}
