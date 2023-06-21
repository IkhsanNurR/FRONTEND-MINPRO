import AdminLayout from "@/components/shared/layout";
import LoginLayout from "./shared/loginLayout";
import UserLayout from "./User/UserLayout";
import GuestLayout from "./Guest/GuestLayout";

export const Layouts = {
  Admin: AdminLayout,
  Login: LoginLayout,
  User: UserLayout,
  Guest: GuestLayout
};

export type LayoutsKeys = keyof typeof Layouts;
