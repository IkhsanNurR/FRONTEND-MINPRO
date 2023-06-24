import logo from "../../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import decodeTokenName from "@/helper/decodedTokenName";
import decodeTokenRole from "@/helper/decodeTokenRole";
import showNotification from "@/helper/notification";
import { GetByNameOrEmail } from "@/redux/usersSchema/profile/action/actionReducer";
import { CookieValueTypes, deleteCookie, getCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import {
  FileOutlined,
  LockOutlined,
  PoweroffOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Form,
  Input,
  MenuProps,
  Modal,
  Space,
} from "antd";
import { ModalChangePassword } from "./header";

export default function TopBar({ showNav, setShowNav }: any) {
  const [haveToken, setHaveToken] = useState<CookieValueTypes>("");
  const [modalChangePassword, setModalChangePassword] =
    useState<boolean>(false);
  const [name, setName] = useState<string | null>(null);
  const [roleTalent, setRoleTalent] = useState(true);
  const [roleKandidat, setRoleKandidat] = useState(true);
  const [roleStudent, setRoleStudent] = useState(true);

  const showModalChangePassword = () => {
    setModalChangePassword(true);
  };
  const router = useRouter();
  const token = getCookie("token");
  const dispatch = useDispatch();

  console.log("token", token);

  useEffect(() => {
    setHaveToken(token);
  }, []);

  const handleLogout = () => {
    deleteCookie("token");
    setHaveToken("");
    router.push("/");
  };

  const handelSubmit = () => {
    setModalChangePassword(!modalChangePassword);
  };

  let { users, refresh, msg, status }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );

  console.log("DATA USER", users);

  useEffect(() => {
    const decode = decodeTokenName(token);
    const role = decodeTokenRole(token);
    setRoleTalent(role?.role === "Talent");
    setRoleKandidat(role?.role === "Kandidat");
    setRoleStudent(role?.role === "Student");
    setName(decode);

    if (name) {
      dispatch(GetByNameOrEmail(name));
    }
  }, [token, name, refresh]);

  useEffect(() => {
    if (status === 400) {
      showNotification("error", msg);
    } else if (status === 200) {
      showNotification("success", msg);
    }
  }, [status]);

  const itemsProfile: MenuProps["items"] = [
    {
      label: (
        <>
          <Button
            className="flex"
            onClick={showModalChangePassword}
            type="link"
          >
            <LockOutlined className="pt-1" />
            <span className="">Change Password</span>
          </Button>
        </>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Button type="link" onClick={handleLogout}>
          <PoweroffOutlined className="" />
          <span>Sign Out</span>
        </Button>
      ),
      key: "1",
    },
  ];

  if (roleTalent || roleKandidat || roleStudent) {
    itemsProfile.splice(
      0,
      0,
      {
        label: (
          <Link href="/users/profile" className="flex">
            <Button type="link">
              <SolutionOutlined />
              <span className="pl-1">Profile</span>
            </Button>
          </Link>
        ),
        key: "2",
      },
      {
        label: (
          <>
            <Button className="flex" type="link">
              <FileOutlined className="pt-1" />
              <span>My Apply</span>
            </Button>
          </>
        ),
        key: "3",
      }
    );
  } else {
    itemsProfile.splice(0, 0, {
      label: (
        <Link href="/app/setting" className="flex">
          <Button type="link">
            <SolutionOutlined />
            <span className="pl-1">Profile</span>
          </Button>
        </Link>
      ),
      key: "2",
    });
  }

  console.log("sadsdsa");

  return (
    <div
      className={`bg-white  fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] z-30 ${
        showNav ? "pl-52" : ""
      }`}
    >
      <div className="md:pl-3">
        <MenuIcon
          className="h-8 w-8 text-gray-700 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        />
      </div>
      <div className="flex pr-14 w-max-md items-center">
        {haveToken ? (
          <>
            <Dropdown
              menu={{ items: itemsProfile }}
              trigger={["click"]}
              className="cursor-pointer"
            >
              <Avatar icon={<UserOutlined />} className="icon h-10 w-10" />
            </Dropdown>
            <div className="grid grid-cols-1">
              <h1 className="pl-3 lg:flex items-center">{name}</h1>
              <h1 className="pl-3 lg:flex items-center font-light text-sm italic">
                {users.role_name}
              </h1>
            </div>
            <ModalChangePassword
              open={modalChangePassword}
              onCancel={() => setModalChangePassword(!modalChangePassword)}
              onSubmit={handelSubmit}
              id={users?.user_entity_id}
            />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
