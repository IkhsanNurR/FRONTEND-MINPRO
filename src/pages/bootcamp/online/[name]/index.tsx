import { useRouter } from "next/router";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GroupsIcon from "@mui/icons-material/Groups";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Avatar, Divider, List, ListItem, Rating } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";
import gambar1 from "../../../../../public/g1.jpeg";
import gambar2 from "../../../../../public/g2.jpeg";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import React, { useEffect } from "react";
// import ReactPlayer from "react-player/youtube";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Image from "next/image";
import { MyPage } from "@/components/types";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import decodeTokenName from "@/helper/decodedTokenName";
import { CookieValueTypes, getCookie } from "cookies-next";
import { GetByNameOrEmail } from "@/redux/usersSchema/profile/action/actionReducer";
import * as jwt from "jsonwebtoken";
import { Progress, notification } from "antd";

const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }: any) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }: any) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }: any) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const DetailCurriculum: MyPage = (props: any) => {
  //check komplit ga profilenya
  const [name, setName] = useState<string | null>(null);
  const [haveToken, setHaveToken] = useState<CookieValueTypes>("");
  let { users, msg, status, refresh }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );
  function calculateDataCompleteness(user: Users): number {
    const requiredAttributes: (keyof Users)[] = [
      "user_first_name",
      "user_last_name",
      "user_birth_date",
      "user_photo",
      "phone",
      "education",
      "resume",
    ];
    const totalAttributes = requiredAttributes.length;
    let completedAttributes = 0;

    requiredAttributes.forEach((attribute) => {
      if (user?.hasOwnProperty(attribute) && user[attribute]) {
        completedAttributes++;
      }
    });

    const completenessPercentage =
      (completedAttributes / totalAttributes) * 100;
    return Number(completenessPercentage.toFixed());
  }
  const token = getCookie("token");
  const dispatch = useDispatch();
  useEffect(() => {
    const decode = decodeTokenName(token);
    setName(decode);

    if (name) dispatch(GetByNameOrEmail(name));
    setHaveToken(token);
  }, [token, refresh]);
  const completeness = calculateDataCompleteness(users);
  type NotificationType = "success" | "info" | "warning" | "error";
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    msg: string,
    completeness?: number
  ) => {
    let message = "";
    let description = null;

    switch (type) {
      case "success":
        message = "Success Notification";
        description = "This is a success notification.";
        break;
      case "info":
        message = "Info Notification";
        description = "This is an info notification.";
        break;
      case "warning":
        message = msg;
        break;
      case "error":
        message = msg;
        break;
      default:
        return null;
    }

    api[type]({
      message,
      description: (
        <>
          {description}
          {completeness !== undefined && (
            <Progress type="circle" percent={completeness} size={40} />
          )}
        </>
      ),
      duration: 2,
    });
  };

  //==================================

  const [expanded, setExpanded] = useState<string[]>([]);
  const [value, setValue] = useState<number | null>(2);

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded((prevExpanded) =>
        isExpanded
          ? [...prevExpanded, panel]
          : prevExpanded.filter((item) => item !== panel)
      );
    };

  const handleApply = () => {
    if (!haveToken) {
      openNotificationWithIcon("error", "Silahkan Login");
      setTimeout(() => {
        router.push({
          pathname: "/signin",
        });
      }, 2000);
    } else if (haveToken && completeness !== 100) {
      openNotificationWithIcon(
        "warning",
        "Silahkan Lengkapi Data Diri Anda",
        completeness
      );
    } else {
      router.push("/bootcamp/apply");
    }
  };

  const router = useRouter();
  const route = router.query.name;

  return (
    <div className="flex flex-col">
      <div className="mt-4 bg-gray-50 shadow-md rounded-md w-full  p-4 text-center">
        <label htmlFor="search" className="mr-2">
          Search
        </label>
        <input type="search" className="p-1 border-2 rounded-xl" />
        <button className="order-0  ml-2 inline-flex items-center px-4 py-2 border border-transparent rounded-xl bg-blue-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:order-1">
          Search
        </button>
      </div>
      {/* <div className="mt-5 ml-10 flex" id="kiri"> */}

      {/* <div className="mt-5 lg:w-8/12"> */}

      <div className="mt-5 lg:flex">
        <div className="mt-5 lg:w-8/12" id="bawah">
          <div className="text-3xl mb-2">
            <h1 className="capitalize">{route}</h1>
          </div>
          <div className="">
            {contextHolder}
            <h1 className="text-base w-11/12 text-justify">
              Node.js adalah platform yang kuat untuk membangun dan mendeploy
              aplikasi web fullstack. Dengan Node.js, Anda dapat menggabungkan
              berbagai teknologi seperti React, Redux, Express/Nest, serta
              database seperti PostgreSQL atau MongoDB untuk membuat aplikasi
              web yang lengkap dan berkualitas.
            </h1>
            <div className="mt-5">
              <GroupsIcon className="text-3xl mr-1" />
              192 Talents
              <FormatListNumberedIcon className="text-3xl ml-4 mr-1" />
              15 Batchs
              <AccessTimeIcon className="text-3xl ml-4 mr-1" />3 Months
              <CalendarMonthIcon className="text-3xl ml-4 mr-1" />
              Current Batch until 12 November
              <Divider className="text-lg bg-black mt-3" />
            </div>
            <div className="bg-white shadow-md rounded-md w-11/12 p-4 mt-4">
              <h1>What Will You learn ?</h1>
              <ul className="mt-4 flex">
                <div className="mr-5">
                  <li
                    className="mb-2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <CheckIcon
                      className="mr-2"
                      style={{ verticalAlign: "middle" }}
                    />
                    <span style={{ textAlign: "left" }}>
                      Create boilerplate starter projects with React, Redux,
                      Express/Nest, and Mongo/Postgresql
                    </span>
                  </li>
                  <li
                    className="mb-2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <CheckIcon
                      className="mr-2"
                      style={{ verticalAlign: "middle" }}
                    />
                    <span style={{ textAlign: "left" }}>
                      Master deployment techniques between the production and
                      development environments
                    </span>
                  </li>
                  <li
                    className="mb-2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <CheckIcon
                      className="mr-2"
                      style={{ verticalAlign: "middle" }}
                    />
                    <span style={{ textAlign: "left" }}>
                      Learn to effectively create and send emails from a backend
                      server
                    </span>
                  </li>
                  <li
                    className="mb-2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <CheckIcon
                      className="mr-2"
                      style={{ verticalAlign: "middle" }}
                    />
                    <span style={{ textAlign: "left" }}>
                      Make an app with Google OAuth authentication
                    </span>
                  </li>
                  <li
                    className="mb-2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <CheckIcon
                      className="mr-2"
                      style={{ verticalAlign: "middle" }}
                    />
                    <span style={{ textAlign: "left" }}>
                      Accept and process credit card payments from users
                    </span>
                  </li>
                </div>
                <div>
                  <li
                    className="mb-2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <CheckIcon
                      className="mr-2"
                      style={{ verticalAlign: "middle" }}
                    />
                    <span style={{ textAlign: "left" }}>
                      Understand common web technologies and design patterns to
                      connect them together
                    </span>
                  </li>
                  <li
                    className="mb-2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <CheckIcon
                      className="mr-2"
                      style={{ verticalAlign: "middle" }}
                    />
                    <span style={{ textAlign: "left" }}>
                      Gain proficiency in common web technologies and design
                      patterns to seamlessly connect them in fullstack web
                      development.
                    </span>
                  </li>
                </div>
              </ul>
            </div>
            <div className="shadow-md rounded-md bg-white w-11/12 p-4 mt-4">
              <Accordion
                expanded={expanded.includes("panel1")}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography>Week 01</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    <ListItem>Introduction Postgresql/MongoDB</ListItem>
                    <ListItem>Simple Query</ListItem>
                    <ListItem>Advanced Query and Procedure</ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded.includes("panel2")}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography>Week 02</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    <ListItem>Introduction NodeJs</ListItem>
                    <ListItem>Simple Code NodeJs</ListItem>
                    <ListItem>Introduction ExpressJs</ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded.includes("panel3")}
                onChange={handleChange("panel3")}
              >
                <AccordionSummary
                  aria-controls="panel3d-content"
                  id="panel3d-header"
                >
                  <Typography>Week 03</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    <ListItem>Build backend with ExpressJs</ListItem>
                    <ListItem>Build backend with NestJs</ListItem>
                    <ListItem>
                      Build frontend with NextJs and connecting to backend
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className=" w-11/12 mt-4 ml-4">
              <Typography className="text-lg font-semibold" variant="h6">
                Description
              </Typography>
              <Typography className="text-sm text-justify w-11/12">
                In this comprehensive program, you will dive deep into the world
                of Node.js, a powerful JavaScript runtime that enables
                server-side development. You will learn how to build scalable
                and efficient backend systems using frameworks like Express or
                NestJS, handle databases with MongoDB or PostgreSQL, and create
                RESTful APIs to facilitate seamless communication between
                frontend and backend. But that's not all! The bootcamp also
                focuses on the frontend aspect of fullstack development. You
                will harness the power of React, a popular JavaScript library,
                to build dynamic and interactive user interfaces. Through
                hands-on projects and real-world examples, you will gain
                expertise in state management with Redux, component-based
                architecture, and modern frontend development practices.
              </Typography>
            </div>
          </div>
          <div className=" w-11/12 mt-4 shadow-md rounded-md bg-white p-4">
            <h1 className="text-lg font-semibold ml-2">Description</h1>
            <div>
              <Image
                src={gambar1}
                className="w-28 h-28  float-left mr-4"
                alt={"logo"}
              />
              <div className="ml-4">
                <h1 className="text-base underline">Description</h1>
                <div className="">
                  With a strong background in the industry, our trainer has
                  successfully developed and deployed numerous fullstack web
                  applications. Their hands-on experience allows them to share
                  real-world insights and best practices, giving you a deep
                  understanding of the concepts and techniques required to excel
                  in this field.
                </div>
              </div>
            </div>
          </div>
          <div className=" w-11/12 mt-4 shadow-md rounded-md bg-white p-4">
            <h1 className="text-base font-semibold">Reviews</h1>
            <div>
              <div className="flex">
                <Avatar sx={{ width: 56, height: 56 }}>
                  <Image src={gambar2} className="w-full h-full" alt={"logo"} />
                </Avatar>
                <div className="w-full justify-between flex items-center">
                  <div className="ml-4">
                    I had the incredible opportunity to join the Node.js
                    Bootcamp, and I can confidently say that it was a
                    transformative experience in my journey as a fullstack web
                    developer. The bootcamp provided me with the knowledge,
                    skills, and support necessary to excel in the world of
                    Node.js and fullstack web development.
                  </div>
                  <div className="">
                    <Rating name="read-only" value={5} readOnly />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white h-full pl-6 pr-6 mt-5 lg:mt-0 lg:w-4/12 shadow-2xl rounded-xl">
          <div className="bg-white h-52 w-full mb-10 mt-5" id="video">
            <>
              <ReactPlayer
                url="https://www.youtube.com/watch?v=sSLJx5t4OJ4"
                height={220}
                width="100%"
                controls
              />
            </>
          </div>
          <div className="mt-4">
            <CalendarMonthIcon />
            <span className="ml-4">Next Batch, April 2012</span>
          </div>
          <div className="mt-2">
            <LocationOnIcon />
            <span className="ml-4">Sentul, Bogor, Jawa Barat</span>
          </div>
          <div className="mt-2">
            <WhatsAppIcon />
            <span className="ml-4">0888127162698</span>
          </div>
          <div className="">
            <button
              type="button"
              onClick={handleApply}
              className="mt-7  w-full h-12 order-0 inline-flex text-center items-center justify-center border border-transparent rounded-md bg-blue-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:order-1"
            >
              Apply Reguler Bootcamp
            </button>
          </div>
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="mt-5 "
          >
            <Divider
              style={{ flexGrow: 1, color: "black" }}
              className="bg-black"
            />
            <Typography
              variant="body1"
              style={{ margin: "0 16px", fontWeight: "bold", color: "black" }}
            >
              or
            </Typography>
            <Divider style={{ flexGrow: 1 }} className="bg-black" />
          </div>
          <div className="">
            <button
              type="button"
              onClick={handleApply}
              className="mt-4  w-full h-12 order-0 inline-flex text-center items-center justify-center border border-transparent rounded-md bg-blue-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:order-1"
            >
              Buy This Course
            </button>
          </div>
          <div className="mt-4 font-semibold">
            <h1>Persyaratan :</h1>
            <div className="w-full bg-white p-2" id="video">
              <li>Max. umur 26 tahun</li>
              <li>Lulusan min. (D3) Teknik Informatika</li>
              <li>Minat dalam dunia Programming</li>
              <li>Menyukai Explore Technology terbaru</li>
              <li>Memiliki karakter proactive & self learning</li>
            </div>
          </div>
          <div className="mt-4 font-semibold">
            <h1>Benefit :</h1>
            <div className="w-full mb-5 bg-white p-2" id="video">
              <li>Lulusan siap kerja</li>
              <li>Pelatihan soft skill</li>
              <li>Biaya hidup ditanggungi</li>
              <li>Projek portofolio</li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DetailCurriculum.Layout = "User";
export default DetailCurriculum;
