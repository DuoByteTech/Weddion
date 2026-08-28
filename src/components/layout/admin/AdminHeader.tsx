import {
  Bell,
  ChartNoAxesGantt,
  ChevronDown,
  LogOut,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  AppDropdown,
  AppDropdownItem,
  AppSearchInput,
  AppText,
} from "@/components/ui";
import { logoutUser } from "@/features/auth/services/authService";

type AdminHeaderProps = {
  drawerId: string;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
};

export function AdminHeader({
  drawerId,
  isSidebarCollapsed,
  onToggleSidebar,
}: AdminHeaderProps) {
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutUser();
    navigate("/login", { replace: true });
  }

  return (
    <header className="sticky top-0 z-30 border-b border-borderSoft bg-surface/95 shadow-cardSoft backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <label
            htmlFor={drawerId}
            aria-label="Admin menüsünü aç"
            className="btn btn-square btn-ghost border border-borderSoft bg-surfaceSoft text-textDark lg:hidden"
          >
            <Menu size={21} />
          </label>

          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label={
              isSidebarCollapsed ? "Sidebarı genişlet" : "Sidebarı daralt"
            }
            className="hidden h-10 w-10 items-center justify-center rounded-2xl bg-surfaceSoft text-primaryDark shadow-cardSoft transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primarySoft lg:flex"
          >
            <ChartNoAxesGantt
              size={20}
              strokeWidth={2.35}
              className={[
                "transition-transform duration-300",
                isSidebarCollapsed ? "rotate-180" : "rotate-0",
              ].join(" ")}
            />
          </button>

          <div className="min-w-0">
            <AppText
              variant="caption"
              as="h1"
              className="truncate !text-lg text-textDark !sm:text-xl"
            >
              Weddion Admin Dashboard
            </AppText>
          </div>
        </div>

        <div className="hidden w-full max-w-sm xl:block">
          <AppSearchInput
            aria-label="Admin arama"
            placeholder="Ara..."
            containerClassName="w-full"
          />
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <AppDropdown
            trigger={
              <button
                type="button"
                className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-transparent text-primaryDark transition hover:bg-primarySoft focus:outline-none focus-visible:ring-2 focus-visible:ring-primarySoft"
                aria-label="Bildirimler"
              >
                <Bell size={20} />

                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primaryDark px-1 text-[10px] font-bold text-white shadow-cardSoft">
                  0
                </span>
              </button>
            }
            contentClassName="w-80"
          >
            <div className="px-2 py-2">
              <AppText variant="captionStrong" className="text-textDark">
                Bildirimler
              </AppText>

              <AppText variant="caption" className="mt-1">
                Henüz yeni bildirimin yok.
              </AppText>
            </div>

            <div className="my-2 h-px bg-borderSoft" />

            <AppDropdownItem>Tüm bildirimleri görüntüle</AppDropdownItem>
          </AppDropdown>

          <AppDropdown
            trigger={
              <button
                type="button"
                className="hidden items-center gap-3 rounded-2xl bg-transparent px-2 py-1 transition hover:bg-primarySoft focus:outline-none focus-visible:ring-2 focus-visible:ring-primarySoft md:flex"
                aria-label="Admin profil menüsü"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primarySoft text-sm font-bold text-primaryDark">
                  OA
                </div>

                <div className="text-left leading-none">
                  <AppText variant="captionStrong" className="text-textDark">
                    Yönetici
                  </AppText>

                  <AppText variant="caption" className="text-primaryDark">
                    Süper Admin
                  </AppText>
                </div>

                <ChevronDown size={16} className="text-primaryDark" />
              </button>
            }
            contentClassName="w-56"
          >
            <div className="space-y-1">
              <AppDropdownItem>Profil</AppDropdownItem>
              <AppDropdownItem>Ayarlar</AppDropdownItem>

              <AppDropdownItem variant="danger" onClick={handleLogout}>
                <span className="flex items-center gap-2">
                  <LogOut size={16} />
                  Çıkış Yap
                </span>
              </AppDropdownItem>
            </div>
          </AppDropdown>

          <AppDropdown
            className="md:hidden"
            trigger={
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primarySoft text-sm font-bold text-primaryDark transition hover:bg-primaryLight focus:outline-none focus-visible:ring-2 focus-visible:ring-primarySoft"
                aria-label="Mobil admin profil menüsü"
              >
                OA
              </button>
            }
            contentClassName="w-56"
          >
            <div className="space-y-1">
              <AppDropdownItem>Profil</AppDropdownItem>
              <AppDropdownItem>Ayarlar</AppDropdownItem>

              <AppDropdownItem variant="danger" onClick={handleLogout}>
                <span className="flex items-center gap-2">
                  <LogOut size={16} />
                  Çıkış Yap
                </span>
              </AppDropdownItem>
            </div>
          </AppDropdown>
        </div>
      </div>

      <div className="border-t border-borderSoft px-4 py-3 sm:px-6 xl:hidden">
        <AppSearchInput
          aria-label="Mobil admin arama"
          placeholder="Ara..."
          containerClassName="w-full"
        />
      </div>
    </header>
  );
}
