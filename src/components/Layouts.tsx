import AdminLayout from "@/components/shared/layout";
import LoginLayout from "./shared/loginLayout";
import UserLayout from "./shared/UserLayout";
import SignupLayout from "./shared/signupLayout";

export const Layouts = {
  Admin: AdminLayout,
  Login: LoginLayout,
  User: UserLayout,
  Signup: SignupLayout,
};

export type LayoutsKeys = keyof typeof Layouts;
