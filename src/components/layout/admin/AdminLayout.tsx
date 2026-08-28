import { useState } from "react";
import { Outlet } from "react-router-dom";

import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

const ADMIN_DRAWER_ID = "admin-drawer";

export function AdminLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  function toggleSidebar() {
    setIsSidebarCollapsed((currentValue) => !currentValue);
  }

  return (
    <div className="drawer min-h-screen bg-background lg:drawer-open">
      <input id={ADMIN_DRAWER_ID} type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex min-h-screen flex-col">
        <AdminHeader
          drawerId={ADMIN_DRAWER_ID}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={toggleSidebar}
        />

        <main className="flex-1 bg-background px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <Outlet />
        </main>
      </div>

      <div className="drawer-side z-40">
        <label
          htmlFor={ADMIN_DRAWER_ID}
          aria-label="Admin menüsünü kapat"
          className="drawer-overlay"
        />

        <AdminSidebar isCollapsed={isSidebarCollapsed} />
      </div>
    </div>
  );
}
