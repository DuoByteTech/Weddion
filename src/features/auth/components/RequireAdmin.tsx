import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {
  getCurrentUserRole,
  logoutUser,
} from "@/features/auth/services/authService";

type AuthStatus = "loading" | "authorized" | "unauthorized";

export function RequireAdmin() {
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    let isMounted = true;

    async function checkAdminAccess() {
      const role = await getCurrentUserRole();

      if (!isMounted) {
        return;
      }

      if (role === "admin") {
        setStatus("authorized");
        return;
      }

      await logoutUser();
      setStatus("unauthorized");
    }

    checkAdminAccess();

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-text">
        <div className="rounded-3xl border border-borderSoft bg-surface px-8 py-6 shadow-card">
          <p className="font-manropeSemiBold text-sm text-textMuted">
            Yetki kontrol ediliyor...
          </p>
        </div>
      </div>
    );
  }

  if (status === "unauthorized") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
