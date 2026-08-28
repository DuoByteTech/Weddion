import {
  Bell,
  FileImage,
  GalleryHorizontal,
  HardDrive,
  LayoutDashboard,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

export const adminNavigationItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Kullanıcılar",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    label: "Davetiyeler",
    href: "/dashboard/invitations",
    icon: GalleryHorizontal,
  },
  {
    label: "Şablonlar",
    href: "/dashboard/templates",
    icon: Sparkles,
  },
  {
    label: "Fotoğraflar",
    href: "/dashboard/photos",
    icon: FileImage,
  },
  {
    label: "Depolama",
    href: "/dashboard/storage",
    icon: HardDrive,
  },
  {
    label: "Bildirimler",
    href: "/dashboard/notifications",
    icon: Bell,
  },
  {
    label: "Ayarlar",
    href: "/dashboard/settings",
    icon: Settings,
  },
];
