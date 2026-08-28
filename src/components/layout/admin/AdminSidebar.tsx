import { NavLink } from "react-router-dom";
import { Crown } from "lucide-react";

import { AppLogo } from "@/components/common/AppLogo";
import { AppText } from "@/components/ui";
import { adminNavigationItems } from "./adminNavigation";

type AdminSidebarProps = {
  isCollapsed: boolean;
};

export function AdminSidebar({ isCollapsed }: AdminSidebarProps) {
  return (
    <aside
      className={[
        "flex min-h-full flex-col overflow-x-hidden border-r border-borderSoft bg-primarySoft/35 shadow-cardSoft transition-all duration-300",
        isCollapsed ? "w-20" : "w-72",
      ].join(" ")}
    >
      <div
        className={[
          "flex h-16 shrink-0 items-center border-b border-borderSoft",
          isCollapsed ? "justify-center px-0" : "px-6",
        ].join(" ")}
      >
        <AppLogo
          size="sm"
          showName={!isCollapsed}
          to="/admin"
          className={[
            "flex items-center",
            isCollapsed ? "justify-center" : "",
          ].join(" ")}
        />
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
        {!isCollapsed ? (
          <AppText
            variant="captionStrong"
            className="mb-2 px-3 uppercase tracking-[0.16em] text-primaryDark"
          >
            Yönetim
          </AppText>
        ) : null}

        <ul className="menu w-full gap-1 overflow-x-hidden p-0">
          {adminNavigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.href} className="w-full overflow-x-hidden">
                <NavLink
                  to={item.href}
                  end={item.end}
                  data-tip={item.label}
                  className={({ isActive }) =>
                    [
                      "flex min-w-0 w-full items-center rounded-xl text-sm font-semibold transition-all duration-200",
                      isCollapsed
                        ? "tooltip tooltip-right justify-center px-0 py-2.5"
                        : "gap-3 px-3 py-2.5",
                      "hover:bg-primaryDark hover:text-white",
                      isActive
                        ? "bg-primaryDark text-white shadow-cardSoft"
                        : "text-primaryDark/75",
                    ].join(" ")
                  }
                >
                  <Icon size={18} className="shrink-0" />

                  {!isCollapsed ? (
                    <span className="min-w-0 truncate">{item.label}</span>
                  ) : null}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="shrink-0 overflow-x-hidden border-t border-borderSoft p-3">
        {isCollapsed ? (
          <div className="flex justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-backgroundSoft text-primaryDark shadow-cardSoft">
              <Crown size={19} />
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-borderSoft bg-backgroundSoft p-3">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-primarySoft text-primaryDark">
              <Crown size={19} />
            </div>

            <AppText variant="captionStrong">Weddion Admin</AppText>

            <AppText variant="caption" className="mt-1 leading-5">
              Kullanıcıları, davetiyeleri, şablonları ve medya alanını yönet.
            </AppText>
          </div>
        )}
      </div>
    </aside>
  );
}
