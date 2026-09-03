import { supabase } from "@/lib/supabase";

import type { GuestInvitation } from "@/features/guest-access/types/guest-access.types";

function normalizeGuestCode(value: string) {
  const cleanedCode = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

  if (cleanedCode.length <= 3) {
    return cleanedCode;
  }

  return `${cleanedCode.slice(0, 3)}-${cleanedCode.slice(3)}`;
}

export async function getInvitationByGuestCode(
  code: string,
): Promise<GuestInvitation | null> {
  const normalizedCode = normalizeGuestCode(code);

  const { data, error } = await supabase.rpc(
    "get_invitation_for_guest_by_code",
    {
      target_code: normalizedCode,
    },
  );

  if (error) {
    console.error("Guest invitation code lookup error:", error);

    throw new Error("Etkinlik kodu kontrol edilirken bir hata oluştu.");
  }

  if (!data || data.length === 0) {
    return null;
  }

  return data[0] as GuestInvitation;
}

export async function getInvitationByGuestSlug(
  slug: string,
): Promise<GuestInvitation | null> {
  const normalizedSlug = slug.trim();

  const { data, error } = await supabase.rpc(
    "get_invitation_for_guest_by_slug",
    {
      target_slug: normalizedSlug,
    },
  );

  if (error) {
    console.error("Guest invitation slug lookup error:", error);

    throw new Error("QR kod kontrol edilirken bir hata oluştu.");
  }

  if (!data || data.length === 0) {
    return null;
  }

  return data[0] as GuestInvitation;
}
