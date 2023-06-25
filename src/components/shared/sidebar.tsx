import { forwardRef, LegacyRef, useState } from "react";
import Link from "next/link";
import PeopleIcon from "@mui/icons-material/People";
import React, { useEffect } from "react";
import { getCookie } from "cookies-next";
import * as jwt from "jsonwebtoken";
import {
  Assignment,
  AssignmentIndRounded,
  BusinessCenterRounded,
  CottageRounded,
  MenuBookRounded,
  NoteAddRounded,
  People,
  SchoolRounded,
} from "@mui/icons-material";
import Logo from "../../../public/logo3.png";
import Image from "next/image";
import {
  MdCategory,
  MdLocationOn,
  MdSportsMartialArts,
  MdViewModule,
} from "react-icons/md";
import { useRouter } from "next/router";

const SideBar = forwardRef(({}, ref: LegacyRef<HTMLDivElement>) => {
  const [role, setRole] = useState<RoleType | null>(null);
  // { to: '/skill', path: '/skill', icon: <MdSportsMartialArts />, name: 'Skill' },
  // { to: '/modules', path: '/modules', icon: <MdViewModule />, name: 'Modules' },
  // { to: '/locations', path: '/locations', icon: <MdLocationOn />, name: 'Locations' }
  const listMenu = [
    {
      key: 1,
      to: "/app",
      path: "/",
      icon: <CottageRounded />,
      name: "Dashboard",
    },
    {
      key: 2,
      to: "/app/candidat",
      path: "candidate",
      icon: <NoteAddRounded />,
      name: "Candidate",
    },
    {
      key: 3,
      to: "/app/batch",
      path: "batch",
      icon: <SchoolRounded />,
      name: "Batch",
    },
    {
      key: 4,
      to: "/app/talent",
      path: "talent",
      icon: <People />,
      name: "Talents",
    },
    {
      key: 5,
      to: "/app/curriculum",
      path: "curriculum",
      icon: <MenuBookRounded />,
      name: "Curriculum",
    },
    {
      key: 6,
      to: "/app/assignment",
      path: "assignment",
      icon: <Assignment />,
      name: "Assignment",
    },
    {
      key: 7,
      to: "/app/jobs",
      path: "jobs",
      icon: <BusinessCenterRounded />,
      name: "Posting Hiring",
    },
    {
      key: 8,
      to: "/app/client",
      path: "jobs",
      icon: <AssignmentIndRounded />,
      name: "Posting Client",
    },
    {
      key: 9,
      to: "/app/master/category",
      path: "master",
      icon: <MdCategory />,
      name: "Category",
    },
    {
      key: 10,
      to: "/app/master/skill",
      path: "master",
      icon: <MdSportsMartialArts />,
      name: "Skill",
    },
    {
      key: 11,
      to: "/app/master/modules",
      path: "master",
      icon: <MdViewModule />,
      name: "Modules",
    },
    {
      key: 12,
      to: "/app/master/locations",
      path: "master",
      icon: <MdLocationOn />,
      name: "Locations",
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
            | "Student"
            | "Instructor"
            | "Recruiter"
            | "Trainer",
        };
        setRole(decodeRole);
      }
    }
  }, []);

  const router = useRouter();
  //buat filter menu sesuai role
  const filterMenu = listMenu.filter((menu) => {
    //filter student
    if (role?.role == "Student") {
      router.push("/");
    }
    //filter admin
    if (["master", "payment"].includes(menu.path) && role?.role !== "Admin") {
      return false;
    }

    if (
      ["candidate", "batch", "curriculum"].includes(menu.path) &&
      role?.role !== "Trainer"
    ) {
      return false;
    }
    if (
      ["jobs", "client", "assignment"].includes(menu.path) &&
      role?.role !== "Recruiter"
    ) {
      return false;
    }
    // if (menu.path === "candidate" && role?.role !== "Recruiter") {
    //   return false;
    // }
    // if (menu.path === "talent" && role?.role !== "Trainer") {
    //   return false;
    // }

    // if (menu.path === "jobs" && role?.role !== "Recruiter") {
    //   return false;
    // }

    //tambah disini
    // contoh
    // if (menu.path === "bootcamp" && role?.role !== "Employee") {
    //   return false;
    // }

    return true;
  });
  console.log(filterMenu);
  return (
    <div ref={ref} className="fixed w-52 h-full bg-blue-500 shadow-sm z-30 ">
      <Image src={Logo} alt="gambar-logo" className="pt-6 px-3" />

      <div className="flex flex-col mt-8 ">
        {(filterMenu || []).map((mn) => (
          <Link href={`${mn.to}`} key={`${mn.key}`}>
            <div className="text-white pl-6 py-2 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors hover:bg-white hover:text-blue-500">
              <div className="mr-2 ">{mn.icon}</div>
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
