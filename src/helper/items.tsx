import { ArrowRight } from "@mui/icons-material";
import { Button, Paper } from "@mui/material";
import Image from "next/image";

// function Item(props:any)
export const Item = ({ data }: any) => {
  return (
    <div className="bg-gray-50 shadow-lg rounded-lg  mt-4 w-full p-4 flex flex-wrap">
      <div className="  mb-2 md:w-2/4 w-7/12 ">
        <h1 className="font-semibold text-3xl ">{data.judul}</h1>
        <p className="mt-2">{data.isi}</p>
      </div>

      <div className="bg-white ml-auto pt-4">
        {/* <img src="./logo3.png" alt="logo" className="h-full w-auto" /> */}
        <Image src={data.gambar} alt={data.judul} className="w-10 h-60" />
      </div>
    </div>
  );
};

export const TestimoniItem = ({ testimoni }: any) => {
  // console.log('object', testimoni)
  return (
    <div className="flex flex-wrap justify-center mb-10 shadow-xl gap-5">
      <div className="w-8/12 mx-4 bg-white rounded-lg p-4 ">
        {/* <img src="./Bimoli.jpg" className=" max-h-48 w-full " alt="" /> */}
        <Image
          src={testimoni.gambar}
          alt={testimoni.nama}
          className=" max-h-48 w-full"
        />
        <div className="mt-2">
          <h1 className="text-center mb-4">{testimoni.nama}</h1>
          <div className="h-52 overflow-y-auto">
            <h3>{testimoni.review}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
