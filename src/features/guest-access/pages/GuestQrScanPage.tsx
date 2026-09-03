import { useNavigate } from "react-router-dom";

import { QrScanInfoCard } from "../components/QrScanInfoCard";
import { AppBackButton } from "@/components/ui/AppBackButton";

export function GuestQrScanPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col">
        <div className="relative flex flex-1 flex-col bg-black">
          <AppBackButton onClick={() => navigate(-1)} />

          <div className="flex min-h-[430px] flex-1 items-center justify-center sm:min-h-[520px] lg:min-h-[600px]">
            {/* Kamera daha sonra bu alanın tamamını dolduracak. */}
          </div>

          <QrScanInfoCard />
        </div>
      </div>
    </main>
  );
}
