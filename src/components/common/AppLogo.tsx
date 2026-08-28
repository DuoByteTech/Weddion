import { NavLink } from "react-router-dom";

import logoImage from "@/assets/images/logo.png";
import logoNameImage from "@/assets/images/logo-name.png";

type AppLogoProps = {
  size?: "sm" | "md" | "lg" | "xl";
  showName?: boolean;
  className?: string;
  to?: string;
};

const logoSize = {
  sm: {
    image: "h-7 w-7",
    name: "h-6 w-[92px] sm:h-7 sm:w-[105px]",
    gap: "gap-2 sm:gap-3",
  },
  md: {
    image: "h-8 w-8 sm:h-9 sm:w-9",
    name: "h-7 w-[112px] sm:h-9 sm:w-[135px]",
    gap: "gap-2 sm:gap-3",
  },
  lg: {
    image: "h-9 w-9 sm:h-11 sm:w-11 lg:h-14 lg:w-14",
    name: "h-8 w-[126px] sm:h-10 sm:w-[150px] lg:h-12 lg:w-[175px]",
    gap: "gap-2 sm:gap-3",
  },
  xl: {
    image: "h-14 w-14 sm:h-20 sm:w-20 lg:h-24 lg:w-24",
    name: "h-10 w-[180px] sm:h-14 sm:w-[260px] lg:h-16 lg:w-[330px]",
    gap: "gap-3",
  },
};

export function AppLogo({
  size = "md",
  showName = true,
  className = "",
  to = "/",
}: AppLogoProps) {
  const currentSize = logoSize[size];

  return (
    <NavLink
      to={to}
      className={`flex max-w-full min-w-0 items-center ${currentSize.gap} ${className}`}
    >
      <img
        src={logoImage}
        alt="Weddion logo"
        className={`shrink-0 object-contain ${currentSize.image}`}
      />

      {showName ? (
        <img
          src={logoNameImage}
          alt="Weddion"
          className={`min-w-0 object-contain ${currentSize.name}`}
        />
      ) : null}
    </NavLink>
  );
}
