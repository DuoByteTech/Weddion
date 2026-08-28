import type { ReactNode } from "react";

type AppCardProps = {
  children: ReactNode;
  className?: string;
};

export function AppCard({ children, className = "" }: AppCardProps) {
  return (
    <div className={`rounded-2xl bg-white/80 p-4 sm:p-5 lg:p-6 ${className}`}>
      {children}
    </div>
  );
}
