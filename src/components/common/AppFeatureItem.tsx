import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { AppText } from "@/components/ui/AppText";

type AppFeatureItemProps = {
  title: string;
  description?: string;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
  iconSize?: number;
};

type AppFeatureItemGridProps = {
  children: ReactNode;
  className?: string;
};

export function AppFeatureItemGrid({
  children,
  className = "",
}: AppFeatureItemGridProps) {
  return (
    <div
      className={`grid divide-y divide-borderSoft md:grid-cols-3 md:divide-x md:divide-y-0 ${className}`}
    >
      {children}
    </div>
  );
}

export function AppFeatureItem({
  title,
  description,
  icon: Icon,
  className = "",
  iconClassName = "",
  iconSize = 28,
}: AppFeatureItemProps) {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primarySoft text-primaryDark ${iconClassName}`}
      >
        <Icon size={iconSize} strokeWidth={2} />
      </div>

      <div className="min-w-0 flex-1">
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
      </div>
    </div>
  );
}
