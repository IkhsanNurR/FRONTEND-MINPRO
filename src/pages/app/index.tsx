import React, { useEffect, useState } from "react";
import Content2 from "../../components/shared/content2";
import { MyPage } from "@/components/types";
import { useDispatch, useSelector } from "react-redux";
import { GetByNameOrEmail } from "@/redux/usersSchema/profile/action/actionReducer";
import { getCookie } from "cookies-next";
import decodeTokenName from "@/helper/decodedTokenName";
import Content from "@/components/shared/content";

const Index: MyPage = () => {
  let { refresh } = useSelector((state: any) => state.userProfileReducers);

  const dispatch = useDispatch();
  const [name, setName] = useState<string | null>(null);
  const token = getCookie("token");

  useEffect(() => {
    const decode = decodeTokenName(token);
    setName(decode);
    if (name) {
      dispatch(GetByNameOrEmail(name));
    }
  }, [token, name, refresh]);

  return (
    <>
      <Content title="Dashboard">
        <div className="mt-16 -ml-6 ">
          <h1>Welcome back {name}</h1>
        </div>
      </Content>
    </>
  );
};

Index.Layout = "Admin";
export default Index;
