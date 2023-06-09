import logo from "../../../public/logo.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";

export default function TopBar({ showNav, setShowNav }: any) {
  const [token, setToken] = useState("");
  const router = useRouter();
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("reftoken");
    router.push("/login");
  };
  
  useEffect(() => {
    setToken(sessionStorage.getItem("token") || "");
  }, []);

  return (
    <div
      className={`mt-14 bg-white  fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] z-30 border-2 ${
        showNav ? "pl-52" : ""
      }`}
    >
      <div className="md:pl-3">
        <MenuIcon
          className="h-8 w-8 text-gray-700 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        />
      </div>
      {/* <div className="flex items-center pr-4 md:pr-16">
        <div>
          <Button variant="contained" className="bg-blue-500">Primary</Button>
        </div>
      </div> */}
    </div>
  );
}
