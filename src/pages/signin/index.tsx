import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Checkbox, Form, Input, Alert } from "antd";
import { MyPage } from "@/components/types";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Login } from "@/redux/usersSchema/auth/action/actionReducer";
import { getCookie } from "cookies-next";
import * as jwt from "jsonwebtoken";

const Index: MyPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const { message } = useSelector((state: any) => state.authReducers);

  const onFinish = async (values: any) => {
    try {
      await form.validateFields();
      dispatch(Login(values));
      form.resetFields();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const token = getCookie("token");
    if (typeof token === "string") {
      const decode = jwt.decode(token);
      if (typeof decode === "object" && decode?.sub) {
        const role: RoleType = {
          role: decode.sub as
            | "Admin"
            | "Employee"
            | "Kandidat"
            | "Talent"
            | "Trainee"
            | "Student",
        };
        if (
          role.role === "Student" ||
          role.role === "Kandidat" ||
          role.role === "Talent"
        ) {
          router.push("/");
        } else if (
          role.role === "Admin" ||
          role.role === "Trainee" ||
          role.role === "Employee"
        ) {
          router.push("/app");
        }
      }
    }
  }, [onFinish]);

  useEffect(() => {
    if (message) {
      setErrorMessage(message);
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/3 bg-login" />
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <Image
                src="/logo.png"
                alt="logo"
                width={400}
                height={100}
                quality={100}
              />
              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Sign in to access your account
              </p>
            </div>

            <div className="mt-2">
              {errorMessage && (
                <Alert message={errorMessage} type="error" showIcon />
              )}
              <Form
                name="basic"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                form={form}
              >
                <Form.Item
                  label="Username or Email"
                  name="usernameOrEmail"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username or your email",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  <Checkbox className="float-left">Remember Me</Checkbox>
                  <Link
                    href="#"
                    className="text-blue-500 focus:outline-none focus:underline hover:underline float-right"
                  >
                    Forgot your password ?
                  </Link>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      backgroundColor: "#1890ff",
                      borderColor: "#1890ff",
                    }}
                  >
                    Sign in
                  </Button>
                </Form.Item>
              </Form>
              <p className="mt-2 text-sm text-center text-gray-400">
                Don&#x27;t have an account yet? {}
                <Link
                  href="#"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Sign up
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Index.Layout = "Login";
export default Index;
