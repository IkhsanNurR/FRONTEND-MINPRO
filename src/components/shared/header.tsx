import {
  DownOutlined,
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
import { CookieValueTypes, deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetByNameOrEmail,
  changePassword,
} from "@/redux/usersSchema/profile/action/actionReducer";
import showNotification from "@/helper/notification";
import decodeTokenName from "@/helper/decodedTokenName";
import Image from "next/image";
import decodeTokenRole from "@/helper/decodeTokenRole";

export const ModalChangePassword: React.FC<ModalAdd> = ({
  open,
  onCancel,
  onSubmit,
  id,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  const handleOk = async (values: any) => {
    try {
      await form.validateFields();
      dispatch({ type: "RESET_STATE" });
      dispatch(changePassword({ payload: values, id }));
      onSubmit();
      form.resetFields();
    } catch (error: any) {}
  };

  return (
    <Modal
      title="Change Password"
      open={open}
      onCancel={handleCancel}
      footer={
        <div>
          <Button onClick={handleCancel}>Batal</Button>
          <Button
            onClick={() => form.submit()}
            className="ant-btn ant-btn-primary"
            style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
          >
            Simpan
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={handleOk}
      >
        <Form.Item
          label="Current Password"
          name="user_password"
          rules={[
            {
              required: true,
              message: "Please input current password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Please input new password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Re-type Password"
          name="retypePassword"
          rules={[
            {
              required: true,
              message: "Please input new re-type password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const about: MenuProps["items"] = [
  {
    key: "1",
    type: "group",
    label: "About",
    children: [
      {
        type: "divider",
        className: "thick-divider",
      },
      {
        key: "1",
        // label: "Alumni Testimoni", //Program>SubMenu
        label: <a href="about/alumni testimoni">Alumni Testimoni</a>,
      },
      {
        key: "2",
        label: <a href="about">About Us</a>,
      },
    ],
  },
];

const hiring: MenuProps["items"] = [
  {
    key: "1",
    type: "group",
    label: "Hiring",
    children: [
      {
        type: "divider",
        className: "thick-divider",
      },
      {
        key: "1",
        label: <a href="/our graduates">Our Graduates</a>,
      },
      {
        type: "divider",
        className: "thick-divider",
      },
      {
        key: "2",
        label: <a href="/jobs">Professional Hiring</a>, //Program>SubMenu
      },
    ],
  },
];

const online_course: MenuProps["items"] = [
  {
    key: "1",
    type: "group",
    label: "Online Course",
    children: [
      {
        type: "divider",
        className: "thick-divider",
      },
      {
        key: "1",
        label: <a href="/bootcamp/online/programming">Programming</a>,
      },
      {
        key: "2",
        label: <a href="/bootcamp/online/development">Development</a>,
      },
      {
        key: "3",
        label: <a href="/bootcamp/online/programming">Mobile</a>,
      },
      {
        key: "4",
        label: (
          <a href={`/bootcamp/online/${encodeURIComponent("ui/ux design")}`}>
            UI/UX Design
          </a>
        ),
      },
      {
        type: "divider",
        className: "thick-divider",
      },
      {
        key: "5",
        label: <a href="/bootcamp/online/machine learning">Machine Learning</a>,
      },
      {
        key: "6",
        label: <a href="/bootcamp/online/data scientist">Data Scientist</a>,
      },
      {
        type: "divider",
        className: "thick-divider",
      },
      {
        key: "7",
        label: <a href="/bootcamp/online/Database">Database</a>,
      },
      {
        type: "divider",
        className: "thick-divider",
      },
      {
        key: "8",
        label: (
          <a href="/bootcamp/online/digital marketing">Digital Marketing</a>
        ),
      },
    ],
  },
];

const programs: MenuProps["items"] = [
  {
    key: "1",
    type: "group",
    label: "Programs",
    children: [
      {
        type: "divider",
        className: "thick-divider",
      },
      {
        key: "1",
        label: "Bootcamp Regular", //Program>SubMenu
        children: [
          {
            key: "1-1",
            label: <a href="/bootcamp/nodejs fullstack">NodeJs Fullstack</a>,
          },
          {
            key: "1-2",
            label: <a href="/bootcamp/java fullstack">Java Fullstack</a>,
          },
          {
            key: "1-3",
            label: <a href="/bootcamp/.net fullstack">.Net Fullstack</a>,
          },
          {
            key: "1-4",
            label: <a href="/bootcamp/golang fullstack">Golang Fullstack</a>,
          },
          {
            type: "divider",
            className: "thick-divider",
          },
          {
            key: "1-5",
            label: <a href="/bootcamp/android mobile">Android Mobile</a>,
          },
          {
            key: "1-6",
            label: <a href="/bootcamp/flutter">Flutter</a>,
          },
        ],
      },
      {
        key: "2",
        label: "Bootcamp Online", //Program>SubMenu
        children: [
          {
            key: "2-1",
            label: (
              <a href="/bootcamp/Nodejs Fullstack Online">NodeJs Fullstack</a>
            ),
          },
          {
            key: "2-2",
            label: (
              <a href="/bootcamp/golang fullstack online">Golang Fullstack</a>
            ),
          },
          {
            type: "divider",
            className: "thick-divider", // menggunakan tipe 'divider'
          },
          {
            key: "2-3",
            label: <a href="/bootcamp/android mobile online">Android Mobile</a>,
          },
          {
            key: "2-4",
            label: <a href="/bootcamp/flutter online">Flutter</a>,
          },
        ],
      },
      {
        key: "3",
        label: "Bootcamp Corporate", //Program>SubMenu
        children: [
          {
            key: "3-1",
            label: <a href="/bootcamp/.net technology">.Net Technology</a>,
          },
        ],
      },
    ],
  },
];

const Header: React.FC = () => {
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
            <Button
              className="flex text-blue-500 border-none"
              onClick={() => router.push("/bootcamp/dashboard")}
            >
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

  {
    /* Hamburger Button */
  }
  const [isActive, setIsActive] = useState(false);

  const handleHamOnClick = () => {
    setIsActive(!isActive);
    toggleBodyScroll();
  };

  {
    /* Navbar Fixed */
  }
  const [isFixed, setIsFixed] = useState(false);

  const toggleBodyScroll = () => {
    const body: any = document.querySelector("body");
    body.classList.toggle("scroll-lock");
  };

  useEffect(() => {
    const handleScroll = () => {
      const header: any = document.querySelector("header");
      const fixedNav = header.offsetTop;

      if (window.pageYOffset > fixedNav) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <header
        className={`bg-transparent absolute w-full top-0 left-0 flex items-center z-10 ${
          isFixed ? "navbar-fixed" : ""
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between relative">
            <div className="px-4">
              {/*LOGO*/}
              <a
                href="/"
                className="font-bold text-lg block text-blue-500 py-6"
              >
                CodeXAcademy
              </a>
            </div>
            <div className="flex items-center px-4">
              <button
                onClick={handleHamOnClick}
                id="hamburger"
                className={`z-50 block absolute right-4 lg:hidden ${
                  isActive ? "hamburger-active " : ""
                }`}
              >
                <span
                  className={`hamburger-line transition duration-300 ease-in-out origin-top-left ${
                    isActive ? "hamburger-line-white " : ""
                  }`}
                ></span>
                <span className="hamburger-line transition duration-300 ease-in-out"></span>
                <span
                  className={`hamburger-line transition duration-300 ease-in-out origin-bottom-left ${
                    isActive ? "hamburger-line-white " : ""
                  }`}
                ></span>
              </button>

              {isActive && (
                <div
                  className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 z-40 lg:bg-transparent"
                  onClick={handleHamOnClick}
                ></div>
              )}

              <div
                className={`z-40 fixed w-56 h-screen bg-blue-500 top-0 right-0 transform transition-transform duration-400 ease-in-out lg:block lg:static lg:bg-transparent lg:shadow-none lg:rounded-none lg:w-full lg:h-min ${
                  isActive
                    ? "translate-x-0"
                    : "lg:translate-x-0 translate-x-full"
                }`}
              >
                <ul className="block pt-20 lg:pt-0">
                  <div className="mx-2 divide-y-[1px] lg:divide-none lg:flex">
                    <div className="pb-2 lg:pb-0 lg:flex lg:order-last">
                      {haveToken ? (
                        <>
                          <Dropdown
                            menu={{ items: itemsProfile }}
                            trigger={["click"]}
                            className="cursor-pointer"
                          >
                            <Avatar
                              icon={<UserOutlined />}
                              className="icon h-10 w-10"
                            />
                          </Dropdown>
                          <label className="pl-3 lg:flex items-center text-white">
                            {name}
                          </label>
                          <ModalChangePassword
                            open={modalChangePassword}
                            onCancel={() =>
                              setModalChangePassword(!modalChangePassword)
                            }
                            onSubmit={handelSubmit}
                            id={users?.user_entity_id}
                          />
                        </>
                      ) : (
                        <div className="lg:flex ">
                          <button
                            className="text-nav2"
                            onClick={() => router.push("/signin")}
                          >
                            Sign in
                          </button>

                          <button
                            className="text-nav2"
                            onClick={() => router.push("/external/signup")}
                          >
                            Sign up
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="text-white lg:text-base pt-3 pl-8 lg:pl-0 lg:pr-10 lg:pt-0 text-lg lg:flex lg:items-center lg:gap-12 font-semibold lg:text-black">
                      {roleTalent || roleKandidat || roleStudent || !token ? (
                        <Dropdown
                          menu={{ items: programs }}
                          placement="bottomCenter"
                        >
                          <a onClick={(e) => e.preventDefault()}>
                            <Space className="gap-nav">
                              Programs
                              <DownOutlined />
                            </Space>
                          </a>
                        </Dropdown>
                      ) : null}

                      {roleTalent || roleKandidat || roleStudent || !token ? (
                        <Dropdown
                          menu={{ items: online_course }}
                          placement="bottomCenter"
                        >
                          <a onClick={(e) => e.preventDefault()}>
                            <Space className="gap-nav">
                              Online Course
                              <DownOutlined />
                            </Space>
                          </a>
                        </Dropdown>
                      ) : null}

                      {roleTalent || roleKandidat || roleStudent || !token ? (
                        <Dropdown
                          menu={{ items: hiring }}
                          placement="bottomCenter"
                        >
                          <a onClick={(e) => e.preventDefault()}>
                            <Space className="gap-nav">
                              Job Hiring
                              <DownOutlined />
                            </Space>
                          </a>
                        </Dropdown>
                      ) : null}

                      {roleTalent || roleKandidat || roleStudent || !token ? (
                        <Dropdown
                          menu={{ items: about }}
                          placement="bottomCenter"
                        >
                          <a onClick={(e) => e.preventDefault()}>
                            <Space className="gap-nav">
                              About
                              <DownOutlined />
                            </Space>
                          </a>
                        </Dropdown>
                      ) : null}
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>

    //   <div className="flex fixed w-screen justify-between bg-slate-100">

    //     <div className="float-left">
    //       <div className="flex p-3">
    //         <Image
    //           src="/logo3.png"
    //           alt="image logo"
    //           width={100}
    //           height={100}
    //           quality={100}
    //         />
    //       </div>
    //     </div>
    //     <div className="text-white lg:text-base pt-3 pl-8 lg:pl-0 lg:pt-0 text-lg lg:flex lg:items-center lg:gap-12 font-semibold lg:text-black">
    //       {roleTalent || roleKandidat || roleStudent || !token ? (
    //         <Dropdown menu={{ items: programs }} placement="bottomCenter">
    //           <a onClick={(e) => e.preventDefault()}>
    //             <Space className="gap-nav">
    //               Programs
    //               <DownOutlined />
    //             </Space>
    //           </a>
    //         </Dropdown>
    //       ) : null}

    //       {roleTalent || roleKandidat || roleStudent || !token ? (
    //         <Dropdown menu={{ items: online_course }} placement="bottomCenter">
    //           <a onClick={(e) => e.preventDefault()}>
    //             <Space className="gap-nav">
    //               Online Course
    //               <DownOutlined />
    //             </Space>
    //           </a>
    //         </Dropdown>
    //       ) : null}

    //       {roleTalent || roleKandidat || roleStudent || !token ? (
    //         <Dropdown menu={{ items: hiring }} placement="bottomCenter">
    //           <a onClick={(e) => e.preventDefault()}>
    //             <Space className="gap-nav">
    //               Job Hiring
    //               <DownOutlined />
    //             </Space>
    //           </a>
    //         </Dropdown>
    //       ) : null}

    //       {roleTalent || roleKandidat || roleStudent || !token ? (
    //         <Dropdown menu={{ items: about }} placement="bottomCenter">
    //           <a onClick={(e) => e.preventDefault()}>
    //             <Space className="gap-nav">
    //               About
    //               <DownOutlined />
    //             </Space>
    //           </a>
    //         </Dropdown>
    //       ) : null}
    //     </div>

    //     <div className="float-right p-2">
    //       {haveToken ? (
    //         <>
    //           <Dropdown
    //             menu={{ items: itemsProfile }}
    //             trigger={["click"]}
    //             className="cursor-pointer"
    //           >
    //             <Avatar icon={<UserOutlined />} className="icon" />
    //           </Dropdown>
    //           <ModalChangePassword
    //             open={modalChangePassword}
    //             onCancel={() => setModalChangePassword(!modalChangePassword)}
    //             onSubmit={handelSubmit}
    //             id={users?.user_entity_id}
    //           />
    //         </>
    //       ) : (
    //         <div className="flex">
    //           <Button type="link">
    //             <Link href="/signin">Sign in</Link>
    //           </Button>
    //           <Button type="link">
    //             <Link href="/external/signup">
    //               <span>Sign Up</span>
    //             </Link>
    //           </Button>
    //         </div>
    //       )}
    //     </div>
    //   </div>
  );
};

export default Header;
