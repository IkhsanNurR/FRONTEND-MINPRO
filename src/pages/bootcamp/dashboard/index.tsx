import { MyPage } from "@/components/types";
import logo from "../../../../public/Bimoli.jpg";
import Image from "next/image";
import { Fullscreen } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { reqGetUserApplyProgress } from "@/redux/bootcampSchema/action/actionReducer";
import { CookieValueTypes, getCookie } from "cookies-next";
import decodeTokenName from "@/helper/decodedTokenName";
import { GetByNameOrEmail } from "@/redux/usersSchema/profile/action/actionReducer";

const BootcampDashboard: MyPage = () => {
  let { bootcamp, message, refresh, status } = useSelector(
    (state: any) => state.bootcampReducer
  );
  const [name, setName] = useState<string | null>(null);
  const [haveToken, setHaveToken] = useState<CookieValueTypes>("");
  let { users, msg }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );
  const token = getCookie("token");
  useEffect(() => {
    const decode = decodeTokenName(token);
    setName(decode);

    if (name) dispatch(GetByNameOrEmail(name));
    setHaveToken(token);
  }, [token, refresh]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("users", users);
    if (users) {
      dispatch(reqGetUserApplyProgress(35));
    }
  }, [users]);
  console.log("ea", bootcamp);
  if (users) {
    return (
      <div className="mt-32 flex">
        {(bootcamp || []).map((data: any, index: any) => (
          <div className="bg-green-300 w-1/3 mr-5 p-3 rounded-2xl">
            <div key={data.prap_user_entity_id}>
              <Image
                src={logo}
                alt="logo"
                className="w-full h-56 rounded-2xl"
              />
            </div>
            <div className="mt-2">
              <h1 className="font-semibold">{data.prog_title}</h1>
            </div>
            <div className="mt-1 text-sm">
              <h3>Applied Date : {data.parog_action_date}</h3>
              <h3>Status : {data.prap_status}</h3>
              <h3>Last Progress : {data.parog_progress_name}</h3>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return <div>Tidak ada data</div>;
  }
};

BootcampDashboard.Layout = "User";
export default BootcampDashboard;
