export type AdminInvitation = {
  id: string;
  name: string;
  categoryId: string;
  category: string;
  categoryValue: string;
  imageUrl: string;
  imageFileName: "image.png";
  isPremium: boolean;
  createdAt: string;
};

export type InvitationTemplateCategoryRelation = {
  id: string;
  slug: string;
  title: string;
};

export type InvitationTemplateRow = {
  id: string;
  title: string;
  category_id: string | null;
  image_path: string | null;
  editable_image_path: string | null;
  content_image_path: string | null;
  is_premium: boolean | null;
  is_active: boolean | null;
  sort_order: number | null;
  created_at: string | null;
};
