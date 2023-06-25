import { useRouter } from "next/router";
import Content3 from "../../../components/shared/content";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GroupsIcon from "@mui/icons-material/Groups";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Avatar, Divider, List, ListItem, Rating } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";
import gambar1 from "../../../../public/Bimoli.jpg";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import React from "react";
// import ReactPlayer from "react-player/youtube";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
// import styles from '@/gl';
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { SyntheticEvent, useState } from "react";
import Image from "next/image";
import { MyPage } from "@/components/types";
import dynamic from "next/dynamic";

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

  const router = useRouter();
  const a = router.query.name;
  console.log(router.query);
  return (
    <div className="flex flex-col">
      <div className="mt-4 bg-green-600 w-full  p-4 text-center">
        <label htmlFor="search" className="mr-2">
          Search
        </label>
        <input type="search" className="p-1 rounded-xl" />
        <button className="order-0  ml-2 inline-flex items-center px-4 py-2 border border-transparent rounded-xl bg-blue-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:order-1">
          Search
        </button>
      </div>
      {/* <div className="mt-5 ml-10 flex" id="kiri"> */}

      {/* <div className="mt-5 lg:w-8/12"> */}

      <div className="mt-5 lg:flex">
        <div className="mt-5 lg:w-8/12" id="bawah">
          <div className="text-3xl mb-2">
            <h1 className="capitalize">{a}</h1>
          </div>
          <div className="">
            <h1 className="text-base w-8/12 text-justify">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo
              obcaecati quasi aliquid suscipit ratione accusantium ipsam ad
              magnam non laudantium natus numquam, perspiciatis consequatur
              debitis dolorum quibusdam.
            </h1>
            <div className="mt-5">
              <GroupsIcon className="text-3xl mr-1" />
              192 Talents
              <FormatListNumberedIcon className="text-3xl ml-4 mr-1" />
              15 Batchs
              <AccessTimeIcon className="text-3xl ml-4 mr-1" />3 Months
              <CalendarMonthIcon className="text-3xl ml-4 mr-1" />
              Current Batch until 12 november
              <Divider className="text-lg bg-black mt-3" />
            </div>
            <div className="bg-blue-400 w-11/12 p-4 mt-4">
              <h1>What Will You learn ?</h1>
              <ul className="mt-4 flex">
                <div className="mr-5">
                  <li className="mb-2">
                    <CheckIcon className="mr-2" /> aji
                  </li>
                  <li className="mb-2">
                    <CheckIcon className="mr-2" /> ojan
                  </li>
                  <li className="mb-2">
                    <CheckIcon className="mr-2" /> oji
                  </li>
                  <li className="mb-2">
                    <CheckIcon className="mr-2" /> jajang
                  </li>
                  <li className="mb-2">
                    <CheckIcon className="mr-2" /> oji
                  </li>
                </div>
                <div>
                  <li className="mb-2">
                    <CheckIcon className="mr-2" /> wawan
                  </li>
                  <li className="mb-2">
                    <CheckIcon className="mr-2" /> ojan
                  </li>
                  <li className="mb-2">
                    <CheckIcon className="mr-2" /> jajang
                  </li>
                  <li className="mb-2">
                    <CheckIcon className="mr-2" /> oji
                  </li>
                  <li className="mb-2">
                    <CheckIcon className="mr-2" /> ojan
                  </li>
                </div>
              </ul>
            </div>
            <div className="bg-blue-400 w-11/12 p-4 mt-4">
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
                    <ListItem>Item 1</ListItem>
                    <ListItem>Item 2</ListItem>
                    <ListItem>Item 3</ListItem>
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
                    <ListItem>Item 1</ListItem>
                    <ListItem>Item 2</ListItem>
                    <ListItem>Item 3</ListItem>
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
                    <ListItem>Item 1</ListItem>
                    <ListItem>Item 2</ListItem>
                    <ListItem>Item 3</ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className=" w-11/12 mt-4 ml-4">
              <h1 className="text-lg font-semibold">Description</h1>
              <h1 className="text-sm text-justify w-11/12">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                deserunt alias neque dolores nulla officiis incidunt, magnam
                ducimus laudantium soluta error recusandae ipsam, porro
                inventore possimus delectus animi, ut modi eum tempora.
                Accusantium id architecto quia itaque fugit consectetur
                reprehenderit distinctio expedita! Sapiente asperiores sequi
                sint velit labore natus minus recusandae nobis temporibus
                consectetur? Eaque officiis ipsam expedita quo? Odio obcaecati
                maxime mollitia quia, libero culpa, harum delectus soluta earum,
                est cumque rerum nihil omnis. Tenetur impedit natus nostrum
                corporis. Aliquam tempore ad possimus! Eligendi, suscipit.
                Consequuntur porro, optio officiis, quibusdam alias et deleniti
                aliquam, ex pariatur architecto corporis praesentium.
              </h1>
            </div>
          </div>
          <div className=" w-11/12 mt-4 bg-blue-300 p-4">
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
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Architecto labore perferendis ut mollitia consectetur
                  reiciendis corrupti! Perferendis iusto dicta voluptas modi
                  obcaecati totam maxime dolore repellendus quibusdam provident
                  eaque asperiores laboriosam mollitia, eos quia velit veritatis
                  recusandae, necessitatibus molestias exercitationem laudantium
                  expedita nulla? Eaque nam at autem tempora iste dolore?
                </div>
              </div>
            </div>
          </div>
          <div className=" w-11/12 mt-4 bg-blue-300 p-4">
            <h1 className="text-base font-semibold">Reviews</h1>
            <div>
              <div className="flex">
                <Avatar sx={{ width: 56, height: 56 }}>
                  <Image src={gambar1} className="w-full h-full" alt={"logo"} />
                </Avatar>
                <div className="w-full justify-between flex items-center">
                  <div className="ml-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Facilis aperiam adipisci laudantium expedita eius,
                    voluptatem nam perspiciatis, tenetur nihil quasi ratione,
                    incidunt unde minima. Rem modi aut dolor debitis sapiente,
                    qui dicta culpa animi asperiores reprehenderit fugiat sed
                    dolores, architecto quam, error at hic iste adipisci
                    inventore mollitia repellat! Sapiente.
                  </div>
                  <div className="">
                    <Rating name="read-only" value={value} readOnly />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 h-full pl-6 pr-6 mt-5 lg:mt-0 lg:w-4/12 ">
          <div className="bg-white h-52 w-full mb-10 mt-5" id="video">
            <>
              <ReactPlayer
                url="https://www.youtube.com/watch?v=haI_6ypWWI0"
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
              className="mt-4  w-full h-12 order-0 inline-flex text-center items-center justify-center border border-transparent rounded-md bg-blue-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:order-1"
            >
              Buy This Course
            </button>
          </div>
          <div className="mt-4 font-semibold">
            <h1>Persyaratan :</h1>
            <div className="w-full bg-white p-2" id="video">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure,
              praesentium minus aspernatur ipsam, magnam saepe veritatis autem
              possimus quia id nam, architecto repudiandae incidunt porro harum
            </div>
          </div>
          <div className="mt-4 font-semibold">
            <h1>Benifit :</h1>
            <div className="w-full mb-5 bg-white p-2" id="video">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure,
              praesentium minus aspernatur ipsam, magnam saepe veritatis autem
              possimus quia id nam, architecto repudiandae incidunt porro harum
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DetailCurriculum.Layout = "Guest";
export default DetailCurriculum;
