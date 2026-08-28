import { useState } from "react";
import { ChevronDown, Globe2, Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import { AppContainer, AppButton } from "@/components/ui";
import { AppLogo } from "@/components/common/AppLogo";

const navItems = [
  {
    label: "Özellikler",
    href: "/",
  },
  {
    label: "Fiyatlandırma",
    href: "/",
  },
  {
    label: "İletişim",
    href: "/",
  },
];

export function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function goToLogin() {
    closeMenu();
    navigate("/login");
  }

  function goToRegister() {
    closeMenu();
    navigate("/register");
  }

  return (
    <header className="relative z-50">
      <AppContainer className="relative flex items-center justify-between !my-4">
        <NavLink
          to="/"
          onClick={closeMenu}
          className="flex min-w-0 items-center"
        >
          <AppLogo size="md" showName />
        </NavLink>

        <nav className="hidden items-center gap-10 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              className="text-[15px] font-medium text-textMuted transition hover:text-primaryDark"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-textMuted transition hover:bg-primarySoft hover:text-primaryDark"
          >
            <Globe2 size={18} />
            TR
            <ChevronDown size={16} />
          </button>

          <AppButton
            type="button"
            variant="outline"
            className="min-w-[105px]"
            onClick={() => navigate("/register")}
          >
            Üye Ol
          </AppButton>

          <AppButton
            type="button"
            className="min-w-[120px]"
            onClick={() => navigate("/login")}
          >
            Giriş Yap
          </AppButton>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-borderSoft bg-white/70 text-textDark shadow-sm backdrop-blur transition hover:bg-white lg:hidden"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {isMenuOpen ? (
          <div className="absolute left-4 right-4 top-[calc(100%+12px)] rounded-3xl border border-borderSoft bg-white/95 p-4 shadow-[0_18px_50px_rgba(70,45,90,0.16)] backdrop-blur lg:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.href}
                  onClick={closeMenu}
                  className="rounded-2xl px-4 py-3 text-[15px] font-semibold text-textMuted transition hover:bg-primarySoft hover:text-primaryDark"
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <button
              type="button"
              className="mt-3 flex w-full items-center justify-between rounded-2xl bg-primarySoft px-4 py-3 text-sm font-semibold text-textMuted transition hover:text-primaryDark"
            >
              <span className="flex items-center gap-2">
                <Globe2 size={18} />
                TR
              </span>

              <ChevronDown size={16} />
            </button>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <AppButton
                type="button"
                variant="outline"
                className="w-full"
                onClick={goToRegister}
              >
                Üye Ol
              </AppButton>

              <AppButton type="button" className="w-full" onClick={goToLogin}>
                Giriş Yap
              </AppButton>
            </div>
          </div>
        ) : null}
      </AppContainer>
    </header>
  );
}
