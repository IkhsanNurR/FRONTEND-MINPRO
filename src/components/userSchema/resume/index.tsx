import {
  DeleteOutlined,
  ExclamationCircleFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, Empty, List, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Add from "./add";
import { deleteResume } from "@/redux/usersSchema/profile/action/actionReducer";

const Index: React.FC = () => {
  let { users }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );

  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const { confirm } = Modal;
  const dispatch = useDispatch();

  const showDeleteConfirm = (id: number) => {
    confirm({
      title: `Are you sure to delete this resume ? `,
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteResume(id));
      },
    });
  };

  const showModalAdd = () => {
    setModalAdd(!modalAdd);
  };

  return (
    <Card
      title="Resume"
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
      {users?.resume?.length ? (
        <List
          bordered
          dataSource={users?.resume}
          renderItem={(item) => (
            <List.Item
              actions={[
                <>
                  <Button
                    className="flex"
                    onClick={() => showDeleteConfirm(item.usme_id)}
                  >
                    <DeleteOutlined style={{ fontSize: "20px" }} />
                    <span>Delete</span>
                  </Button>
                </>,
              ]}
            >
              {item.usme_filelink}
            </List.Item>
          )}
        />
      ) : (
        <Empty description="No Data" />
      )}
    </Card>
  );
};

export default Index;
