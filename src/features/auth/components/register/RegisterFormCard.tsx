import { Eye, Lock, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { AppButton, AppInput } from "@/components/ui";
import { AuthFormCardShell } from "../AuthFormCardShell";

export function RegisterFormCard() {
  const navigate = useNavigate();

  return (
    <AuthFormCardShell>
      <div className="mb-7 text-center">
        <h2 className="text-2xl font-extrabold text-[#4F3C68]">Kayıt Ol</h2>

        <p className="mt-2 text-sm text-[#5E657A]">Hesabınızı oluşturun</p>
      </div>

      <form className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="relative">
            <AppInput
              label="Ad"
              type="text"
              placeholder="Adınız"
              className="pl-12"
            />

            <User
              size={19}
              className="pointer-events-none absolute left-4 top-[43px] text-[#74748E]"
            />
          </div>

          <div className="relative">
            <AppInput
              label="Soyad"
              type="text"
              placeholder="Soyadınız"
              className="pl-12"
            />

            <User
              size={19}
              className="pointer-events-none absolute left-4 top-[43px] text-[#74748E]"
            />
          </div>
        </div>

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

        <div className="relative">
          <AppInput
            label="Şifre"
            type="password"
            placeholder="Şifrenizi oluşturun"
            className="pl-12 pr-12"
          />

          <Lock
            size={19}
            className="pointer-events-none absolute left-4 top-[43px] text-[#74748E]"
          />

          <button
            type="button"
            className="absolute right-4 top-[42px] text-[#74748E] transition hover:text-[#8F5EC2]"
            aria-label="Şifreyi göster"
          >
            <Eye size={20} />
          </button>
        </div>

        <AppButton type="submit" className="mt-1 w-full">
          Kayıt Ol
        </AppButton>
      </form>

      <div className="my-7 flex items-center gap-5">
        <span className="h-px flex-1 bg-[#E3DCEA]" />
        <span className="text-xs font-medium text-[#6F6878]">veya</span>
        <span className="h-px flex-1 bg-[#E3DCEA]" />
      </div>

      <p className="text-center text-sm text-[#6A6578]">
        Zaten hesabınız var mı?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="font-bold text-[#9A5DCE] transition hover:text-[#7E45B4]"
        >
          Giriş yap
        </button>
      </p>
    </AuthFormCardShell>
  );
}
