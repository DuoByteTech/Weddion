import { ArrowLeft } from "lucide-react";

type AppBackButtonProps = {
  onClick: () => void;
  ariaLabel?: string;
};

export function AppBackButton({
  onClick,
  ariaLabel = "Geri dön",
}: AppBackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="
        absolute
        left-5
        top-6
        z-20
        flex
        h-11
        w-11
        shrink-0
        items-center
        justify-center
        rounded-full
        text-primaryDark
        transition-all
        duration-200
        hover:bg-primarySoft
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-primaryDark/30
        sm:left-8
        sm:top-8
      "
    >
      <ArrowLeft size={27} strokeWidth={2} />
    </button>
  );
}
