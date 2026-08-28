import { supabase } from "@/lib/supabase";
import type { AppRole } from "@/features/auth/types/authTypes";

type LoginParams = {
  email: string;
  password: string;
};

export async function loginWithEmailAndPassword({
  email,
  password,
}: LoginParams) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error("Kullanıcı bulunamadı.");
  }

  return data.user;
}

export async function getCurrentUserRole(): Promise<AppRole | null> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (error || !data) {
    return null;
  }

  return data.role as AppRole;
}

export async function logoutUser() {
  await supabase.auth.signOut();
}

export function getRedirectPathByRole(role: AppRole) {
  if (role === "admin") {
    return "/dashboard";
  }

  return "/login";
}
