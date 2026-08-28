import type { ReactNode } from "react";

type AppDropdownProps = {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

type AppDropdownItemProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "danger";
  onClick?: () => void;
};

export function AppDropdown({
  trigger,
  children,
  className = "",
  contentClassName = "",
}: AppDropdownProps) {
  return (
    <div className={["dropdown dropdown-end", className].join(" ")}>
      <div tabIndex={0} role="button" className="outline-none">
        {trigger}
      </div>

      <div
        tabIndex={0}
        className={[
          "dropdown-content z-[60] mt-3 min-w-52 rounded-2xl border border-borderSoft bg-surface p-2 shadow-card outline-none",
          contentClassName,
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}

export function AppDropdownItem({
  children,
  className = "",
  variant = "default",
  onClick,
}: AppDropdownItemProps) {
  const isDanger = variant === "danger";

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors duration-200",
        isDanger
          ? "text-error hover:bg-error/10"
          : "text-primaryDark hover:bg-primaryDark hover:text-white",
        "focus:bg-primaryDark focus:text-white focus:outline-none",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
