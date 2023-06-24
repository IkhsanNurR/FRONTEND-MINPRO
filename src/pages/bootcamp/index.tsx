import {
  Box,
  Button,
  Menu,
  MenuItem,
  MenuProps,
  MobileStepper,
  Paper,
  Typography,
  alpha,
  styled,
  useTheme,
} from "@mui/material";
import { Fragment, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";
import { DataCarousel, Card } from "../../data";
import banner1 from "../../../public/Bimoli.jpg";
import banner2 from "../../../public/logo.png";
import banner3 from "../../../public/logo3.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

import {
  ArrowRight,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { Carousel } from "react-responsive-carousel";
import { MyPage } from "@/components/types";
import { ToastContainer } from "react-toastify";

const Bootcamp: MyPage = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = [banner1, banner2, banner3];

  return (
    <div className="mt-7">
      <ToastContainer />
      <div className="bg-blue-200 mt-4 w-full p-4 flex flex-wrap">
        <div className=" w-full mb-2 md:w-2/4">
          <h1 className="font-semibold text-3xl">Bootcamp Reguler</h1>
          <p className="mt-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga
            doloribus ullam ratione repellat iusto voluptatem animi consectetur
            architecto molestias impedit quisquam, praesentium odit corporis
            esse quibusdam at earum? Minima consequuntur architecto provident
            culpa repellat cum error totam mollitia perferendis eligendi sequi
            eveniet adipisci eum suscipit qui, natus exercitationem tenetur
            nostrum veritatis in. Ipsum animi, nobis incidunt quis tempore
            asperiores tempora voluptates consequuntur minima eius sit? Ducimus,
            placeat asperiores. Totam nisi, laboriosam est nihil molestias
            sapiente placeat quas maiores tenetur ducimus molestiae quisquam
            repellendus rem harum minima exercitationem doloribus? Nulla tempora
            facilis et expedita eligendi quaerat cupiditate? Sed ipsum labore
            ullam?
          </p>
        </div>
        <div className="bg-white min-h-40 max-h-80 ml-auto">
          <img src="./logo3.png" alt="logo" className="h-full w-auto" />
        </div>
      </div>
      <div className="mt-4 bg-green-600 w-full p-4 text-center">
        <label htmlFor="search" className="mr-2">
          Seacrh
        </label>
        <input type="search" className="p-1 rounded-xl w-28 md:w-32" />
        <button className="order-0  ml-2 inline-flex items-center px-4 py-2 border border-transparent rounded-xl bg-purple-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1">
          Search
        </button>
      </div>
      <div className="mt-4 bg-purple-300 p-4">
        <div className="flex flex-wrap justify-center">
          {Card.map((card: any) => (
            <div className="w-80 mx-4 bg-white rounded-lg p-4 my-4">
              <img src={card.gambar} className=" h-[200px] w-full " alt="" />
              <div className="mt-2">
                <h1 className="font-semibold">{card.judul}</h1>
                <h3>{card.tugas}</h3>
                <h3>{card.durasi}</h3>
                <h3>{card.Pembelian}</h3>
                <div className="text-end mt-2">
                  <button className="order-0 px-4 py-1 border border-transparent rounded-xl bg-orange-300 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-oranbg-orange-700 sm:order-1 hover:bg-orange-400">
                    Curriculum
                    <ArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16">
        {/* <Carousel
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}
            className="object-cover mt-5 bg-white max-h-90 -z-10"
            selectedItem={currentBanner}
            onChange={(index) => setCurrentBanner(index)}
          >
            {banners.map((banner, index) => (
              <div key={index}>
                <Image
                  src={banner}
                  alt={`Banner ${index}`}
                  className="h-52 w-52"
                />
              </div>
            ))}
          </Carousel> */}
      </div>

      <div className="mt-16">
        <h1>Testimoni</h1>
        <div className="bg-yellow-400 mt-1 p-4">
          <div className="flex flex-wrap justify-center">
            <div className="w-52 mx-4 bg-white rounded-lg p-4 ">
              <img src="./Bimoli.jpg" className=" max-h-48 w-full " alt="" />
              <div className="mt-2">
                <h1 className="text-center mb-4">Nama</h1>
                <div className="h-52 overflow-y-auto">
                  <h3>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Mollitia provident assumenda odit distinctio, repudiandae
                    suscipit, eos dicta officiis saepe dignissimos voluptates
                    quas voluptatibus, doloremque dolorem ullam necessitatibus
                    totam omnis maxime dolores magni. Aperiam, voluptates natus
                    qui laborum atque ut suscipit. Assumenda, facilis aperiam
                    amet vero voluptate pariatur ducimus esse consequuntur,
                    doloribus labore dolorum modi illum consequatur officia
                    dolores repellendus nam maxime repudiandae, corporis ullam
                    iste quae cumque laborum nesciunt? Itaque ipsam ut debitis,
                    maxime perferendis eos officia reiciendis delectus
                    reprehenderit! Modi molestias optio natus delectus animi
                    labore ullam fugit iure. Labore enim molestias quaerat
                    architecto magni vel esse rerum vero.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Bootcamp.Layout = "User";
export default Bootcamp;
