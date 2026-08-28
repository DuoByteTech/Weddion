import { Eye, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { AppButton, AppInput } from "@/components/ui";
import { AuthFormCardShell } from "../AuthFormCardShell";

export function ResetPasswordFormCard() {
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Buraya daha sonra şifre güncelleme işlemi bağlanacak.
    // Örnek:
    // 1. URL içindeki reset token/session kontrol edilir.
    // 2. Şifre ve şifre onay karşılaştırılır.
    // 3. Auth servisi üzerinden yeni şifre kaydedilir.
    // 4. Başarılı olursa kullanıcı login sayfasına yönlendirilir.
  }

  return (
    <AuthFormCardShell>
      <div className="mb-7 text-center">
        <h2 className="text-2xl font-extrabold text-[#4F3C68]">Şifre Yenile</h2>

        <p className="mt-2 text-sm text-[#5E657A]">
          Hesabınız için yeni şifrenizi belirleyin
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <AppInput
            label="Yeni Şifre"
            type="password"
            placeholder="Yeni şifrenizi yazın"
            className="pl-12 pr-12"
          />

          <Lock
            size={19}
            className="pointer-events-none absolute left-4 top-[43px] text-[#74748E]"
          />

          <button
            type="button"
            className="absolute right-4 top-[42px] text-[#74748E] transition hover:text-[#8F5EC2]"
            aria-label="Yeni şifreyi göster"
          >
            <Eye size={20} />
          </button>
        </div>

        <div className="relative">
          <AppInput
            label="Şifre Onay"
            type="password"
            placeholder="Yeni şifrenizi tekrar yazın"
            className="pl-12 pr-12"
          />

          <Lock
            size={19}
            className="pointer-events-none absolute left-4 top-[43px] text-[#74748E]"
          />

          <button
            type="button"
            className="absolute right-4 top-[42px] text-[#74748E] transition hover:text-[#8F5EC2]"
            aria-label="Şifre onayı göster"
          >
            <Eye size={20} />
          </button>
        </div>

        <AppButton type="submit" className="mt-1 w-full">
          Şifremi Güncelle
        </AppButton>
      </form>

      <p className="mt-7 text-center text-sm text-[#6A6578]">
        Şifrenizi hatırladınız mı?{" "}
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
