import { ArrowLeft, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { AppButton, AppInput } from "@/components/ui";
import { AuthFormCardShell } from "../AuthFormCardShell";

export function ForgotPasswordFormCard() {
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Buraya daha sonra şifre sıfırlama maili gönderme işlemi bağlanacak.
  }

  return (
    <AuthFormCardShell>
      <div className="mb-7 text-center">
        <h2 className="text-2xl font-extrabold text-[#4F3C68]">
          Şifremi Unuttum
        </h2>

        <p className="mt-2 text-sm text-[#5E657A]">
          Şifre yenileme bağlantısı için e-posta adresinizi yazın
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <AppInput
            label="E-posta"
            type="email"
            placeholder="E-posta adresiniz"
            className="pl-12"
          />

          <Mail
            size={19}
            className="pointer-events-none absolute left-4 top-[43px] text-[#74748E]"
          />
        </div>

        <AppButton type="submit" className="mt-1 w-full">
          Şifre Yenileme Bağlantısı Gönder
        </AppButton>
      </form>

      <button
        type="button"
        onClick={() => navigate("/login")}
        className="mx-auto mt-7 flex items-center gap-2 text-sm font-bold text-[#9A5DCE] transition hover:text-[#7E45B4]"
      >
        <ArrowLeft size={17} />
        Giriş sayfasına dön
      </button>
    </AuthFormCardShell>
  );
}
