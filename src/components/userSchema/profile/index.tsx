import React, { useEffect, useState } from "react";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Image } from "antd";
import EditProfile from "./Edit";
import { useSelector } from "react-redux";
import showNotification from "@/helper/notification";

const Index: React.FC = () => {
  let { users }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );

  const [modalEditProfile, setModalEditProfile] = useState<boolean>(false);

  const showModalEditProfile = () => {
    setModalEditProfile(!modalEditProfile);
  };

  const handleSubmitEdit = async () => {
    showModalEditProfile();
  };

  return (
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
  );
};

export default Index;
