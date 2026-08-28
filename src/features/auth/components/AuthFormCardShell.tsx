import type { ReactNode } from "react";

import { AppCard } from "@/components/ui/AppCard";

type AuthFormCardShellProps = {
  children: ReactNode;
  className?: string;
};

export function AuthFormCardShell({
  children,
  className = "",
}: AuthFormCardShellProps) {
  return (
    <AppCard
      className={`
        mx-auto
        w-[calc(100%-2rem)]
        max-w-[750px]
        px-5
        py-7
        shadow-card
        sm:w-full
        sm:px-8
        sm:py-8
        lg:px-10
        ${className}
      `}
    >
      {children}
    </AppCard>
  );
}
