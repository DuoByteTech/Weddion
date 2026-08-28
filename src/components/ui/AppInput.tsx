import type { InputHTMLAttributes } from "react";

type AppInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function AppInput({ label, className = "", ...props }: AppInputProps) {
  return (
    <label className="form-control w-full">
      {label ? (
        <div className="label pb-1">
          <span className="label-text text-sm font-medium text-[#4d3f58]">
            {label}
          </span>
        </div>
      ) : null}

      <input
        className={`h-12 w-full rounded-xl border border-solid border-[#D9C7E8] bg-white/90 px-4 text-sm text-[#2d2138] outline-none transition placeholder:text-[#8C879C] focus:border-[#9B62D0] focus:bg-white focus:ring-2 focus:ring-[#9B62D0]/15 ${className}`}
        {...props}
      />
    </label>
  );
}
