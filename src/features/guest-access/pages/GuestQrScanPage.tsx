import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { QrScanInfoCard } from "../components/QrScanInfoCard";

export function GuestQrScanPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col">
        <div className="relative flex flex-1 flex-col bg-black">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Geri dön"
            className="
              absolute left-5 top-6 z-20
              flex h-11 w-11 items-center justify-center
              rounded-full
              text-primaryDark
              transition-opacity
              hover:opacity-80
              sm:left-8 sm:top-8
            "
          >
            <ArrowLeft size={30} strokeWidth={2} />
          </button>

          <div className="flex min-h-[430px] flex-1 items-center justify-center sm:min-h-[520px] lg:min-h-[600px]">
            {/* Kamera daha sonra bu alanın tamamını dolduracak. */}
          </div>

          <QrScanInfoCard />
        </div>
      </div>
    </main>
  );
}
