import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import React from "react";

const Index: React.FC = () => {
  return (
    <Card
      title="Skills"
      extra={
        <>
          <Button className="flex">
            <PlusCircleOutlined style={{ fontSize: "20px" }} />
            <span>Add</span>
          </Button>
        </>
      }
    ></Card>
  );
};

export default Index;
