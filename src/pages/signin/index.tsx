import React from "react";
import Image from "next/image";
import { Button, Checkbox, Form, Input } from "antd";
import { MyPage } from "@/components/types";

const Index: MyPage = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-md mx-auto my-10 bg-white p-6 rounded-md shadow-md text-center">
        <div className="flex justify-center">
          <Image
            src="/logo3.png"
            width={190}
            height={100}
            alt="logo code x"
            quality={100}
          />
        </div>
        <h2 className="text-2xl font-semibold mb-6">Sign in to your account</h2>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="">
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

Index.Layout = "Login";
export default Index;
