import React, { useState } from "react";
import { Button, Card, Empty, List, Modal } from "antd";
import AddPhone from "./Add";
import EditPhone from "./Edit";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deletePhone } from "@/redux/usersSchema/profile/action/actionReducer";

const Index: React.FC = () => {
  const [modalAddPhone, setModalAddPhone] = useState<boolean>(false);
  const [modalEditPhone, setModalEditPhone] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const { confirm } = Modal;
  const dispatch = useDispatch();

  const showModalAddPhone = () => {
    setModalAddPhone(!modalAddPhone);
  };

  const handleCancelAddPhone = () => {
    showModalAddPhone();
  };

  const handleSubmitAddPhone = () => {
    showModalAddPhone();
  };

  const handleSubmitEditPhone = () => {
    setModalEditPhone(!modalEditPhone);
  };

  const handleCancelEditPhone = () => {
    setModalEditPhone(!modalEditPhone);
  };

  let { users }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );

  const showModalEditPhone = (phoneNumber: string) => {
    setModalEditPhone(!modalEditPhone);
    setPhoneNumber(phoneNumber);
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

  return (
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
      {users?.phone?.length ? (
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
      ) : (
        <Empty description="No Data" />
      )}
    </Card>
  );
};

export default Index;
