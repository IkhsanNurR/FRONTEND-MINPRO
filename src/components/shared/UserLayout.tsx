import { Avatar, Button, Dropdown, Form, Input, MenuProps, Modal } from "antd";
import Link from "next/link";
import React, { PropsWithChildren, useState, useEffect } from "react";
import { CookieValueTypes, getCookie, deleteCookie } from "cookies-next";
import {
  LockOutlined,
  PoweroffOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  GetByNameOrEmail,
  changePassword,
} from "@/redux/usersSchema/profile/action/actionReducer";
import decodeTokenName from "@/helper/decodedTokenName";
import showNotification from "@/helper/notification";

const ModalChangePassword: React.FC<ModalAdd> = ({
  open,
  onCancel,
  onSubmit,
  id,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  const handleOk = async (values: any) => {
    try {
      await form.validateFields();
      dispatch(changePassword({ payload: values, id }));
      onSubmit();
      form.resetFields();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Modal
      title="Change Password"
      open={open}
      onCancel={handleCancel}
      footer={
        <div>
          <Button onClick={handleCancel}>Batal</Button>
          <Button
            onClick={() => form.submit()}
            className="ant-btn ant-btn-primary"
            style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
          >
            Simpan
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={handleOk}
      >
        <Form.Item
          label="Current Password"
          name="user_password"
          rules={[
            {
              required: true,
              message: "Please input current password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Please input new password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Re-type Password"
          name="retypePassword"
          rules={[
            {
              required: true,
              message: "Please input new re-type password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const UserLayout = ({ children }: PropsWithChildren) => {
  const [haveToken, setHaveToken] = useState<CookieValueTypes>("");
  const [modalChangePassword, setModalChangePassword] =
    useState<boolean>(false);
  const [name, setName] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const showModalChangePassword = () => {
    setModalChangePassword(true);
  };

  const router = useRouter();
  const token = getCookie("token");

  useEffect(() => {
    setHaveToken(token);
  }, []);

  const handleLogout = () => {
    deleteCookie("token");
    setHaveToken("");
    router.push("/");
  };

  let { users, refresh, msg, status }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );

  useEffect(() => {
    const decode = decodeTokenName(token);
    setName(decode);

    if (name) {
      dispatch(GetByNameOrEmail(name));
    }
  }, [token, name]);

  const handelSubmit = () => {
    setModalChangePassword(!modalChangePassword);
  };

  console.log("pesan awala", message);

  // useEffect(() => {
  //   if (msg && status === 400) {
  //     setMessage(msg);
  //     setTimeout(() => {
  //       setMessage("");
  //     }, 1000);
  //   } else if (msg && status === 200) {
  //     setMessage(msg);
  //     setTimeout(() => {
  //       setMessage("");
  //     }, 1000);
  //   }
  // }, [msg, status]);

  // console.log("pesan akhir", message);

  // useEffect(() => {
  //   if (message && status === 400) {
  //     showNotification("error", message);
  //   } else if (message && status === 200) {
  //     showNotification("success", message);
  //   }
  // }, [message, status]);

  useEffect(() => {
    if (msg) {
      setMessage(msg);
      setTimeout(() => {
        setMessage("");
      }, 1000);
      if (status === 400) {
        showNotification("error", msg);
      } else if (status === 200) {
        showNotification("success", msg);
      }
    }
  }, [msg, status]);

  // useEffect(() => {
  //   if (messageChangePassword && statusChangePassword === 400) {
  //     // setMessage(messageChangePassword);
  //     showNotification("error", messageChangePassword);
  //   } else if (messageChangePassword && statusChangePassword === 200) {
  //     // setMessage(messageChangePassword);
  //     showNotification("success", messageChangePassword);
  //   }
  // }, [messageChangePassword]);

  const items: MenuProps["items"] = [
    {
      label: (
        <Link href="/users/profile" className="flex">
          <Button type="link">
            <SolutionOutlined />
            <span className="pl-1">Profile</span>
          </Button>
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <>
          <Button
            className="flex"
            onClick={showModalChangePassword}
            type="link"
          >
            <LockOutlined className="pt-1" />
            <span className="">Change Password</span>
          </Button>
        </>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Button type="link" onClick={handleLogout}>
          <PoweroffOutlined className="" />
          <span>Sign Out</span>
        </Button>
      ),
      key: "3",
    },
  ];

  return (
    <>
      <div className="flex justify-between bg-slate-100 max-h-12">
        <div className="float-left">
          <div className="flex">
            <Link href="/profesional"> Job Apply</Link>
          </div>
        </div>
        <div className="float-right p-2">
          {haveToken ? (
            <>
              <Dropdown
                menu={{ items }}
                trigger={["click"]}
                className="cursor-pointer"
              >
                <Avatar icon={<UserOutlined />} className="icon" />
              </Dropdown>
              <ModalChangePassword
                open={modalChangePassword}
                onCancel={() => setModalChangePassword(!modalChangePassword)}
                onSubmit={handelSubmit}
                id={users?.user_entity_id}
              />
            </>
          ) : (
            <>
              <Button>
                <Link href="/signin">Sign in</Link>
              </Button>
              <Button>
                <Link href="/external/signup">
                  <span>Sign Up</span>
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
      <main className="p-10">{children}</main>
    </>
  );
};

export default UserLayout;
