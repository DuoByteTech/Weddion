import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type AppTextVariant =
  | "title"
  | "subtitle"
  | "body"
  | "caption"
  | "captionStrong"
  | "link"
  | "serifTitle"
  | "serifSubtitle"
  | "invitationNames"
  | "invitationAmpersand"
  | "invitationParents"
  | "invitationMeta"
  | "invitationBody"
  | "invitationVenue"
  | "invitationLocation";

type AppTextProps<T extends ElementType = "p"> = {
  children: ReactNode;
  variant?: AppTextVariant;
  className?: string;
  as?: T;
} & ComponentPropsWithoutRef<T>;

export function AppText<T extends ElementType = "p">({
  children,
  variant = "body",
  className = "",
  as,
  ...props
}: AppTextProps<T>) {
  const Component = as || "p";

  const variants: Record<AppTextVariant, string> = {
    title: "font-manropeBold text-xl sm:text-2xl text-textDark",
    subtitle: "font-manropeSemiBold text-sm sm:text-base text-textDark",
    body: "font-manrope text-xs sm:text-sm text-textMuted",
    caption: "font-manropeMedium text-[11px] sm:text-xs text-textMuted",
    captionStrong: "font-manropeExtraBold text-xs sm:text-sm text-primaryDark",
    link: "font-manropeSemiBold text-xs sm:text-sm text-primary",

    serifTitle: "font-cormorantMedium text-5xl sm:text-7xl text-textDark",
    serifSubtitle: "font-cormorantBold text-lg sm:text-xl text-textDark",

    invitationNames: "font-tangerineBold text-5xl sm:text-6xl text-textDark",
    invitationAmpersand:
      "font-tangerineBold text-4xl sm:text-5xl text-textDark",
    invitationParents:
      "font-cormorantSemiBold text-xs sm:text-sm text-textDark",
    invitationMeta: "font-cormorantSemiBold text-sm sm:text-base text-textDark",
    invitationBody: "font-cormorantSemiBold text-xs sm:text-sm text-textMuted",
    invitationVenue: "font-cormorantBold text-xl sm:text-2xl text-textDark",
    invitationLocation:
      "font-cormorantSemiBold text-xs sm:text-sm text-textMuted",
  };

  return (
    <Component className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </Component>
  );
}
