import { AppCard, AppText } from "@/components/ui";

export function AdminTemplatesPage() {
  return (
    <AppCard className="border border-base-300 bg-base-100 p-6 shadow-sm">
      <AppText variant="title" as="h1">
        Şablonlar
      </AppText>

      <AppText variant="body" className="mt-2">
        Burada davetiye şablonları ekleme, düzenleme, kategori seçimi ve
        aktif/pasif yönetimi olacak.
      </AppText>
    </AppCard>
  );
}
