import { useEffect, useRef, useState } from "react";

import QrScanner from "qr-scanner";

import { AppText } from "@/components/ui/AppText";

type QrCameraProps = {
  onScan: (value: string) => void;
};

export function QrCamera({ onScan }: QrCameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(true);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) {
      return;
    }

    const scanner = new QrScanner(
      videoElement,
      (result) => {
        onScan(result.data);
      },
      {
        preferredCamera: "environment",
        returnDetailedScanResult: true,
        highlightScanRegion: false,
        highlightCodeOutline: false,
      },
    );

    scannerRef.current = scanner;

    const startCamera = async () => {
      try {
        setCameraError(null);
        setIsStarting(true);

        await scanner.start();
      } catch (error) {
        console.error("Kamera başlatılamadı:", error);

        if (error instanceof DOMException) {
          if (error.name === "NotAllowedError") {
            setCameraError(
              "Kamera izni verilmedi. QR kod okutabilmek için tarayıcıdan kamera izni vermelisiniz.",
            );
          } else if (error.name === "NotFoundError") {
            setCameraError("Bu cihazda kullanılabilir bir kamera bulunamadı.");
          } else {
            setCameraError("Kamera başlatılırken bir hata oluştu.");
          }
        } else {
          setCameraError("Kamera başlatılırken bir hata oluştu.");
        }
      } finally {
        setIsStarting(false);
      }
    };

    void startCamera();

    return () => {
      scanner.stop();
      scanner.destroy();

      scannerRef.current = null;
    };
  }, [onScan]);

  return (
    <div className="relative min-h-[430px] flex-1 overflow-hidden bg-black sm:min-h-[520px] lg:min-h-[600px]">
      <video
        ref={videoRef}
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      {isStarting ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 px-6 text-center">
          <AppText className="text-white">Kamera açılıyor...</AppText>
        </div>
      ) : null}

      {cameraError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black px-6 text-center">
          <div className="max-w-[420px] rounded-2xl bg-white/95 p-6">
            <AppText as="h2" variant="subtitle" className="text-primaryDark">
              Kamera kullanılamıyor
            </AppText>

            <AppText variant="body" className="mt-3 leading-6">
              {cameraError}
            </AppText>
          </div>
        </div>
      ) : null}
    </div>
  );
}
