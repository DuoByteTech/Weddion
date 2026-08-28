import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { AppCard, AppText } from "@/components/ui";

type AppActionCardLayout = "row" | "col";

type AppActionCardProps = {
  title: string;
  description?: string;
  icon: LucideIcon;
  children?: ReactNode;
  showArrow?: boolean;
  layout?: AppActionCardLayout;
  className?: string;
  iconClassName?: string;
};

export function AppActionCard({
  title,
  description,
  icon: Icon,
  children,
  showArrow = true,
  layout = "row",
  className = "",
  iconClassName = "",
}: AppActionCardProps) {
  const isColumn = layout === "col";

  return (
    <AppCard className={`border border-borderSoft ${className}`}>
      <div
        className={
          isColumn ? "flex flex-col gap-4" : "flex w-full items-center gap-5"
        }
      >
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primarySoft text-primaryDark ${iconClassName}`}
        >
          <Icon size={26} strokeWidth={2} />
        </div>

        <div className={isColumn ? "w-full" : "min-w-0 flex-1"}>
          <AppText
            as="h3"
            variant="subtitle"
            className="!text-[16px] leading-tight"
          >
            {title}
          </AppText>

          {description ? (
            <AppText variant="caption" className="mt-2 leading-5">
              {description}
            </AppText>
          ) : null}

          {children ? <div className="mt-3">{children}</div> : null}
        </div>

        {showArrow && !isColumn ? (
          <ChevronRight size={22} className="shrink-0 text-primaryDark" />
        ) : null}
      </div>

      {showArrow && isColumn ? (
        <div className="mt-4 flex justify-end">
          <ChevronRight size={22} className="text-primaryDark" />
        </div>
      ) : null}
    </AppCard>
  );
}
