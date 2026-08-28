import { supabase } from "@/lib/supabase";
import type {
  InvitationTemplateCategory,
  InvitationTemplateCategoryRow,
} from "@/features/admin/invitations/types/invitationCategory.types";

function mapCategoryRow(
  row: InvitationTemplateCategoryRow,
): InvitationTemplateCategory {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    sortOrder: row.sort_order,
    isActive: row.is_active,
    createdAt: row.created_at,
  };
}

export async function getInvitationTemplateCategories() {
  const { data, error } = await supabase
    .from("invitation_template_categories")
    .select(
      `
        id,
        slug,
        title,
        sort_order,
        is_active,
        created_at
      `,
    )
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return ((data || []) as InvitationTemplateCategoryRow[]).map(mapCategoryRow);
}
