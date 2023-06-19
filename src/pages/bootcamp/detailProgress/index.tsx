import { MyPage } from "@/components/types";
import logo from "../../../../public/Bimoli.jpg";
import Image from "next/image";
import { Fullscreen } from "@mui/icons-material";

const DetailProgress: MyPage = () => {
  return (
    <div className="mt-32 flex">
      <div className="bg-green-300 w-1/3 mr-5 p-3 rounded-2xl">
        <div>
          <Image src={logo} alt="logo" className="w-full h-56 rounded-2xl" />
        </div>
        <div className="mt-2">
          <h1 className="font-semibold"> .Net Core Bootcamp</h1>
        </div>
        <div className="mt-1 text-sm">
            <h3>Applied Date : 5 juni 2022</h3>
            <h3>Status : Passed</h3>
            <h3>Last Progress : Waiting List</h3>
        </div>
      </div>
      <div className="bg-green-300 w-1/3 mr-5 p-3 rounded-2xl">
        <div>
          <Image src={logo} alt="logo" className="w-full h-56 rounded-2xl" />
        </div>
        <div className="mt-2">
          <h1 className="font-semibold"> .Net Core Bootcamp</h1>
        </div>
        <div className="mt-1 text-sm">
            <h3>Applied Date : 5 juni 2022</h3>
            <h3>Status : Passed</h3>
            <h3>Last Progress : Waiting List</h3>
        </div>
      </div>
    </div>
  );
};

DetailProgress.Layout = "Admin";
export default DetailProgress;
