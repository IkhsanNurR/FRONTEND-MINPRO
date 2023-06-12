import { forwardRef, LegacyRef, useState } from "react";
import Link from "next/link";
import CottageIcon from "@mui/icons-material/Cottage";
import PeopleIcon from "@mui/icons-material/People";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { getCookie } from "cookies-next";
import * as jwt from "jsonwebtoken";

const SideBar = forwardRef(({}, ref: LegacyRef<HTMLDivElement>) => {
  const [role, setRole] = useState<RoleType | null>(null);
  const listMenu = [
    { key: 1, to: "/app", path: "/", icon: <CottageIcon />, name: "Dashboard" },
    {
      key: 2,
      to: "/app/master",
      path: "master",
      icon: <PeopleIcon />,
      name: "Master",
    },
    {
      key: 3,
      to: "/app/users",
      path: "users",
      icon: <PeopleIcon />,
      name: "Users",
    },
    {
      key: 4,
      to: "app/batch",
      path: "batch",
      icon: <PeopleIcon />,
      name: "Batch",
    },
    {
      key: 5,
      to: "app/bootcamp",
      path: "bootcamp",
      icon: <PeopleIcon />,
      name: "Bootcamp",
    },
  ];

  useEffect(() => {
    const token = getCookie("token");
    if (typeof token === "string") {
      const decode = jwt.decode(token);
      if (typeof decode === "object" && decode?.sub) {
        const decodeRole: RoleType = {
          role: decode.sub as
            | "Admin"
            | "Employee"
            | "Kandidat"
            | "Talent"
            | "Trainee"
            | "Student",
        };
        setRole(decodeRole);
      }
    }
  }, []);

  //buat filter menu sesuai role
  const filterMenu = listMenu.filter((menu) => {
    if (menu.path === "users" && role?.role !== "Admin") {
      return false;
    }

    //tambah disini
    // contoh
    // if (menu.path === "bootcamp" && role?.role !== "Employee") {
    //   return false;
    // }

    return true;
  });

  return (
    <div
      ref={ref}
      className="fixed mt-[58px] w-52 h-full bg-white shadow-sm z-30 "
    >
      <div className="flex flex-col mt-1 ">
        {(filterMenu || []).map((mn) => (
          <Link href={`${mn.to}`} key={`${mn.key}`}>
            <div
              className={`text-black pl-6 py-2 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors hover:bg-blue-500 hover:text-white 
              `}
            >
              <div className="mr-2">{mn.icon}</div>
              <div>
                <p>{mn.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
