export type GuestInvitation = {
  id: string;
  bride_name: string;
  groom_name: string;
  event_date: string;
  event_time: string | null;
  venue_name: string | null;
  guest_upload_code: string | null;
  guest_upload_slug: string | null;
  guest_upload_enabled: boolean;
};
