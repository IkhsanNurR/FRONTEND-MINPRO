import { MyPage } from "@/components/types";
import Image from "next/image";
import confirmSvg from "../../../../public/confirm.svg";

const ConfirmApplyBootcamp: MyPage = () => {
  return (
    <>
      {/* <div className="text-center flex flex-col justify-center items-center h-screen -mt-10 sm:w-full">
        <h1 className="text-2xl">Confirmation</h1>
        <Image alt="Confirm Svg" src={confirmSvg} className="mx-auto" />
        <div className="w-96 mt-8 mx-auto ">
          <p className="text-center text-sm">
            Terimakasih sudah apply untuk mengikuti bootcamp reguler bersama
            CodexAcademy, silahkan check email untuk step berikutnya. Click{" "}
            <a href="/" className="text-blue-500 underline">
              Home
            </a>{" "}
            untuk kembali.
          </p>
        </div>
      </div> */}

      {/* <div className="text-center flex flex-col justify-center items-center">
    <h1 className="text-2xl">Confirmation</h1>
    <Image 
      alt="Confirm Svg"
      src={confirmSvg}
      className="mx-auto"
    />
    <div className="w-96 mt-8">
      <p className="text-center ">
        Terimakasih sudah apply untuk mengikuti bootcamp reguler bersama
        CodexAcademy, silahkan check email untuk step berikutnya. Click{" "}
        <a href="/" className="text-blue-500 underline">Home</a> untuk kembali.
      </p>
    </div>
  </div> */}
      <div className="flex flex-col justify-center items-center h-screen ">
        <h1 className="text-2xl">Confirmation</h1>
        <Image alt="Confirm Svg" src={confirmSvg} className="mx-auto" />
        <div className="sm:w-full mt-8 md:text-center md:w-96">
          <p className="text-center">
            Terimakasih sudah apply untuk mengikuti bootcamp reguler bersama
            CodexAcademy, silahkan check email untuk step berikutnya. Click{" "}
            <a href="/bootcamp" className="text-blue-500 underline">
              Home
            </a>{" "}
            untuk kembali.
          </p>
        </div>
      </div>
    </>
  );
};

ConfirmApplyBootcamp.Layout = "User";
export default ConfirmApplyBootcamp;
