import { AppLogo } from "@/components/common/AppLogo";
import { AppContainer, AppText } from "@/components/ui";

export function AuthHeader() {
  return (
    <AppContainer className="flex items-center justify-between border-b border-borderSoft pb-3 !my-4">
      <AppLogo size="md" showName />

      <AppText variant="serifSubtitle" className="hidden md:block">
        Davetinizi zarafetle yönetmeye başlayın
      </AppText>
    </AppContainer>
  );
}
