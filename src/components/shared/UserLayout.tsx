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
import { useRouter } from "next/router";

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
        <Button type="link" onClick={handleLogout}>
          <PoweroffOutlined className="" />
          <span>Sign Out</span>
        </Button>
      ),
      key: "3",
    },
  ];

  // const handleClick = () => {
  //   const pathname = router.pathname.substring(1);
  //   router.push({
  //     pathname: "/external/signup",
  //     query: { url: pathname },
  //   });
  // };

  return (
    <>
      <div className="flex justify-between bg-slate-100 max-h-12">
        <div className="float-left">
          <div className="flex">
            <Link href="/profesional"> Job Apply</Link>
          </div>
        </div>
        <div className="float-right p-2">
          {haveToken ? (
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              className="cursor-pointer"
            >
              <Avatar icon={<UserOutlined />} className="icon" />
            </Dropdown>
          ) : (
            <>
              <Button>
                <Link href="/signin">Sign in</Link>
              </Button>
              <Button
                onClick={() =>
                  router.push({
                    pathname: "external/signup",
                    query: router.pathname,
                  })
                }
              >
                <span>Sign Up</span>
              </Button>
            </>
          )}
        </div>
      </div>
      <main className="p-10">{children}</main>
    </>
  );
};

export default UserLayout;
