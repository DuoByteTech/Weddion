import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { AppButton, AppInput } from "@/components/ui";
import { AuthFormCardShell } from "@/features/auth/components/AuthFormCardShell";
import {
  getCurrentUserRole,
  getRedirectPathByRole,
  loginWithEmailAndPassword,
  logoutUser,
} from "@/features/auth/services/authService";

export function LoginFormCard() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await loginWithEmailAndPassword({
        email: email.trim(),
        password,
      });

      const role = await getCurrentUserRole();

      if (!role) {
        await logoutUser();
        setErrorMessage("Kullanıcı rolü bulunamadı.");
        return;
      }

      if (role !== "admin") {
        await logoutUser();
        setErrorMessage("Bu panele giriş yetkiniz bulunmuyor.");
        return;
      }

      navigate(getRedirectPathByRole(role), { replace: true });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Giriş yapılırken bir hata oluştu.";

      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthFormCardShell>
      <div className="mb-7 text-center">
        <h2 className="text-2xl font-extrabold text-[#4F3C68]">Giriş Yap</h2>
        <p className="mt-2 text-sm text-[#5E657A]">Hesabınıza giriş yap</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <AppInput
            label="E-posta"
            type="email"
            placeholder="E-posta adresiniz"
            className="pl-12"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />

          <Mail
            size={19}
            className="pointer-events-none absolute left-4 top-[43px] text-[#74748E]"
          />
        </div>

        <div>
          <div className="relative">
            <AppInput
              label="Şifre"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Şifrenizi girin"
              className="pl-12 pr-12"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />

            <Lock
              size={19}
              className="pointer-events-none absolute left-4 top-[43px] text-[#74748E]"
            />

            <button
              type="button"
              onClick={() => setIsPasswordVisible((current) => !current)}
              className="absolute right-4 top-[42px] text-[#74748E] transition hover:text-[#8F5EC2]"
              aria-label={
                isPasswordVisible ? "Şifreyi gizle" : "Şifreyi göster"
              }
            >
              {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="mt-3 text-right">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-xs font-bold text-[#9A5DCE] transition hover:text-[#7E45B4]"
            >
              Şifremi unuttum
            </button>
          </div>
        </div>

        {errorMessage ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-xs font-semibold text-red-600">{errorMessage}</p>
          </div>
        ) : null}

        <AppButton
          type="submit"
          disabled={isSubmitting}
          className="mt-1 w-full"
        >
          {isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap"}
        </AppButton>
      </form>

      <div className="my-7 flex items-center gap-5">
        <span className="h-px flex-1 bg-[#E3DCEA]" />
        <span className="text-xs font-medium text-[#6F6878]">veya</span>
        <span className="h-px flex-1 bg-[#E3DCEA]" />
      </div>

      <p className="text-center text-sm text-[#6A6578]">
        Hesabınız yok mu?{" "}
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="font-bold text-[#9A5DCE] transition hover:text-[#7E45B4]"
        >
          Kayıt ol
        </button>
      </p>
    </AuthFormCardShell>
  );
}
