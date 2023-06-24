import Content from "@/components/shared/content";
import { MyPage } from "@/components/types";
import React from "react";

const Index: MyPage = () => {
  return (
    <>
      <Content>Index Master</Content>
    </>
  );
};

Index.Layout = "Admin";
export default Index;
