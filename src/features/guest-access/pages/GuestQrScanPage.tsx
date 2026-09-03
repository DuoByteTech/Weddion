import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppBackButton } from "@/components/ui/AppBackButton";
import { AppText } from "@/components/ui/AppText";

import { getInvitationByGuestSlug } from "@/services/guestInvitationService";

import { QrCamera } from "../components/QrCamera";
import { QrScanInfoCard } from "../components/QrScanInfoCard";

function getSlugFromQrValue(value: string): string | null {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return null;
  }

  /*
   * Mobil uygulamada üretilen mevcut QR formatı:
   *
   * weddion:///guest-upload/267c71f3a5c5b6f238a37dc63994d6e4
   */
  const weddionPrefix = "weddion:///guest-upload/";

  if (normalizedValue.startsWith(weddionPrefix)) {
    const slug = normalizedValue.slice(weddionPrefix.length).trim();

    return slug || null;
  }

  /*
   * İleride QR değerini web URL'sine çevirirsek
   * bu formatları da destekleyelim:
   *
   * https://weddion.vercel.app/guest-upload/SLUG
   * https://weddion.com/guest-upload/SLUG
   */
  try {
    const url = new URL(normalizedValue);

    const pathParts = url.pathname
      .split("/")
      .map((part) => part.trim())
      .filter(Boolean);

    const guestUploadIndex = pathParts.indexOf("guest-upload");

    if (guestUploadIndex !== -1 && pathParts.length > guestUploadIndex + 1) {
      return pathParts[guestUploadIndex + 1];
    }
  } catch {
    /*
     * URL değilse doğrudan slug olma ihtimalini
     * aşağıda kontrol ediyoruz.
     */
  }

  /*
   * QR içerisinde doğrudan slug varsa onu da kabul et.
   *
   * Supabase'deki mevcut slug örneği:
   * 267c71f3a5c5b6f238a37dc63994d6e4
   */
  if (/^[a-zA-Z0-9]+$/.test(normalizedValue)) {
    return normalizedValue;
  }

  return null;
}

export function GuestQrScanPage() {
  const navigate = useNavigate();

  const isProcessingRef = useRef(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleQrScan = useCallback(
    async (value: string) => {
      /*
       * qr-scanner aynı QR'ı kamera açıkken art arda
       * birkaç kez okuyabilir.
       *
       * Bu yüzden ilk okuma işlenirken diğerlerini engelliyoruz.
       */
      if (isProcessingRef.current) {
        return;
      }

      isProcessingRef.current = true;

      try {
        setIsProcessing(true);
        setErrorMessage(null);

        const slug = getSlugFromQrValue(value);

        if (!slug) {
          setErrorMessage(
            "Okutulan QR kod geçerli bir Weddion etkinlik QR kodu değil.",
          );

          isProcessingRef.current = false;

          return;
        }

        const invitation = await getInvitationByGuestSlug(slug);

        if (!invitation) {
          setErrorMessage(
            "Etkinlik bulunamadı. QR kodun süresi dolmuş veya fotoğraf yükleme kapatılmış olabilir.",
          );

          isProcessingRef.current = false;

          return;
        }

        navigate("/guest-upload", {
          state: {
            invitation,
          },
        });
      } catch (error) {
        console.error("QR kod kontrol hatası:", error);

        setErrorMessage(
          "QR kod kontrol edilirken bir hata oluştu. Lütfen tekrar deneyin.",
        );

        isProcessingRef.current = false;
      } finally {
        setIsProcessing(false);
      }
    },
    [navigate],
  );

  return (
    <main className="relative min-h-screen bg-black">
      <AppBackButton onClick={() => navigate(-1)} />

      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col">
        <QrCamera onScan={handleQrScan} />

        {isProcessing || errorMessage ? (
          <div className="absolute bottom-28 left-1/2 z-20 w-[calc(100%-32px)] max-w-[520px] -translate-x-1/2">
            {isProcessing ? (
              <div className="rounded-2xl bg-white/95 px-5 py-4 text-center shadow-lg backdrop-blur-md">
                <AppText
                  variant="body"
                  className="font-medium text-primaryDark"
                >
                  Etkinlik kontrol ediliyor...
                </AppText>
              </div>
            ) : null}

            {errorMessage ? (
              <div className="rounded-2xl bg-white/95 px-5 py-4 text-center shadow-lg backdrop-blur-md">
                <AppText variant="body" className="!text-red-500">
                  {errorMessage}
                </AppText>
              </div>
            ) : null}
          </div>
        ) : null}

        <QrScanInfoCard />
      </div>
    </main>
  );
}
