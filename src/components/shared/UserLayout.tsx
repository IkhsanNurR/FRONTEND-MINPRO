import { Avatar, Button, Dropdown, Menu, MenuProps } from "antd";
import Link from "next/link";
import React, { PropsWithChildren, useState, useEffect } from "react";
import { CookieValueTypes, getCookie, deleteCookie } from "cookies-next";
import {
  LockOutlined,
  PoweroffOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const UserLayout = ({ children }: PropsWithChildren) => {
  const [haveToken, setHaveToken] = useState<CookieValueTypes>("");
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token");
    setHaveToken(token);
  }, []);

  const handleLogout = () => {
    deleteCookie("token");
    setHaveToken("");
    router.push("/");
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <Link className="" href="/users/profile">
          <SolutionOutlined className="" />
          <span className="pl-1">Profile</span>
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <div className="flex">
          <LockOutlined className="pt-1" />
          <span className="pl-2">Change Password</span>
        </div>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <div className="flex">
          <PoweroffOutlined className="pt-1" />
          <button onClick={handleLogout} className="pl-2">
            Sign Out
          </button>
        </div>
      ),
      key: "3",
    },
  ];

  return (
    <>
      <div className="flex justify-between">
        <div className="float-left">
          <h1>TOpbar</h1>
        </div>
        <div className="float-right">
          {haveToken ? (
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Avatar icon={<UserOutlined />} className="icon" />
            </Dropdown>
          ) : (
            <Button>
              <Link href="/signin">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
      <main>{children}</main>
    </>
  );
};

export default UserLayout;
