import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import { Breadcrumbs, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const Content = (props: any) => {
  const { title, children, ...others } = props;
  //children ini bawaan REACT CUK
  const router = useRouter();
  const routenya = router.pathname;
  const pathArray = routenya.split("/").filter((item) => item !== ""); // Mengubah rute menjadi array dan menghapus elemen kosong
  let lastThreePaths: any;
  // console.log('query',router.query)
  // console.log('path',pathArray)
  if (pathArray[pathArray.length - 1].startsWith("[")) {
    const queryParam = router.query.name; 
    lastThreePaths = [...pathArray.slice(0, -1), queryParam];
    // console.log('',lastThreePaths)
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
      <div className="relative bg-blue-500 shadow-lg border-b rounded-lg border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 w-full">
        <div className="flex-1 min-w-0 ">
          <h1 className="text-2lg font-bold leading-6 text-white sm:truncate uppercase">
            {title}
          </h1>
        </div>
      </div>

      <div className="sm:block relative">
        <div className="align-middle inline-block min-w-full border-gray-200">
          {children}
        </div>
      </div>
    </>
  );
};

export default Content;
