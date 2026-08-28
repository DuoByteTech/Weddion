import type { ButtonHTMLAttributes, ReactNode } from "react";

type AppActionButtonVariant = "default" | "danger";

type AppActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: AppActionButtonVariant;
};

export function AppActionButton({
  children,
  variant = "default",
  className = "",
  type = "button",
  ...props
}: AppActionButtonProps) {
  const isDanger = variant === "danger";

  return (
    <button
      {...props}
      type={type}
      className={[
        "inline-flex h-9 items-center justify-center gap-2 rounded-xl border px-4",
        "text-sm font-semibold transition-colors duration-200 outline-none",
        "disabled:cursor-not-allowed disabled:opacity-60",
        isDanger
          ? "border-red-100 bg-red-50 text-red-500 hover:border-red-200 hover:bg-red-100 focus:border-red-200 focus:bg-red-100"
          : "border-borderSoft bg-white text-primaryDark hover:border-primaryLight hover:bg-primarySoft focus:border-primaryLight focus:bg-primarySoft",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
