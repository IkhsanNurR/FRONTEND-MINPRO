import Content2 from "@/components/shared/content2";
import { MyPage } from "@/components/types";
import decodeTokenName from "@/helper/decodedTokenName";
import { GetByNameOrEmail } from "@/redux/usersSchema/profile/action/actionReducer";
import { Button, Card, List, Modal } from "antd";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PlusCircleOutlined } from "@ant-design/icons";
import PhoneCard from "@/components/userSchema/phones";
import EditProfileCard from "@/components/userSchema/profile";
import EmailCard from "@/components/userSchema/email";

const Index: MyPage = () => {
  const dispatch = useDispatch();
  const token = getCookie("token");
  const [decodeToken, setDecodeToken] = useState<string | null>(null);

  useEffect(() => {
    const decode = decodeTokenName(token);
    setDecodeToken(decode);
  }, [token]);

  useEffect(() => {
    if (decodeToken) {
      dispatch(GetByNameOrEmail(decodeToken));
    }
  }, [decodeToken]);

  return (
    <Content2>
      <Card title="Setting Profile">
        <EditProfileCard />
        <EmailCard />
        <PhoneCard />
        <Card
          title="Address"
          extra={
            <>
              <Button className="flex">
                <PlusCircleOutlined style={{ fontSize: "20px" }} />
                <span>Add</span>
              </Button>
            </>
          }
        ></Card>
        <Card title="Educations"></Card>
        <Card title="Experiences"></Card>
        <Card title="Skills"></Card>
      </Card>
    </Content2>
  );
};

Index.Layout = "Admin";
export default Index;
