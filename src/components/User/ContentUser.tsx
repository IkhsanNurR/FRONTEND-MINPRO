import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import { Breadcrumbs, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const ContentUser = (props: any) => {
  const { title, children, ...others } = props;
  //children ini bawaan REACT CUK
  const router = useRouter();
  const routenya = router.pathname;
  const pathArray = routenya.split("/").filter((item) => item !== ""); // Mengubah rute menjadi array dan menghapus elemen kosong
  let lastThreePaths: any;
  if (pathArray[pathArray.length - 1].startsWith("[")) {
    const queryParam = router.query.name; 
    lastThreePaths = [...pathArray.slice(0, -1), queryParam];
    console.log('',lastThreePaths)
  } else if (pathArray[pathArray.length - 1] === "edit") {
    lastThreePaths = pathArray.slice(0, -1);
  } else {
    lastThreePaths = pathArray.slice(-3);
  }
  const pathObjects: any = lastThreePaths.map((route:any, index:any) => {

    const path = `/${lastThreePaths.slice(0, index + 1).join("/")}`; // Mendapatkan jalur berdasarkan rute

    return {
      route,
      path,
    };
  });
  return (
    <>
    <Breadcrumbs aria-label="breadcrumb" className="md:-ml-4 -ml-3 mb-2 mt-16 relative">
        {pathObjects.length < 3 ? (
          <div>
            <HomeIcon fontSize="small" className="-mt-1 mr-1"/>
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
          </div>
        ) : null}
        {(pathObjects || []).map((mn: any) => (
          <Link underline="hover" color="inherit" href={mn.path}>
            {mn.route}
          </Link>
        ))}
      </Breadcrumbs>
      <div className="mt-8 sm:block relative">
        <div className="align-middle inline-block min-w-full border-gray-200">
          {children}
        </div>
      </div>
    </>
  );
};

export default ContentUser;
