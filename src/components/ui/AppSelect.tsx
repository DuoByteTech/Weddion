import { ChevronDown } from "lucide-react";

type AppSelectOption = {
  label: string;
  value: string;
};

type AppSelectProps = {
  options: AppSelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  contentClassName?: string;
};

export function AppSelect({
  options,
  value,
  onValueChange,
  placeholder = "Seçiniz",
  className = "",
  contentClassName = "",
}: AppSelectProps) {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={["dropdown dropdown-end w-full", className].join(" ")}>
      <button
        type="button"
        tabIndex={0}
        className={[
          "flex h-12 w-full items-center justify-between rounded-xl border border-borderSoft bg-surface",
          "px-4 text-sm font-semibold text-primaryDark shadow-card outline-none",
          "transition-colors duration-200 hover:bg-primarySoft",
          "focus:bg-primarySoft focus:outline-none",
        ].join(" ")}
      >
        <span className="truncate">{selectedOption?.label ?? placeholder}</span>

        <ChevronDown size={18} className="shrink-0 text-primaryDark" />
      </button>

      <div
        tabIndex={0}
        className={[
          "dropdown-content z-[60] mt-3 w-full min-w-52 rounded-2xl border border-borderSoft bg-surface p-2 shadow-card outline-none",
          contentClassName,
        ].join(" ")}
      >
        {options.map((option) => {
          const isSelected = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onValueChange(option.value)}
              className={[
                "flex w-full items-center rounded-xl px-3 py-2.5 mt-1 text-left text-sm font-semibold transition-colors duration-200",
                isSelected
                  ? "bg-primaryDark text-white"
                  : "text-primaryDark hover:bg-primaryDark hover:text-white",
                "focus:bg-primaryDark focus:text-white focus:outline-none",
              ].join(" ")}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
