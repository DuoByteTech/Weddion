import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { AppButton } from "@/components/ui/AppButton";
import { AppContainer } from "@/components/ui/AppContainer";
import { AppText } from "@/components/ui/AppText";

import { GuestEventHero } from "../components/GuestEventHero";
import { PhotoSourceActions } from "../components/PhotoSourceActions";
import { SelectedPhotosSection } from "../components/SelectedPhotosSection";
import { UploadPrivacyNotice } from "../components/UploadPrivacyNotice";

import type { GuestEventInfo } from "../types/guest-upload.types";
import { AppBackButton } from "@/components/ui/AppBackButton";

const mockEvent: GuestEventInfo = {
  brideName: "Nisa",
  groomName: "Onur",
  eventDate: "2026-09-14",
  eventTime: "20:00",
};

export function GuestPhotoUploadPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background">
      <AppContainer className="!max-w-[860px] py-6 sm:py-8 lg:py-10">
        <AppBackButton onClick={() => navigate(-1)} />

        <GuestEventHero event={mockEvent} />

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
