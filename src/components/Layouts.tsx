import AdminLayout from "@/components/shared/layout";
import LoginLayout from "./shared/loginLayout";
import UserLayout from "./shared/UserLayout";

export const Layouts = {
  Admin: AdminLayout,
  Login: LoginLayout,
  User: UserLayout,
};

export type LayoutsKeys = keyof typeof Layouts;
