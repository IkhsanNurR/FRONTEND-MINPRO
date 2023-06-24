import { CookieValueTypes } from "cookies-next";
import * as jwt from "jsonwebtoken";

export default function decodeTokenRole(token: CookieValueTypes) {
  if (typeof token === "string") {
    const decode = jwt.decode(token);
    if (typeof decode === "object" && decode?.sub) {
      const role: RoleType = {
        role: decode.sub as
          | "Admin"
          | "Employee"
          | "Kandidat"
          | "Talent"
          | "Trainee"
          | "Student"
          | "HR",
      };
      return role;
    }
  }
  return null;
}
