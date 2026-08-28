import type { ButtonHTMLAttributes, ReactNode } from "react";

type AppButtonVariant = "primary" | "outline" | "ghost";

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: AppButtonVariant;
};

export function AppButton({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: AppButtonProps) {
  const baseClass =
    "btn min-h-0 h-11 rounded-xl px-5 text-sm font-bold shadow-none transition-none disabled:cursor-not-allowed disabled:opacity-60";

  const variantClass =
    variant === "primary"
      ? "border-none bg-gradient-to-r from-[#9A5DCE] via-[#8F5EC2] to-[#6F3FA3] text-white shadow-[0_14px_30px_rgba(143,94,194,0.28)]"
      : variant === "outline"
        ? "border border-[#D8C8E8] bg-white/80 text-[#4F3C68]"
        : "border border-transparent bg-transparent text-[#7E45B4]";

  return (
    <button
      type={type}
      className={`${baseClass} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
