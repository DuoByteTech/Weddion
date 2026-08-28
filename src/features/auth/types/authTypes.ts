export type AppRole = "admin" | "user";

export type UserRoleRow = {
  user_id: string;
  role: AppRole;
};
