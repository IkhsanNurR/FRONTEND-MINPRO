import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, Empty, List, Modal } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Add from "./add";
import { deleteExperience } from "@/redux/usersSchema/profile/action/actionReducer";
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
      title: `Are you sure to delete this experience ${name} ? `,
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteExperience(id));
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
      title="Experiences"
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
      {users?.experiences?.length ? (
        <List
          dataSource={users?.experiences}
          renderItem={(item) => (
            <List.Item
              actions={[
                <>
                  <Button
                    className="flex"
                    onClick={() => showModalEdit(item.usex_id)}
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
                      showDeleteConfirm(item.usex_id, item.usex_title)
                    }
                  >
                    <DeleteOutlined style={{ fontSize: "20px" }} />
                    <span>Delete</span>
                  </Button>
                </>,
              ]}
            >
              <div className="flex flex-col">
                <p className="font-bold text-xl">{item.usex_industry}</p>
                <p>{item.usex_profile_headline}</p>
                <p className="font-bold">{item.usex_company_name}</p>
                <p>
                  {moment(item.usex_start_date).format("MMM YYYY")} -{" "}
                  {moment(item.usex_end_date).format("MMM YYYY")}
                </p>
                <p>{item.city_name}</p>
                <br />
                <div
                  dangerouslySetInnerHTML={{ __html: item.usex_description }}
                />
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
