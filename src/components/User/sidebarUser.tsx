import { forwardRef, LegacyRef } from "react";
import Link from "next/link";
import CottageIcon from "@mui/icons-material/Cottage";
import PeopleIcon from "@mui/icons-material/People";

// import logo from "../../images/logo.png";
// import logo_honda from "../../images/honda.svg";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  BusinessCenterRounded,
  MenuBookRounded,
  NoteAddRounded,
  SchoolRounded,
  Assignment,
  People,
  CottageRounded,
} from "@mui/icons-material";

//prettier-ignore
const SideBarUser = forwardRef(({}, ref:LegacyRef<HTMLDivElement>) => {
  const router = useRouter();

    const listMenu = [
      { to: "/bootcamp/dashboard", path: "dashboard", icon: <CottageRounded/>, name: "Dashboard" },
   
  ];
  return (
    <div ref={ref} className="fixed mt-[73px] w-52 h-full bg-white shadow-sm z-30 ">
      {/* <div className="flex justify-center mt-6 mb-14">
        <Image
        className="w-32 h-auto" src={logo_honda} alt="company logo" 
        />
      </div> */}

      <div className="flex flex-col mt-1 ">
        {(listMenu || []).map((mn) => (
          <Link href={`${mn.to}`}>
            <div
              className={`text-black pl-6 py-2 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors hover:bg-blue-500 hover:text-white 
              `}
            >
              <div className="mr-2">
                {mn.icon}
              </div>
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

SideBarUser.displayName = "SideBarUser";

export default SideBarUser;
