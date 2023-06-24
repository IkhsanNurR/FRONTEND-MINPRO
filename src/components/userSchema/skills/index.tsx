import {
  DeleteOutlined,
  ExclamationCircleFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, Empty, List, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Add from "./add";
import { deleteSkill } from "@/redux/usersSchema/profile/action/actionReducer";
import showNotification from "@/helper/notification";

const Index: React.FC = () => {
  let { users, msg }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );

  useEffect(() => {
    if (msg) {
      showNotification("success", msg);
    }
  }, []);

  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const { confirm } = Modal;
  const dispatch = useDispatch();

  const showModalAdd = () => {
    setModalAdd(!modalAdd);
  };

  const showDeleteConfirm = (id: number, name: string) => {
    confirm({
      title: `Are you sure to delete this skill ${name} ? `,
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteSkill(id));
      },
    });
  };

  return (
    <Card
      title="Skills"
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
      {users?.skill?.length ? (
        <List
          dataSource={users?.skill}
          renderItem={(item) => (
            <List.Item
              actions={[
                <>
                  <Button
                    className="flex"
                    onClick={() =>
                      showDeleteConfirm(item.uski_id, item.uski_skty_name)
                    }
                  >
                    <DeleteOutlined style={{ fontSize: "20px" }} />
                    <span>Delete</span>
                  </Button>
                </>,
              ]}
            >
              <p className="capitalize">{item.uski_skty_name}</p>
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
