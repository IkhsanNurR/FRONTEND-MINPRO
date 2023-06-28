import { MyPage } from "@/components/types";
import logo from "../../../../public/node.png";
import Image from "next/image";
import { Fullscreen } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { reqGetUserApplyProgress } from "@/redux/bootcampSchema/action/actionReducer";
import { CookieValueTypes, getCookie } from "cookies-next";
import decodeTokenName from "@/helper/decodedTokenName";
import { GetByNameOrEmail } from "@/redux/usersSchema/profile/action/actionReducer";
import { format } from "date-fns";
import { Typography } from "@mui/material";
import Content from "@/components/shared/content";

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
      dispatch(reqGetUserApplyProgress(19));
    }
  }, [users]);
  console.log("ea", bootcamp);
  if (users) {
    return (
      <>
        <Content title="Apply Progress" />
        {/* <Typography className="text-4xl font-sans mt-10 uppercase">
          Apply Progress
        </Typography> */}
        <div className="mt-10  flex">
          {(bootcamp || []).map((data: any, index: any) => (
            <div className="bg-white w-1/3 mr-5 p-3 rounded-2xl shadow-xl">
              <div key={data.prap_user_entity_id}>
                <Image
                  src={logo}
                  alt="logo"
                  className="w-full h-56 rounded-2xl"
                />
              </div>
              <div className="mt-2">
                <Typography className="font-semibold" variant="h6">
                  {data.prog_title}
                </Typography>
              </div>
              <div className="mt-1 text-sm">
                <Typography>
                  Applied Date :{" "}
                  {format(new Date(data.parog_action_date), "dd-MMMM-yyyy")}
                </Typography>
                <Typography>Status : {data.prap_status}</Typography>
                <Typography>
                  Last Progress : {data.parog_progress_name}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    return <div>Tidak ada data</div>;
  }
};

BootcampDashboard.Layout = "User";
export default BootcampDashboard;
