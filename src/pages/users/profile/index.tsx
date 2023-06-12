import { MyPage } from "@/components/types";
import { getCookie } from "cookies-next";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetByNameOrEmail } from "@/redux/usersSchema/profile/action/actionReducer";
import decodeTokenName from "@/helper/decodedTokenName";

const Index: MyPage = () => {
  const token = getCookie("token");

  const [name, setName] = useState<string | null>(null);
  const dispatch = useDispatch();

  let { users, refresh } = useSelector(
    (state: any) => state.userProfileReducers
  );

  useEffect(() => {
    const decode = decodeTokenName(token);
    setName(decode);
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
