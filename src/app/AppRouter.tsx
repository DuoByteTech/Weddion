import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { AdminLayout } from "@/components/layout/admin/AdminLayout";
import { HomePage } from "@/features/home/pages/HomePage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { ForgotPasswordPage } from "@/features/auth/pages/ForgotPasswordPage";
import { ResetPasswordPage } from "@/features/auth/pages/ResetPasswordPage";
import { RequireAdmin } from "@/features/auth/components/RequireAdmin";
import { PublicOnlyRoute } from "@/features/auth/components/PublicOnlyRoute";
import { AdminDashboardPage } from "@/features/admin/pages/AdminDashboardPage";
import { AdminUsersPage } from "@/features/admin/pages/AdminUsersPage";
import { AdminInvitationsPage } from "@/features/admin/pages/AdminInvitationsPage";
import { AdminTemplatesPage } from "@/features/admin/pages/AdminTemplatesPage";
import { GuestAccessPage } from "@/features/guest-access/pages/GuestAccessPage";
import { GuestQrScanPage } from "@/features/guest-access/pages/GuestQrScanPage";
import { GuestPhotoUploadPage } from "@/features/guest-upload/pages/GuestPhotoUploadPage";
import { FeaturesPage } from "@/features/features/pages/FeaturesPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          ,<Route path="/features" element={<FeaturesPage />} />
        </Route>

        <Route path="/guest-access" element={<GuestAccessPage />} />
        <Route path="/qr-scan" element={<GuestQrScanPage />} />
        <Route path="/guest-upload" element={<GuestPhotoUploadPage />} />
        <Route path="/guest-upload/:slug" element={<GuestPhotoUploadPage />} />

        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        <Route element={<RequireAdmin />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<AdminDashboardPage />} />
            <Route path="/dashboard/users" element={<AdminUsersPage />} />
            <Route
              path="/dashboard/invitations"
              element={<AdminInvitationsPage />}
            />
            <Route
              path="/dashboard/templates"
              element={<AdminTemplatesPage />}
            />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
