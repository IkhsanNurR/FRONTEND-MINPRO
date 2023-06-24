import {
  FileOutlined,
  LockOutlined,
  PoweroffOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Form, Input, MenuProps, Modal } from "antd";
import { CookieValueTypes, deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetByNameOrEmail,
  changePassword,
} from "@/redux/usersSchema/profile/action/actionReducer";
import showNotification from "@/helper/notification";
import decodeTokenName from "@/helper/decodedTokenName";
import Image from "next/image";
import decodeTokenRole from "@/helper/decodeTokenRole";

export const ModalChangePassword: React.FC<ModalAdd> = ({
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
      dispatch({ type: "RESET_STATE" });
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

const Header: React.FC = () => {
  const [haveToken, setHaveToken] = useState<CookieValueTypes>("");
  const [modalChangePassword, setModalChangePassword] =
    useState<boolean>(false);
  const [name, setName] = useState<string | null>(null);
  const [roleTalent, setRoleTalent] = useState(true);
  const [roleKandidat, setRoleKandidat] = useState(true);
  const [roleStudent, setRoleStudent] = useState(true);

  const showModalChangePassword = () => {
    setModalChangePassword(true);
  };
  const router = useRouter();
  const token = getCookie("token");
  const dispatch = useDispatch();

  useEffect(() => {
    setHaveToken(token);
  }, []);

  const handleLogout = () => {
    deleteCookie("token");
    setHaveToken("");
    router.push("/");
  };

  const handelSubmit = () => {
    setModalChangePassword(!modalChangePassword);
  };

  let { users, refresh, msg, status }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );

  useEffect(() => {
    const decode = decodeTokenName(token);
    const role = decodeTokenRole(token);
    setRoleTalent(role?.role === "Talent");
    setRoleKandidat(role?.role === "Kandidat");
    setRoleStudent(role?.role === "Student");
    setName(decode);

    if (name) {
      dispatch(GetByNameOrEmail(name));
    }
  }, [token, name, refresh]);

  useEffect(() => {
    if (status === 400) {
      showNotification("error", msg);
    } else if (status === 200) {
      showNotification("success", msg);
    }
  }, [status]);

  const itemsProfile: MenuProps["items"] = [
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
      key: "0",
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
      key: "1",
    },
  ];

  if (roleTalent || roleKandidat || roleStudent) {
    itemsProfile.splice(
      0,
      0,
      {
        label: (
          <Link href="/users/profile" className="flex">
            <Button type="link">
              <SolutionOutlined />
              <span className="pl-1">Profile</span>
            </Button>
          </Link>
        ),
        key: "2",
      },
      {
        label: (
          <>
            <Button className="flex" type="link">
              <FileOutlined className="pt-1" />
              <span>My Apply</span>
            </Button>
          </>
        ),
        key: "3",
      }
    );
  } else {
    itemsProfile.splice(0, 0, {
      label: (
        <Link href="/app/setting" className="flex">
          <Button type="link">
            <SolutionOutlined />
            <span className="pl-1">Profile</span>
          </Button>
        </Link>
      ),
      key: "2",
    });
  }

  return (
    <div className="flex fixed w-screen bg-slate-100">
      <div className="float-left">
        <div className="flex p-3">
          <Image
            src="/logo3.png"
            alt="image logo"
            width={100}
            height={100}
            quality={100}
          />
        </div>
      </div>
      <div className="w-full sm:block">
        <div className="bg-red-500 flex justify-center items-center"></div>
      </div>
      <div className="float-right p-2">
        {haveToken ? (
          <>
            <Dropdown
              menu={{ items: itemsProfile }}
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
          <div className="flex">
            <Button type="link">
              <Link href="/signin">Sign in</Link>
            </Button>
            <Button type="link">
              <Link href="/external/signup">
                <span>Sign Up</span>
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
