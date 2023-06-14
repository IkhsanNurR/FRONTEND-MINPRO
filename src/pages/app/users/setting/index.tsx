import Content2 from "@/components/shared/content2";
import { MyPage } from "@/components/types";
import decodeTokenName from "@/helper/decodedTokenName";
import {
  GetByNameOrEmail,
  deleteEmail,
  deletePhone,
} from "@/redux/usersSchema/profile/action/actionReducer";
import { Avatar, Button, Card, Image, List, Modal } from "antd";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import EditProfile from "@/components/userSchema/profile/Edit";
import Add from "@/components/userSchema/email/Add";
import Edit from "@/components/userSchema/email/Edit";
import AddPhone from "@/components/userSchema/phones/Add";
import EditPhone from "@/components/userSchema/phones/Edit";

const Index: MyPage = () => {
  let { users, refresh }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );

  const dispatch = useDispatch();
  const token = getCookie("token");
  const [modalEditProfile, setModalEditProfile] = useState<boolean>(false);
  const [modalEditEmail, setModalEditEmail] = useState<boolean>(false);
  const [modalAddEmail, setModalAddEmail] = useState<boolean>(false);
  const [modalAddPhone, setModalAddPhone] = useState<boolean>(false);
  const [modalEditPhone, setModalEditPhone] = useState<boolean>(false);
  const [decodeToken, setDecodeToken] = useState<string | null>(null);
  const { confirm } = Modal;
  const [idEditEmail, setIdEditEmail] = useState<number>();
  const [phoneNumber, setPhoneNumber] = useState<string>();

  useEffect(() => {
    const decode = decodeTokenName(token);
    setDecodeToken(decode);
  }, [token]);

  useEffect(() => {
    if (decodeToken) {
      dispatch(GetByNameOrEmail(decodeToken));
    }
  }, [decodeToken]);

  const showModalEditProfile = () => {
    setModalEditProfile(!modalEditProfile);
  };

  const handleSubmitEdit = async () => {
    showModalEditProfile();
  };

  const showModalEditPhone = (phoneNumber: string) => {
    setModalEditPhone(!modalEditPhone);
    setPhoneNumber(phoneNumber);
  };

  const handleSubmitEditPhone = () => {
    setModalEditPhone(!modalEditPhone);
  };

  const handleCancelEditPhone = () => {
    setModalEditPhone(!modalEditPhone);
  };

  const showModalEditEmail = (id: any) => {
    setModalEditEmail(!modalEditEmail);
    setIdEditEmail(id);
  };

  const handleSubmitEditEmail = () => {
    setModalEditEmail(!modalEditEmail);
  };

  const handleCancelEditEmail = () => {
    setModalEditEmail(!modalEditEmail);
  };

  const showDeleteConfirmEmail = (name: string, id: number) => {
    confirm({
      title: `Are you sure to delete this email ${name} ? `,
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteEmail(id));
      },
      onCancel() {
        console.log("cancel");
      },
    });
  };

  const showDeleteConfirmPhone = (id: number, phonenumber: any) => {
    confirm({
      title: `Are you sure to delete this phone ${phonenumber} ? `,
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deletePhone({ id, phonenumber }));
      },
      onCancel() {
        console.log("cancel");
      },
    });
  };

  const showModalAddEmail = () => {
    setModalAddEmail(!modalAddEmail);
  };

  const handleSubmitAddEmail = () => {
    showModalAddEmail();
  };

  const handleCancelAddEmail = () => {
    showModalAddEmail();
  };

  const showModalAddPhone = () => {
    setModalAddPhone(!modalAddPhone);
  };

  const handleSubmitAddPhone = () => {
    showModalAddPhone();
  };

  const handleCancelAddPhone = () => {
    showModalAddPhone();
  };

  const lengthEmail = users?.pmail_address?.length || 0;

  return (
    <Content2>
      <Card title="Setting Profile">
        <Card
          title="Profile"
          extra={
            <>
              <Button onClick={showModalEditProfile} className="flex">
                <EditOutlined style={{ fontSize: "20px" }} />
                <span>Edit</span>
              </Button>
              <EditProfile
                open={modalEditProfile}
                onCancel={showModalEditProfile}
                onSubmit={handleSubmitEdit}
              />
            </>
          }
        >
          <div className="flex flex-row">
            <div className="sm:w-max">
              {users?.user_photo !== null ? (
                <Image
                  src={process.env.imageUser + `/${users?.user_photo}`}
                  alt="image profile"
                  width={100}
                  height={100}
                  style={{
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <Avatar size={64} icon={<UserOutlined />} />
              )}
            </div>
            <div className="sm:w-full pt-5 pl-10">
              {users?.user_first_name !== null ? (
                <>
                  <h1 className="capitalize">
                    {users?.user_first_name + " " + users?.user_last_name}
                  </h1>
                  <h1>{users?.role_name}</h1>
                </>
              ) : (
                <>
                  <p>Update your profile</p>
                </>
              )}
            </div>
          </div>
        </Card>
        <Card
          title="Emails"
          extra={
            <>
              <Button className="flex" onClick={showModalAddEmail}>
                <PlusCircleOutlined style={{ fontSize: "20px" }} />
                <span>Add</span>
              </Button>
              <Add
                open={modalAddEmail}
                onCancel={handleCancelAddEmail}
                onSubmit={handleSubmitAddEmail}
                id={users?.user_entity_id}
              />
            </>
          }
        >
          <List
            dataSource={users?.pmail_address}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <>
                    <Button
                      className="flex"
                      onClick={() => showModalEditEmail(item.pmail_id)}
                    >
                      <EditOutlined style={{ fontSize: "20px" }} />
                      <span>Edit </span>
                    </Button>
                    <Edit
                      open={modalEditEmail}
                      onCancel={handleCancelEditEmail}
                      onSubmit={handleSubmitEditEmail}
                      id={idEditEmail}
                    />
                  </>,
                  <>
                    {lengthEmail > 1 ? (
                      <Button
                        className="flex"
                        onClick={() =>
                          showDeleteConfirmEmail(
                            item.pmail_address,
                            Number(item.pmail_id)
                          )
                        }
                      >
                        <DeleteOutlined style={{ fontSize: "20px" }} />
                        <span>Delete</span>
                      </Button>
                    ) : null}
                  </>,
                ]}
              >
                {item.pmail_address}
              </List.Item>
            )}
            bordered
          />
        </Card>
        <Card
          title="Phones"
          extra={
            <>
              <Button className="flex" onClick={showModalAddPhone}>
                <PlusCircleOutlined style={{ fontSize: "20px" }} />
                <span>Add</span>
              </Button>
              <AddPhone
                open={modalAddPhone}
                onCancel={handleCancelAddPhone}
                onSubmit={handleSubmitAddPhone}
                id={users?.user_entity_id}
              />
            </>
          }
        >
          <List
            dataSource={users?.phone}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <>
                    <Button
                      className="flex"
                      onClick={() => showModalEditPhone(item.uspo_number)}
                    >
                      <EditOutlined style={{ fontSize: "20px" }} />
                      <span>Edit</span>
                    </Button>
                    <EditPhone
                      open={modalEditPhone}
                      onCancel={handleCancelEditPhone}
                      onSubmit={handleSubmitEditPhone}
                      phonenumber={phoneNumber}
                      id={Number(users?.user_entity_id)}
                    />
                  </>,
                  <>
                    <Button
                      className="flex"
                      onClick={() =>
                        showDeleteConfirmPhone(
                          Number(users?.user_entity_id),
                          item.uspo_number
                        )
                      }
                    >
                      <DeleteOutlined style={{ fontSize: "20px" }} />
                      <span>Delete</span>
                    </Button>
                  </>,
                ]}
              >
                {item.uspo_number + " " + `(${item.uspo_ponty_code})`}
              </List.Item>
            )}
            bordered
          />
        </Card>
        <Card title="Address"></Card>
        <Card title="Educations"></Card>
        <Card title="Experiences"></Card>
        <Card title="Skills"></Card>
      </Card>
    </Content2>
  );
};

Index.Layout = "Admin";
export default Index;
