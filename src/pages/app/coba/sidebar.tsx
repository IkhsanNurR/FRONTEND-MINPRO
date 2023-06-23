import React, { useState } from "react";
import { Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import {
  InfoRounded,
  Laptop,
  LaptopMacRounded,
  Terminal,
  WorkRounded,
} from "@mui/icons-material";

const { SubMenu } = Menu;

const items = [
  // Daftar item menu

  {
    title: "Programs",
    key: "sub1",
    icon: <Terminal />,
    children: [
      {
        title: "Bootcamp Reguler",
        key: "1",
        children: [
          {
            title: "NodeJs Fullstack",
            key: "1-1",
            url: "",
          },
          {
            title: "Java Fullstack",
            key: "1-2",
          },
          {
            title: ".Net Fullstack",
            key: "1-3",
          },
          {
            title: "Golang Fullstack",
            key: "1-4",
          },
          {
            title: "Android Mobile",
            key: "1-5",
          },
          {
            title: "Flutter",
            key: "1-6",
          },
        ],
      },
      {
        title: "Bootcamp Online",
        key: "2",
        children: [
          {
            title: "NodeJs Fullstack",
            key: "2-1",
          },
          {
            title: "Golang Fullstack",
            key: "2-2",
          },
          {
            title: "Android Mobile",
            key: "2-3",
          },
          {
            title: "Flutter",
            key: "2-4",
          },
        ],
      },
      {
        title: "Bootcamp Corporate",
        key: "3",
        children: [
          {
            title: ".Net Fullstack",
            key: "3-1",
          },
        ],
      },
    ],
  },
  {
    title: "Online Course",
    key: "4",
    icon: <LaptopMacRounded />,
    childrennya: [
      {
        title: "Programming",
        key: "4-1",
      },
      {
        title: "Development",
        key: "4-2",
      },
      {
        title: "Mobile",
        key: "4-3",
      },
      {
        title: "UI/UX Design",
        key: "4-4",
      },
      {
        title: "Machine Learning",
        key: "4-5",
      },
      {
        title: "Data Scientist",
        key: "4-6",
      },
      {
        title: "Database",
        key: "4-7",
      },
      {
        title: "Digital Marketing",
        key: "4-8",
      },
    ],
  },
  {
    title: "Job Hiring",
    key: "5",
    icon: <WorkRounded />,
    childrennya: [
      {
        title: "Our Graduates",
        key: "5-1",
      },
      {
        title: "Profesional Hiring",
        key: "5-2",
      },
    ],
  },
  {
    title: "About",
    key: "6",
    icon: <InfoRounded />,
    childrennya: [
      {
        title: "Testimoni Alumni",
        key: "6-1",
      },
      {
        title: "About Us",
        key: "6-2",
      },
    ],
  },
];

const Sidebar = () => {
 const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    // <div>
    //   <div className="md:hidden">
    //     <button
    //       type="button"
    //       className="block text-gray-600 focus:outline-none focus:text-gray-800"
    //       onClick={toggleMenu}
    //     >
    //       <MenuOutlined className="h-6 w-6 fill-current" />
    //     </button>
    //   </div>

    //   {showMenu ? (
    //     <div className="md:hidden">
    //       <Menu mode="vertical" className="bg-red-400">
    //         {items.map((item) => (
    //           <SubMenu key={item.key} title={item.title} icon={item.icon}>
    //             {item.children?.map((child) => (
    //               <SubMenu key={child.key} title={child.title}>
    //                 {child.children?.map((subChild) => (
    //                   <Menu.Item key={subChild.key}>{subChild.title}</Menu.Item>
    //                 ))}
    //               </SubMenu>
    //             ))}
    //             {item.childrennya?.map((child) => (
    //               <Menu.Item key={child.key}>{child.title}</Menu.Item>
    //             ))}
    //           </SubMenu>
    //         ))}
    //       </Menu>
    //     </div>
    //   ) : (
    //     <div className="w-5/12 hidden md:block ml-4">
    //       <Menu mode="horizontal" className="bg-red-400">
    //         {items.map((item) => (
    //           <SubMenu key={item.key} title={item.title} icon={item.icon}>
    //             {item.children?.map((child) => (
    //               <SubMenu key={child.key} title={child.title}>
    //                 {child.children?.map((subChild) => (
    //                   <Menu.Item key={subChild.key}>{subChild.title}</Menu.Item>
    //                 ))}
    //               </SubMenu>
    //             ))}
    //             {item.childrennya?.map((child) => (
    //               <Menu.Item key={child.key}>{child.title}</Menu.Item>
    //             ))}
    //           </SubMenu>
    //         ))}
    //       </Menu>
    //     </div>
    //   )}
    // </div>

    <div className="md:hidden">
      <button
        type="button"
        className="block text-gray-600 z-50 ml-48 focus:outline-none relative focus:text-gray-800"
        onClick={toggleMenu}
      >
        <MenuOutlined className="h-6 w-6 fill-current" />
      </button>
      {showMenu && (
        <div className="bg-red-400 w-5/12 fixed h-screen z-20 top-0 left-0 overflow-y-auto">
          <Menu mode="vertical">
            {items.map((item) => (
              <SubMenu key={item.key} title={item.title} icon={item.icon}>
                {item.children?.map((child) => (
                  <SubMenu key={child.key} title={child.title}>
                    {child.children?.map((subChild) => (
                      <Menu.Item key={subChild.key}>{subChild.title}</Menu.Item>
                    ))}
                  </SubMenu>
                ))}
                {item.childrennya?.map((child) => (
                  <Menu.Item key={child.key}>{child.title}</Menu.Item>
                ))}
              </SubMenu>
            ))}
          </Menu>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
