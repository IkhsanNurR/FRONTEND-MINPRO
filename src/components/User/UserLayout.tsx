import React, { PropsWithChildren, useEffect, useState } from "react";
import Topbar2 from "../shared/topbar2";
import SideBarUser from "./sidebarUser";
import { Slide } from "@mui/material";
import HeaderUser from "./headerUser";


const UserLayout = ({ children }: any) => {
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
    return () => {
      removeEventListener("resize", handleResize);
    };
  });

  return (
    <>
      <Topbar2 />
      <HeaderUser  showNav={showNav} setShowNav={setShowNav}/>
      <Slide direction="right" in={showNav} timeout={400} appear={false}>
        <SideBarUser />
      </Slide>
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

export default UserLayout;
