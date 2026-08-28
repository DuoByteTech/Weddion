import type { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";

import { AppInput } from "./AppInput";

type AppSearchInputProps = InputHTMLAttributes<HTMLInputElement> & {
  containerClassName?: string;
};

export function AppSearchInput({
  className = "",
  containerClassName = "",
  placeholder = "Ara...",
  ...props
}: AppSearchInputProps) {
  return (
    <div className={`relative ${containerClassName}`}>
      <Search
        size={16}
        className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#8C879C]"
      />

      <AppInput
        {...props}
        placeholder={placeholder}
        className={[
          "!h-10 rounded-xl border-[#D9C7E8] bg-white/90",
          "pl-10 pr-12 text-sm text-[#2d2138]",
          "placeholder:text-[#8C879C]",
          "focus:border-[#9B62D0] focus:bg-white focus:ring-2 focus:ring-[#9B62D0]/15",
          "focus-visible:border-[#9B62D0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B62D0]/15",
          className,
        ].join(" ")}
      />
    </div>
  );
}
