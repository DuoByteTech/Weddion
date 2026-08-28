import {
  Activity,
  Crown,
  FileImage,
  GalleryHorizontal,
  HardDrive,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import { AppButton, AppCard, AppText } from "@/components/ui";

const stats = [
  {
    label: "Toplam Kullanıcı",
    value: "1.248",
    change: "+12%",
    icon: Users,
  },
  {
    label: "Aktif Davetiye",
    value: "486",
    change: "+8%",
    icon: GalleryHorizontal,
  },
  {
    label: "Premium Üye",
    value: "132",
    change: "+18%",
    icon: Crown,
  },
  {
    label: "Yüklenen Fotoğraf",
    value: "8.942",
    change: "+24%",
    icon: FileImage,
  },
];

const recentUsers = [
  {
    name: "Nisa Nur",
    email: "nisa@example.com",
    plan: "Premium",
    time: "12 dk önce",
  },
  {
    name: "Onur Aydınoğlu",
    email: "onur@example.com",
    plan: "Standart",
    time: "28 dk önce",
  },
  {
    name: "Elif Yılmaz",
    email: "elif@example.com",
    plan: "Premium",
    time: "1 saat önce",
  },
];

const popularTemplates = [
  {
    name: "Bordo Dokunuş",
    category: "Flower",
    usage: 82,
  },
  {
    name: "Mavi Zarafet",
    category: "Flower",
    usage: 64,
  },
  {
    name: "Klasik Altın Çerçeve",
    category: "Classic",
    usage: 49,
  },
];

const systemStatus = [
  {
    label: "R2 Storage",
    value: "Aktif",
  },
  {
    label: "Supabase",
    value: "Aktif",
  },
  {
    label: "Bildirim Servisi",
    value: "Normal",
  },
];

export function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-borderSoft bg-gradient-to-r from-primarySoft via-surface to-surfaceLight p-6 shadow-card sm:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-surface/70 px-4 py-2 text-primaryDark">
              <ShieldCheck size={16} />

              <AppText variant="captionStrong" className="text-primaryDark">
                Admin Dashboard
              </AppText>
            </div>

            <AppText
              variant="title"
              as="h1"
              className="text-3xl text-textDark sm:text-4xl"
            >
              Weddion Yönetim Paneli
            </AppText>

            <AppText variant="body" className="mt-3 max-w-2xl leading-6">
              Platformdaki kullanıcıları, davetiyeleri, şablonları, fotoğraf
              yüklemelerini ve depolama durumunu tek merkezden takip et.
            </AppText>
          </div>

          <div className="rounded-3xl border border-borderSoft bg-surface/80 p-5 shadow-cardSoft">
            <AppText variant="caption">Bugünkü Aktivite</AppText>

            <AppText
              variant="title"
              as="strong"
              className="mt-2 block text-3xl text-primaryDark"
            >
              324
            </AppText>

            <AppText variant="caption" className="mt-1">
              son 24 saat
            </AppText>
          </div>
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <AppCard
              key={stat.label}
              className="border border-borderSoft bg-surface p-5 shadow-cardSoft"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <AppText variant="caption">{stat.label}</AppText>

                  <AppText
                    variant="title"
                    as="strong"
                    className="mt-2 block text-3xl text-textDark"
                  >
                    {stat.value}
                  </AppText>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primarySoft text-primaryDark">
                  <Icon size={22} />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primarySoft px-2.5 py-1 text-xs font-bold text-primaryDark">
                  <TrendingUp size={13} />
                  {stat.change}
                </span>

                <AppText variant="caption">son 30 gün</AppText>
              </div>
            </AppCard>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <AppCard className="border border-borderSoft bg-surface p-6 shadow-cardSoft">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <AppText variant="subtitle" as="h2">
                Platform Aktivitesi
              </AppText>

              <AppText variant="body" className="mt-1">
                Davetiye oluşturma, fotoğraf yükleme ve kullanıcı hareketleri.
              </AppText>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primarySoft text-primaryDark">
              <Activity size={21} />
            </div>
          </div>

          <div className="grid h-72 items-end gap-3 rounded-3xl border border-borderSoft bg-backgroundSoft p-5 sm:grid-cols-12">
            {[48, 62, 54, 73, 66, 82, 77, 91, 86, 96, 88, 104].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex h-full items-end rounded-full bg-surface p-1"
                >
                  <div
                    className="w-full rounded-full bg-gradient-to-t from-primaryDark to-primary"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ),
            )}
          </div>
        </AppCard>

        <AppCard className="border border-borderSoft bg-surface p-6 shadow-cardSoft">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <AppText variant="subtitle" as="h2">
                Depolama Kullanımı
              </AppText>

              <AppText variant="body" className="mt-1">
                Fotoğraf ve davetiye medya alanı.
              </AppText>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primarySoft text-primaryDark">
              <HardDrive size={21} />
            </div>
          </div>

          <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full border-[18px] border-primarySoft">
            <div className="text-center">
              <AppText
                variant="title"
                as="strong"
                className="block text-4xl text-primaryDark"
              >
                64%
              </AppText>

              <AppText variant="caption">kullanıldı</AppText>
            </div>
          </div>

          <div className="mt-7 space-y-4">
            <StorageProgress label="Misafir fotoğrafları" value={46} />
            <StorageProgress label="Davetiye görselleri" value={38} />
            <StorageProgress label="Kapak görselleri" value={16} />
          </div>
        </AppCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <AppCard className="border border-borderSoft bg-surface p-6 shadow-cardSoft">
          <div className="mb-5 flex items-center gap-3">
            <Users size={21} className="text-primaryDark" />

            <AppText variant="subtitle" as="h2">
              Son Kullanıcılar
            </AppText>
          </div>

          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div
                key={user.email}
                className="rounded-2xl border border-borderSoft bg-backgroundSoft px-4 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <AppText variant="captionStrong">{user.name}</AppText>

                    <AppText variant="caption" className="mt-1">
                      {user.email}
                    </AppText>
                  </div>

                  <span className="rounded-full bg-primarySoft px-2.5 py-1 text-xs font-bold text-primaryDark">
                    {user.plan}
                  </span>
                </div>

                <AppText variant="caption" className="mt-3">
                  {user.time}
                </AppText>
              </div>
            ))}
          </div>
        </AppCard>

        <AppCard className="border border-borderSoft bg-surface p-6 shadow-cardSoft">
          <div className="mb-5 flex items-center gap-3">
            <Sparkles size={21} className="text-primaryDark" />

            <AppText variant="subtitle" as="h2">
              Popüler Şablonlar
            </AppText>
          </div>

          <div className="space-y-4">
            {popularTemplates.map((template) => (
              <div key={template.name}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div>
                    <AppText variant="captionStrong">{template.name}</AppText>

                    <AppText variant="caption" className="mt-1">
                      {template.category}
                    </AppText>
                  </div>

                  <AppText variant="captionStrong">
                    {template.usage} kullanım
                  </AppText>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-primarySoft">
                  <div
                    className="h-full rounded-full bg-primaryDark"
                    style={{ width: `${template.usage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </AppCard>

        <AppCard className="border border-borderSoft bg-surface p-6 shadow-cardSoft">
          <div className="mb-5 flex items-center gap-3">
            <ShieldCheck size={21} className="text-primaryDark" />

            <AppText variant="subtitle" as="h2">
              Sistem Durumu
            </AppText>
          </div>

          <div className="space-y-3">
            {systemStatus.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-2xl border border-borderSoft bg-backgroundSoft px-4 py-3"
              >
                <AppText variant="captionStrong">{item.label}</AppText>

                <span className="rounded-full bg-primarySoft px-2.5 py-1 text-xs font-bold text-primaryDark">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <AppButton variant="outline" className="mt-5 w-full">
            Sistem detaylarını gör
          </AppButton>
        </AppCard>
      </section>
    </div>
  );
}

type StorageProgressProps = {
  label: string;
  value: number;
};

function StorageProgress({ label, value }: StorageProgressProps) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-xs font-semibold text-textDark">
        <span>{label}</span>
        <span>{value}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-primarySoft">
        <div
          className="h-full rounded-full bg-primaryDark"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
