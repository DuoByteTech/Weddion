import { AuthHero } from "@/features/auth/components/AuthHero";

export function ForgotPasswordHero() {
  return (
    <AuthHero
      title={"Şifrenizi\nkolayca yenileyin"}
      description="E-posta adresinizi girin, şifrenizi yenilemeniz için gerekli adımları size gönderelim."
    />
  );
}
