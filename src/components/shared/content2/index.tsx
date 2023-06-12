import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import { Breadcrumbs, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const Content2 = (props: any) => {
  const { title, children, ...others } = props;
  //children ini bawaan REACT CUK
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
    <div className="mx-5">
      <Breadcrumbs
        aria-label="breadcrumb"
        className="md:-ml-4 -ml-3 mb-2 mt-16 relative"
      >
        {pathObjects.length < 3 ? (
          <div>
            <HomeIcon fontSize="small" className="-mt-1 mr-1" />
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
          </div>
        ) : null}
        {(pathObjects || []).map((mn: any) => (
          <Link
            underline="hover"
            color="inherit"
            href={mn.path}
            key={`${mn.key}`}
          >
            {mn.route}
          </Link>
        ))}
      </Breadcrumbs>
      <div className="justify-between items-center flex  bg-white shadow-sm border-b border-gray-200 px-4 py-4  2xl:block  w-full">
        <div className="mr-5">
          <h1 className="text-2lg font-bold leading-6 text-gray-900 sm:truncate uppercase">
            {title}
          </h1>
        </div>
        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <button
            onClick={() => others.fungsi1()}
            type="button"
            className="order-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-500 hover:bg-blue-600 text-sm font-medium text-white focus:outline-none   sm:order-1 "
          >
            {others.namafungsi1}
          </button>
          <button
            onClick={() => others.fungsi2()}
            type="button"
            className="order-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-500 hover:bg-blue-600 text-sm font-medium text-white focus:outline-none    sm:order-1 ml-2"
          >
            {others.namafungsi2}
          </button>
        </div>
      </div>

      <div className="mt-8 sm:block relative">
        <div className="align-middle inline-block min-w-full border-b border-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Content2;
