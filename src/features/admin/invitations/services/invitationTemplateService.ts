import { supabase } from "@/lib/supabase";
import { getR2SignedUrl } from "@/services/r2ImageService";
import type {
  AdminInvitation,
  InvitationTemplateRow,
} from "@/features/admin/invitations/types/invitation.types";
import type { InvitationTemplateCategoryRow } from "@/features/admin/invitations/types/invitationCategory.types";

function formatDate(value: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

async function createTemplateImageUrl(imagePath: string | null) {
  if (!imagePath) {
    return "";
  }

  try {
    return await getR2SignedUrl(imagePath);
  } catch (error) {
    console.log("Davetiye şablon görseli alınamadı:", {
      imagePath,
      error,
    });

    return "";
  }
}

async function mapInvitationTemplateToAdminInvitation(
  template: InvitationTemplateRow,
  categoryMap: Map<string, InvitationTemplateCategoryRow>,
): Promise<AdminInvitation> {
  const imageUrl = await createTemplateImageUrl(template.image_path);

  const categoryId = template.category_id ?? "";
  const category = categoryId ? categoryMap.get(categoryId) : null;

  return {
    id: template.id,
    name: template.title,
    categoryId,
    category: category?.title ?? "Kategori Yok",

    // ÖNEMLİ:
    // Filtre select value olarak kategori id kullandığı için
    // burada da categoryValue kategori id olmalı.
    categoryValue: categoryId,

    imageUrl,
    imageFileName: "image.png",
    isPremium: Boolean(template.is_premium),
    createdAt: formatDate(template.created_at),
  };
}

export async function getAdminInvitationTemplates(): Promise<
  AdminInvitation[]
> {
  const [templatesResult, categoriesResult] = await Promise.all([
    supabase
      .from("invitation_templates")
      .select(
        `
          id,
          title,
          category_id,
          image_path,
          editable_image_path,
          content_image_path,
          is_premium,
          is_active,
          sort_order,
          created_at
        `,
      )
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false }),

    supabase
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
      .eq("is_active", true),
  ]);

  if (templatesResult.error) {
    throw new Error(templatesResult.error.message);
  }

  if (categoriesResult.error) {
    throw new Error(categoriesResult.error.message);
  }

  const templates = (templatesResult.data || []) as InvitationTemplateRow[];
  const categories = (categoriesResult.data ||
    []) as InvitationTemplateCategoryRow[];

  const categoryMap = new Map(
    categories.map((category) => [category.id, category]),
  );

  return Promise.all(
    templates.map((template) =>
      mapInvitationTemplateToAdminInvitation(template, categoryMap),
    ),
  );
}
