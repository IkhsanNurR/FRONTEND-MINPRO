import { MyPage } from "@/components/types";
import { Alert, Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Login, SignUp } from "@/redux/usersSchema/auth/action/actionReducer";
import {
  LockOutlined,
  MailFilled,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getCookie } from "cookies-next";
import decodeTokenRole from "@/helper/decodeTokenRole";
import { useRouter } from "next/router";

const Index: MyPage = () => {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  let { message, status } = useSelector((state: any) => state.authReducers);

  console.log("p", router.query);

  const onFinish = async (values: any) => {
    try {
      await form.validateFields();
      dispatch(SignUp(values));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const signupSuccessOrFail = () => {
    if (status === 200) {
      dispatch(Login(form.getFieldsValue(["usernameOrEmail", "password"])));
    } else {
      setErrorMessage(message);
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 1000);
      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    signupSuccessOrFail();
  }, [status]);

  useEffect(() => {
    const token = getCookie("token");
    const decode = decodeTokenRole(token);
    if (
      decode?.role === "Student" ||
      decode?.role === "Kandidat" ||
      decode?.role === "Talent"
    ) {
      router.push("/");
    } else if (
      decode?.role === "Admin" ||
      decode?.role === "Trainee" ||
      decode?.role === "Employee"
    ) {
      router.push("/app");
    }
  }, [signupSuccessOrFail]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full sm:w-96 bg-white rounded-md shadow-lg p-4">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="logo"
              width={150}
              height={100}
              quality={100}
            />
          </div>
          <h1 className="text-sm font-extrabold text-gray-900">Sign up</h1>
        </div>
        {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
        <Form
          name="register"
          layout="vertical"
          className="mt-1"
          onFinish={onFinish}
          form={form}
        >
          <div className="space-y-1">
            <Form.Item
              name="usernameOrEmail"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Please input username",
                },
              ]}
            >
              <Input
                size="small"
                prefix={<UserOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            <Form.Item
              name="pmail_address"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please input valid email",
                  type: "email",
                },
              ]}
            >
              <Input
                size="small"
                prefix={<MailFilled className="site-form-item-icon" />}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input password",
                },
              ]}
            >
              <Input.Password
                size="small"
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              rules={[
                {
                  required: true,
                  message: "Please input confirm password",
                },
              ]}
            >
              <Input.Password
                size="small"
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            <Form.Item
              name="uspo_number"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please input phone number",
                },
              ]}
            >
              <Input
                size="small"
                prefix={<PhoneOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
          </div>
          <div className="mt-4 flex justify-between gap-2 px-20">
            <Button danger>Cancel</Button>
            <Button htmlType="submit">Sign up</Button>
          </div>
          <div className="text-center pt-4 underline text-violet-900">
            <Link href="/">
              if you are employee code.id, click this for signup
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

Index.Layout = "Signup";
export default Index;
