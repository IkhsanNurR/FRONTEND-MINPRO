import { MyPage } from "@/components/types";
import { getCookie } from "cookies-next";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetByNameOrEmail } from "@/redux/usersSchema/profile/action/actionReducer";
import decodeTokenName from "@/helper/decodedTokenName";
import { Card } from "antd";
import EditProfileCard from "@/components/userSchema/profile";
import PhoneCard from "@/components/userSchema/phones";
import EmailCard from "@/components/userSchema/email";
import AddressCard from "@/components/userSchema/address";
import EducationCard from "@/components/userSchema/education";
import ExperiencesCard from "@/components/userSchema/experiences";
import SkillsCard from "@/components/userSchema/skills";
import ResumeCard from "@/components/userSchema/resume";

const Index: MyPage = () => {
  const token = getCookie("token");

  const [name, setName] = useState<string | null>(null);
  const dispatch = useDispatch();

  let { refresh } = useSelector((state: any) => state.userProfileReducers);

  useEffect(() => {
    const decode = decodeTokenName(token);
    setName(decode);

    if (name) {
      dispatch(GetByNameOrEmail(name));
    }
  }, [token, name, refresh]);

  return (
    <div className="p-20">
      <Card title="Setting Profile">
        <EditProfileCard />
        <EmailCard />
        <PhoneCard />
        <AddressCard />
        <EducationCard />
        <ExperiencesCard />
        <SkillsCard />
        <ResumeCard />
      </Card>
    </div>
  );
};

Index.Layout = "User";
export default Index;
