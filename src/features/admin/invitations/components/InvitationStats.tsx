import { Crown, Mail } from "lucide-react";

import { AppActionCard } from "@/components/common/AppActionCard";
import type { AdminInvitation } from "../types/invitation.types";

type InvitationStatsProps = {
  invitations: AdminInvitation[];
};

export function InvitationStats({ invitations }: InvitationStatsProps) {
  const totalInvitations = invitations.length;

  const premiumInvitations = invitations.filter(
    (invitation) => invitation.isPremium,
  ).length;

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <AppActionCard
        title="Tüm Davetiyeler"
        icon={Mail}
        showArrow={false}
        className="h-full"
      >
        <p className="font-cormorantBold -mt-4 text-4xl text-textDark">
          {totalInvitations}
        </p>
      </AppActionCard>

      <AppActionCard
        title="Premium Davetiyeler"
        icon={Crown}
        showArrow={false}
        className="h-full"
      >
        <p className="font-cormorantBold -mt-4 text-4xl text-textDark">
          {premiumInvitations}
        </p>
      </AppActionCard>
    </div>
  );
}
