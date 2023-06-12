import { MyPage } from "@/components/types";
import { getCookie } from "cookies-next";
import React, { useState, useEffect } from "react";
import * as jwt from "jsonwebtoken";
import { useDispatch, useSelector } from "react-redux";
import { GetByNameOrEmail } from "@/redux/usersSchema/profile/action/actionReducer";

const Index: MyPage = () => {
  const token = getCookie("token");

  const [name, setName] = useState("");
  const dispatch = useDispatch();

  let { users, refresh } = useSelector(
    (state: any) => state.userProfileReducers
  );

  useEffect(() => {
    if (typeof token === "string") {
      const decodedToken = jwt.decode(token);
      if (typeof decodedToken === "object" && decodedToken?.aud) {
        const nameValue = decodedToken.aud as string;
        setName(nameValue);
      }
    }
  }, [token]);

  useEffect(() => {
    if (name) {
      dispatch(GetByNameOrEmail(name));
    }
  }, [name, refresh]);

  return (
    <div>
      Profile {name}
      <div>
        {users.user_name}
        {users.role_name}
      </div>
    </div>
  );
};

Index.Layout = "User";
export default Index;
