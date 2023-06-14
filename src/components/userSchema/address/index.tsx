import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, List, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Add from "./Add";
import { deleteAddress } from "@/redux/usersSchema/profile/action/actionReducer";
import Edit from "./Edit";

const Index: React.FC = () => {
  let { users }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );

  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [idEdit, setIdEdit] = useState<number>();
  const { confirm } = Modal;
  const dispatch = useDispatch();

  const showModalAdd = () => {
    setModalAdd(!modalAdd);
  };

  const showDeleteConfirmAddress = (id: number, name: string) => {
    confirm({
      title: `Are you sure to delete this Address ${name} ? `,
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteAddress(id));
      },
      onCancel() {
        console.log("cancel");
      },
    });
  };

  const showModalEdit = (id: any) => {
    setModalEdit(!modalEdit);
    setIdEdit(id);
  };

  const handleCancelEdit = () => {
    setModalEdit(!modalEdit);
  };

  const handleSubmitEdit = () => {
    setModalEdit(!modalEdit);
  };

  return (
    <Card
      title="Address"
      extra={
        <>
          <Button className="flex" onClick={showModalAdd}>
            <PlusCircleOutlined style={{ fontSize: "20px" }} />
            <span>Add</span>
          </Button>
          <Add
            open={modalAdd}
            onCancel={showModalAdd}
            onSubmit={showModalAdd}
            id={users?.user_entity_id}
          />
        </>
      }
    >
      <List
        dataSource={users?.address}
        renderItem={(item) => (
          <List.Item
            actions={[
              <>
                <Button
                  className="flex"
                  onClick={() => showModalEdit(item.etad_addr_id)}
                >
                  <EditOutlined style={{ fontSize: "20px" }} />
                  <span>Edit</span>
                </Button>
                <Edit
                  open={modalEdit}
                  onCancel={handleCancelEdit}
                  onSubmit={handleSubmitEdit}
                  id={idEdit}
                />
              </>,
              <>
                <Button
                  className="flex"
                  onClick={() =>
                    showDeleteConfirmAddress(
                      Number(item.etad_addr_id),
                      item.addr_line1
                    )
                  }
                >
                  <DeleteOutlined style={{ fontSize: "20px" }} />
                  <span>Delete {item.etad_addr_id}</span>
                </Button>
              </>,
            ]}
          >
            <div className="flex flex-col capitalize">
              <p> address 1 : {item.addr_line1}</p>
              {item.addr_line2 !== null ? (
                <p> address 2 : {item.addr_line2}</p>
              ) : null}
              <p> postal code : {item.addr_postal_code}</p>
              <p> type : ({item.address_type})</p>
              <p>city : {item.city}</p>
            </div>
          </List.Item>
        )}
        bordered
      />
    </Card>
  );
};

export default Index;
