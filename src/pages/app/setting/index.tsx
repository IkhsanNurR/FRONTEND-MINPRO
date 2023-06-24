import Content2 from "@/components/shared/content2";
import { MyPage } from "@/components/types";
import decodeTokenName from "@/helper/decodedTokenName";
import { GetByNameOrEmail } from "@/redux/usersSchema/profile/action/actionReducer";
import { Card, Collapse } from "antd";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PhoneCard from "@/components/userSchema/phones";
import EditProfileCard from "@/components/userSchema/profile";
import EmailCard from "@/components/userSchema/email";
import AddressCard from "@/components/userSchema/address";
import EducationCard from "@/components/userSchema/education";
import ExperiencesCard from "@/components/userSchema/experiences";
import SkillsCard from "@/components/userSchema/skills";
import showNotification from "@/helper/notification";
import Content from "@/components/shared/content";

const Index: MyPage = () => {
  const dispatch = useDispatch();
  const token = getCookie("token");
  const [decodeToken, setDecodeToken] = useState<string | null>(null);

  let { msg }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );

  useEffect(() => {
    const decode = decodeTokenName(token);
    setDecodeToken(decode);
  }, [token]);

  useEffect(() => {
    if (decodeToken) {
      dispatch(GetByNameOrEmail(decodeToken));
    }
  }, [decodeToken]);

  useEffect(() => {
    if (msg) {
      showNotification("success", msg);
    }
  }, [msg]);

  return (
    <Content title="Setting Profile">
      <Card
      // title="Setting Profile"
      >
        {/* <EditProfileCard />
        <EmailCard />
        <PhoneCard />
        <AddressCard />
        <EducationCard />
        <ExperiencesCard />
        <SkillsCard /> */}
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
        </Collapse>
      </Card>
    </Content>
  );
};

Index.Layout = "Admin";
export default Index;
