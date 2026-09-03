import { Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { AppBackButton } from "@/components/ui/AppBackButton";
import { AppButton } from "@/components/ui/AppButton";
import { AppContainer } from "@/components/ui/AppContainer";
import { AppText } from "@/components/ui/AppText";

import { GuestEventHero } from "../components/GuestEventHero";
import { PhotoSourceActions } from "../components/PhotoSourceActions";
import { SelectedPhotosSection } from "../components/SelectedPhotosSection";
import { UploadPrivacyNotice } from "../components/UploadPrivacyNotice";

import type { GuestInvitation } from "@/features/guest-access/types/guest-access.types";
import type { GuestEventInfo } from "../types/guest-upload.types";

type GuestUploadLocationState = {
  invitation?: GuestInvitation;
};

export function GuestPhotoUploadPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { invitation } =
    (location.state as GuestUploadLocationState | null) ?? {};

  const event: GuestEventInfo | null = invitation
    ? {
        brideName: invitation.bride_name,
        groomName: invitation.groom_name,
        eventDate: invitation.event_date,
        eventTime: invitation.event_time ?? "",
      }
    : null;

  if (!event) {
    return (
      <main className="relative min-h-screen bg-background">
        <AppBackButton onClick={() => navigate("/guest-access")} />

        <AppContainer className="!max-w-[620px] py-24">
          <div className="text-center">
            <AppText
              as="h1"
              variant="serifTitle"
              className="!text-[38px] leading-none"
            >
              Etkinlik bulunamadı
            </AppText>

            <AppText variant="body" className="mt-4 leading-7 text-textMuted">
              Fotoğraf yüklemek için geçerli bir etkinlik kodu veya QR kod
              kullanmalısınız.
            </AppText>

            <AppButton
              type="button"
              onClick={() => navigate("/guest-access")}
              className="mx-auto mt-7"
            >
              Etkinlik Kodu Gir
            </AppButton>
          </div>
        </AppContainer>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-background">
      <AppContainer className="!max-w-[860px] py-6 sm:py-8 lg:py-10">
        <AppBackButton onClick={() => navigate(-1)} />

        <GuestEventHero event={event} />

        <section className="mt-8">
          <div className="flex items-center gap-2">
            <AppText
              as="h2"
              variant="serifTitle"
              className="!text-[34px] leading-none sm:!text-[42px]"
            >
              Anılarınızı paylaşın
            </AppText>

            <Sparkles
              size={28}
              strokeWidth={1.8}
              className="text-primaryDark"
            />
          </div>

          <AppText
            variant="body"
            className="mt-3 !text-[14px] leading-6 text-textMuted sm:!text-[15px]"
          >
            Bu özel günden fotoğraflarınızı etkinlik galerisine yükleyin.
          </AppText>
        </section>

        <div className="mt-7">
          <PhotoSourceActions />
        </div>

        <div className="mt-9">
          <SelectedPhotosSection count={0} />
        </div>

        <div className="mt-8">
          <UploadPrivacyNotice />
        </div>

        <AppButton type="button" disabled className="mt-9 w-full">
          Fotoğrafları Yükle
        </AppButton>
      </AppContainer>
    </main>
  );
}
