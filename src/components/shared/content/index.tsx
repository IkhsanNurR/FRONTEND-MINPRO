import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import { Breadcrumbs, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const Content = (props: any) => {
  const { title, children, ...others } = props;
  const router = useRouter();
  const routenya = router.pathname;
  const pathArray = routenya.split("/").filter((item) => item !== ""); // Mengubah rute menjadi array dan menghapus elemen kosong
  const lastThreePaths = pathArray.slice(-3); // Mengambil tiga elemen terakhir dari array

  const pathObjects: any = lastThreePaths.map((route, index) => {
    const path = `/${lastThreePaths.slice(0, index + 1).join("/")}`; // Mendapatkan jalur berdasarkan rute

    return {
      route,
      path,
    };
  });
  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        className="md:-ml-1 -ml-3 mb-2 mt-16 relative"
      >
        {pathObjects.length < 3 ? (
          <div>
            <HomeIcon fontSize="small" className="-mt-1 mr-1" />
            <Link underline="hover" color="inherit" href="/app">
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
      {title ? (
        <div className="relative bg-gray-200 shadow-lg border-b rounded-md border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 w-full">
          <div className="flex-1 min-w-0 ">
            <h1 className="text-2lg font-bold leading-6 text-gray-900 sm:truncate uppercase">
              {title}
            </h1>
          </div>
        </div>
      ) : null}

      <div className="mt-8 sm:block relative">
        <div className="align-middle inline-block min-w-full border-b border-gray-200">
          {children}
        </div>
      </div>
    </>
  );
};

export default Content;
