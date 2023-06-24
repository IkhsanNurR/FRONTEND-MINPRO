import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, Empty, List, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Add from "./add";
import { deleteEducation } from "@/redux/usersSchema/profile/action/actionReducer";
import Edit from "./edit";

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

  const showDeleteConfirm = (id: number, name: string) => {
    confirm({
      title: `Are you sure to delete this education ${name} ? `,
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteEducation(id));
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
      title="Educations"
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
      {users?.education?.length ? (
        <List
          dataSource={users?.education}
          renderItem={(item) => (
            <List.Item
              actions={[
                <>
                  <Button
                    className="flex"
                    onClick={() => showModalEdit(item.usdu_id)}
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
                      showDeleteConfirm(item.usdu_id, item.usdu_school)
                    }
                  >
                    <DeleteOutlined style={{ fontSize: "20px" }} />
                    <span>Delete</span>
                  </Button>
                </>,
              ]}
            >
              <div className="flex flex-col">
                <p>School : {item.usdu_school}</p>
                <p>Degree : {item.usdu_degree}</p>
                <p>Field Study : {item.usdu_field_study}</p>
                <p>Grade(IPK) : {item.usdu_grade}</p>
                <p>
                  Year : {new Date(item.usdu_start_date).getFullYear()} until{" "}
                  {new Date(item.usdu_end_date).getFullYear()}
                </p>
                <p>Activity : {item.usdu_activities}</p>
                <p>Description : {item.usdu_description}</p>
              </div>
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
