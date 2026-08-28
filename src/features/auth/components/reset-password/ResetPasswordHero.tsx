import { AuthHero } from "@/features/auth/components/AuthHero";

export function ResetPasswordHero() {
  return (
    <AuthHero
      title={"Yeni şifrenizi\nbelirleyin"}
      description="Hesabınız için güçlü ve güvenli yeni bir şifre oluşturun."
    />
  );
}
