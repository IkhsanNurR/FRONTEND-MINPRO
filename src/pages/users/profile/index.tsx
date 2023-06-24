import { MyPage } from "@/components/types";
import { getCookie } from "cookies-next";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetByNameOrEmail } from "@/redux/usersSchema/profile/action/actionReducer";
import decodeTokenName from "@/helper/decodedTokenName";
import { Card, Collapse } from "antd";
import EditProfileCard from "@/components/userSchema/profile";
import PhoneCard from "@/components/userSchema/phones";
import EmailCard from "@/components/userSchema/email";
import AddressCard from "@/components/userSchema/address";
import EducationCard from "@/components/userSchema/education";
import ExperiencesCard from "@/components/userSchema/experiences";
import SkillsCard from "@/components/userSchema/skills";
import ResumeCard from "@/components/userSchema/resume";
import showNotification from "@/helper/notification";

const Index: MyPage = () => {
  const token = getCookie("token");

  const [name, setName] = useState<string | null>(null);
  const dispatch = useDispatch();

  let { msg }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );

  useEffect(() => {
    const decode = decodeTokenName(token);
    setName(decode);

    if (name) {
      dispatch(GetByNameOrEmail(name));
    }
  }, [token, name]);

  useEffect(() => {
    if (msg) {
      showNotification("success", msg);
    }
  }, [msg]);

  return (
    <div className="p-10">
      <Card title="Setting Profile">
        {/* <EditProfileCard />
        <EmailCard />
        <PhoneCard />
        <AddressCard />
        <EducationCard />
        <ExperiencesCard />
        <SkillsCard />
        <ResumeCard /> */}
        <Collapse accordion items={undefined}>
          <Collapse.Panel header="Edit Profile" key="editProfile">
            <EditProfileCard />
          </Collapse.Panel>
          <Collapse.Panel header="Email" key="email">
            <EmailCard />
          </Collapse.Panel>
          <Collapse.Panel header="Phone" key="phone">
            <PhoneCard />
          </Collapse.Panel>
          <Collapse.Panel header="Address" key="address">
            <AddressCard />
          </Collapse.Panel>
          <Collapse.Panel header="Education" key="education">
            <EducationCard />
          </Collapse.Panel>
          <Collapse.Panel header="Experiences" key="experiences">
            <ExperiencesCard />
          </Collapse.Panel>
          <Collapse.Panel header="Skills" key="skills">
            <SkillsCard />
          </Collapse.Panel>
          <Collapse.Panel header="Resume" key="resume">
            <ResumeCard />
          </Collapse.Panel>
        </Collapse>
      </Card>
    </div>
  );
};

Index.Layout = "User";
export default Index;
