import { MyPage } from "../components/types";

const Custom404: MyPage = () => {
  return (
    <div className="flex justify-center items-center p-56">
      <h1>Halaman Yang Anda Cari Tidak Ditemukan</h1>
    </div>
  );
};

Custom404.Layout = "User";
export default Custom404;
