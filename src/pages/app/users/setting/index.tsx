import Content2 from "@/components/shared/content2";
import { MyPage } from "@/components/types";
import decodeTokenName from "@/helper/decodedTokenName";
import {
  GetByNameOrEmail,
  deleteEmail,
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

const Index: MyPage = () => {
  let { users, refresh }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );
  const dispatch = useDispatch();
  const token = getCookie("token");
  const [modalEditProfile, setModalEditProfile] = useState<boolean>(false);
  const [modalEditEmail, setModalEditEmail] = useState<boolean>(false);
  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [decodeToken, setDecodeToken] = useState<string | null>(null);
  const { confirm } = Modal;
  const [idEdit, setIdEdit] = useState<number>();

  const showModalEditProfile = () => {
    setModalEditProfile(!modalEditProfile);
  };

  const showModalEditEmail = (id: any) => {
    setModalEditEmail(!modalEditEmail);
    setIdEdit(id);
  };

  useEffect(() => {
    const decode = decodeTokenName(token);
    setDecodeToken(decode);
  }, [token, refresh]);

  useEffect(() => {
    if (decodeToken) {
      dispatch(GetByNameOrEmail(decodeToken));
    }
  }, [decodeToken]);

  const handleSubmitEdit = async () => {
    showModalEditProfile();
  };

  const handleSubmitEditEmail = () => {
    setModalEditEmail(!modalEditEmail);
  };

  const handleCancelEditEmail = () => {
    setModalEditEmail(!modalEditEmail);
  };

  const showDeleteConfirm = (name: string, id: number) => {
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

  const showModalAdd = () => {
    setModalAdd(!modalAdd);
  };

  const handleSubmitAdd = () => {
    showModalAdd();
  };

  const handleCancelAdd = () => {
    showModalAdd();
  };

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
              <Button className="flex" onClick={showModalAdd}>
                <PlusCircleOutlined style={{ fontSize: "20px" }} />
                <span>Add</span>
              </Button>
              <Add
                open={modalAdd}
                onCancel={handleCancelAdd}
                onSubmit={handleSubmitAdd}
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
                      key={item.pmail_id}
                    >
                      <EditOutlined style={{ fontSize: "20px" }} />
                      <span>Edit </span>
                    </Button>
                    <Edit
                      open={modalEditEmail}
                      onCancel={handleCancelEditEmail}
                      onSubmit={handleSubmitEditEmail}
                      id={idEdit}
                    />
                  </>,
                  <>
                    {users.pmail_address?.find((item) => item.pmail_id) ? (
                      <Button
                        className="flex"
                        onClick={() =>
                          showDeleteConfirm(
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
      </Card>
    </Content2>
  );
};

Index.Layout = "Admin";
export default Index;
