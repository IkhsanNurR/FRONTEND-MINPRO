import Content2 from "@/components/shared/content2";
import { MyPage } from "@/components/types";
import decodeTokenName from "@/helper/decodedTokenName";
import { GetByNameOrEmail } from "@/redux/usersSchema/profile/action/actionReducer";
import { Button, Card, Image } from "antd";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import EditProfile from "@/components/userSchema/profile/Edit";

const Index: MyPage = () => {
  let { users, refresh } = useSelector(
    (state: any) => state.userProfileReducers
  );
  const dispatch = useDispatch();
  const token = getCookie("token");
  const [modalEdit, setModalEdit] = useState(false);

  const showModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  useEffect(() => {
    const decode = decodeTokenName(token);

    if (decode) {
      dispatch(GetByNameOrEmail(decode));
    }
  }, [token, refresh]);

  const handleSubmit = async () => {
    showModalEdit();
  };

  return (
    <Content2>
      <Card
        title="Profile"
        extra={
          <>
            <Button onClick={showModalEdit}>
              <EditOutlined style={{ fontSize: "20px" }} />
              <span>Edit</span>
            </Button>
            <EditProfile
              open={modalEdit}
              onCancel={showModalEdit}
              onSubmit={handleSubmit}
            />
          </>
        }
      >
        <div className="flex flex-row">
          <div className="sm:w-max">
            {users?.user_photo ? (
              <Image
                src={process.env.imageUser + users.user_photo}
                alt="image profile"
                width={100}
                height={100}
                style={{
                  borderRadius: "50%",
                }}
              />
            ) : (
              <Image
                src="/1672903971710.jpg"
                width={100}
                height={100}
                style={{
                  borderRadius: "50%",
                }}
              />
            )}
          </div>
          <div className="sm:w-full pt-5 pl-10">
            {users.user_first_name !== null ? (
              <>
                <h1 className="capitalize">
                  {users.user_first_name + " " + users.user_last_name}
                </h1>
                <h1>{users.role_name}</h1>
              </>
            ) : (
              <>
                <h1>full name</h1>
                <h1>role</h1>
              </>
            )}
          </div>
        </div>
      </Card>
    </Content2>
  );
};

Index.Layout = "Admin";
export default Index;
