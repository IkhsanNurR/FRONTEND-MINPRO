import React, { useState, useEffect, Fragment } from "react";
// import { Transition } from "@headlessui/react";
// import { Outlet } from "react-router-dom";
import SideBar from "./sidebar";
import TopBar from "./topbar";
import { useRouter } from "next/router";
import { Slide } from "@mui/material";
import Header from "./header";

// import * as Jwt from "jsonwebtoken";
// import axios from "../config/endpoint";

const Layout = ({ children }: any) => {
  const router = useRouter();
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  function handleResize() {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }

    // if (!sessionStorage.getItem("token")) {
    //   router.push("/login");
    // }
    // const getdata = () => {
    //   const token: any = sessionStorage?.getItem("token");
    //   const decoded: any = Jwt.decode(token);
    //   const bandingke: any = parseInt(decoded?.exp) - Date.now() / 1000;
    //   if (bandingke <= 0) {
    //     const refresh = {
    //       uuid: decoded.userId,
    //     };
    //     axios.post("/login/refresh", refresh).then((response) => {
    //       const data = response.data.result;
    //       sessionStorage.setItem("token", data.token);
    //       sessionStorage.setItem("reftoken", data.reftoken);
    //       const decoded: any = Jwt.decode(data);
    //       axios.defaults.headers.common["Authorization"] = data.token;
    //       // sessionStorage.setItem("token", response.data);
    //     });
    //   }
    //   console.log(bandingke);
    //   setIsRefresh(true);
    //   // router.reload();
    // };
    // getdata();
    return () => {
      removeEventListener("resize", handleResize);
    };
  });

  return (
    <>
      {/* <Header /> */}
      <TopBar showNav={showNav} setShowNav={setShowNav} />
      <Slide direction="right" in={showNav} timeout={400} appear={false}>
        <SideBar />
      </Slide>
      {/* <Home /> */}
      <main
        className={`pt-16 transition-all duration-[400ms] ${
          showNav && !isMobile ? "pl-52" : ""
        }`}
      >
        <div className="px-4 md:px-12 bg-white">{children}</div>
      </main>
    </>
  );
};

export default Layout;
