import logo from "../../../public/logo.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Breadcrumbs, Button, Link } from "@mui/material";
import { HomeIcon } from "@heroicons/react/24/solid";
import Content from "./content";

export default function HeaderUser({ showNav, setShowNav, props }: any) {
  const [token, setToken] = useState("");
  const router = useRouter();
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("reftoken");
    router.push("/login");
  };

  //   const { title, children, ...others } = props;
  //children ini bawaan REACT CUK
  const routenya = router.pathname;
  const pathArray = routenya.split("/").filter((item) => item !== ""); // Mengubah rute menjadi array dan menghapus elemen kosong
  let lastThreePaths: any;
  if (pathArray[pathArray.length - 1] == "edit") {
    lastThreePaths = pathArray.slice(0, -1);
  } else {
    lastThreePaths = pathArray.slice(-3); // Mengambil tiga elemen terakhir dari array
  }
  const pathObjects: any = lastThreePaths.map((route: any, index: any) => {
    const path = `/${lastThreePaths.slice(0, index + 1).join("/")}`; // Mendapatkan jalur berdasarkan rute

    return {
      route,
      path,
    };
  });

  useEffect(() => {
    setToken(sessionStorage.getItem("token") || "");
  }, []);

  return (
    <div
      className={`mt-14  bg-white fixed w-full h-16 flex items-center transition-all duration-[400ms] z-30 border-2  ${
        showNav ? "pl-52 flex" : ""
      }`}
    >
      <div className="md:pl-3 ">
        <MenuIcon
          className="h-8 w-8 text-gray-700 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        />
      </div>

      <div className="ml-10 ">
        <Breadcrumbs aria-label="breadcrumb" className="md:-ml-4 text-xs">
          {pathObjects.length < 3 ? (
            <div className="flex">
              <HomeIcon fontSize="small" className="-mt-1 mr-1 " />
              <div className="flex flex-wrap">
                <Link underline="hover" color="inherit" href="/">
                  Home
                </Link>
              </div>
            </div>
          ) : null}
          {(pathObjects || []).map((mn: any) => (
            <Link underline="hover" color="inherit" href={mn.path}>
              {mn.route}
            </Link>
          ))}
        </Breadcrumbs>
      </div>
    </div>
  );
}
