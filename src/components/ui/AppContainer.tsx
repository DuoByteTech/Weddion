import type { ReactNode } from "react";

type AppContainerProps = {
  children: ReactNode;
  className?: string;
};

export function AppContainer({ children, className = "" }: AppContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1480px] px-5 sm:px-8 lg:px-10 ${className}`}
    >
      {children}
    </div>
  );
}
