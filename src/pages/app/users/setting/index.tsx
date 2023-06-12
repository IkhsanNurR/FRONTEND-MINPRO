import Content2 from "@/components/shared/content2";
import { MyPage } from "@/components/types";
import { Card, Image } from "antd";
import React from "react";

const Index: MyPage = () => {
  return (
    <Content2>
      <Card title="Profile" extra={<p>edit</p>}>
        <div className="flex flex-row">
          <div className="sm:w-max">
            <Image
              src="/1672903971710.jpg"
              width={100}
              style={{
                borderRadius: "50%",
              }}
            />
          </div>
          <div className="sm:w-full pt-5 pl-10">
            <h1>Michael</h1>
            <h1>Kandidat Bootcamp</h1>
          </div>
        </div>
      </Card>
    </Content2>
  );
};

Index.Layout = "Admin";
export default Index;
