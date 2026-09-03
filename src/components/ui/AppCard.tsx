import type { ReactNode } from "react";

type AppCardProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function AppCard({ children, className = "", onClick }: AppCardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl bg-white/80 p-4 sm:p-5 lg:p-6 ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
