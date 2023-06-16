import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, List, Modal } from "antd";
import React, { useState } from "react";
import Add from "./Add";
import Edit from "./Edit";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmail } from "@/redux/usersSchema/profile/action/actionReducer";

const Index: React.FC = () => {
  let { users }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );

  const lengthEmail: boolean = (users?.pmail_address?.length ?? 0) > 1;

  const [modalAddEmail, setModalAddEmail] = useState<boolean>(false);
  const [modalEditEmail, setModalEditEmail] = useState<boolean>(false);
  const [idEditEmail, setIdEditEmail] = useState<number>();
  const { confirm } = Modal;
  const dispatch = useDispatch();

  const showModalAddEmail = () => {
    setModalAddEmail(!modalAddEmail);
  };

  const handleSubmitAddEmail = () => {
    showModalAddEmail();
  };

  const handleCancelAddEmail = () => {
    showModalAddEmail();
  };

  const showModalEditEmail = (id: any) => {
    setModalEditEmail(!modalEditEmail);
    setIdEditEmail(id);
  };

  const handleCancelEditEmail = () => {
    setModalEditEmail(!modalEditEmail);
  };

  const handleSubmitEditEmail = () => {
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

  return (
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
                {lengthEmail && (
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
                )}
              </>,
            ]}
          >
            {item.pmail_address}
          </List.Item>
        )}
        bordered
      />
    </Card>
  );
};

export default Index;
