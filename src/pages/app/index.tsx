import React, { useEffect, useState } from "react";
import Content2 from "../../components/shared/content2";
import { MyPage } from "@/components/types";
import { useDispatch, useSelector } from "react-redux";
import { GetByNameOrEmail } from "@/redux/usersSchema/profile/action/actionReducer";
import { getCookie } from "cookies-next";
import * as jwt from "jsonwebtoken";

const Index: MyPage = () => {
  let { users, refresh } = useSelector(
    (state: any) => state.userProfileReducers
  );

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const token = getCookie("token");

  useEffect(() => {
    if (typeof token === "string") {
      const decodedToken = jwt.decode(token);
      if (typeof decodedToken === "object" && decodedToken?.aud) {
        const nameValue = decodedToken.aud as string;
        setName(nameValue);
      }
    }
    if (name) {
      dispatch(GetByNameOrEmail(name));
    }
  }, [token, name, refresh]);

  return (
    <>
      <Content2
        title="COBA"
        fungsi1={() => null}
        namafungsi1="TEST1"
        fungsi2={() => null}
        namafungsi2="TEST2"
      >
        <div className="mt-16 -ml-6 ">
          <h1>Welcome back {name}</h1>
        </div>
      </Content2>
    </>
  );
};

Index.Layout = "Admin";
export default Index;
