import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { AppBackButton } from "@/components/ui/AppBackButton";

import { QrCamera } from "../components/QrCamera";
import { QrScanInfoCard } from "../components/QrScanInfoCard";

export function GuestQrScanPage() {
  const navigate = useNavigate();

  const handleQrScan = useCallback((value: string) => {
    console.log("Okunan QR:", value);

    // Şimdilik sadece QR okunduğunu görüyoruz.
    // Supabase / slug doğrulamasını daha sonra bağlayacağız.
  }, []);

  return (
    <main className="relative min-h-screen bg-black">
      <AppBackButton onClick={() => navigate(-1)} />

      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col">
        <QrCamera onScan={handleQrScan} />

        <QrScanInfoCard />
      </div>
    </main>
  );
}
