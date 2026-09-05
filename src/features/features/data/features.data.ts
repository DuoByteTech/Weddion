import {
  BellRing,
  CalendarHeart,
  Images,
  ListChecks,
  QrCode,
  UsersRound,
} from "lucide-react";

import type { FeatureItem } from "../types/features.types";

export const features: FeatureItem[] = [
  {
    title: "Dijital Davetiye",
    description:
      "Zarif davetiye şablonları arasından seçim yap, etkinlik bilgilerini düzenle ve davetiyeni kolayca paylaş.",
    icon: CalendarHeart,
  },
  {
    title: "QR Kod ile Fotoğraf Paylaşımı",
    description:
      "Misafirlerin üyelik oluşturmadan QR kodu okutarak etkinlik fotoğraflarını seninle paylaşabilsin.",
    icon: QrCode,
  },
  {
    title: "Ortak Anı Galerisi",
    description:
      "Düğün, nişan ve özel günlerinden gelen tüm fotoğrafları tek bir özel galeride bir araya getir.",
    icon: Images,
  },
  {
    title: "Misafir Deneyimi",
    description:
      "Misafirlerine karmaşık kayıt adımları sunmadan etkinliğine kolay ve hızlı erişim sağla.",
    icon: UsersRound,
  },
  {
    title: "Düğün Planlama",
    description:
      "Hazırlık sürecindeki önemli adımları daha düzenli takip ederek düğün planlamanı kolaylaştır.",
    icon: ListChecks,
  },
  {
    title: "Anlık Bildirimler",
    description:
      "Etkinliğinle ilgili önemli gelişmeleri ve yeni paylaşımları bildirimlerle takip et.",
    icon: BellRing,
  },
];
