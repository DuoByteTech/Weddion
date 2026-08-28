import { AppCard, AppText } from "@/components/ui";

export function AdminUsersPage() {
  return (
    <AppCard className="border border-base-300 bg-base-100 p-6 shadow-sm">
      <AppText variant="title" as="h1">
        Kullanıcılar
      </AppText>

      <AppText variant="body" className="mt-2">
        Burada kullanıcı listesi, premium durumları, kayıt tarihleri ve işlem
        butonları olacak.
      </AppText>
    </AppCard>
  );
}
