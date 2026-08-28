import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {
  getCurrentUserRole,
  getRedirectPathByRole,
} from "@/features/auth/services/authService";
import type { AppRole } from "@/features/auth/types/authTypes";

type PublicRouteStatus = "loading" | "guest" | "authenticated";

export function PublicOnlyRoute() {
  const [status, setStatus] = useState<PublicRouteStatus>("loading");
  const [role, setRole] = useState<AppRole | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      const currentRole = await getCurrentUserRole();

      if (!isMounted) {
        return;
      }

      if (!currentRole) {
        setStatus("guest");
        return;
      }

      setRole(currentRole);
      setStatus("authenticated");
    }

    checkSession();

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === "loading") {
    return null;
  }

  if (status === "authenticated" && role) {
    return <Navigate to={getRedirectPathByRole(role)} replace />;
  }

  return <Outlet />;
}
