import decodeTokenName from "@/helper/decodedTokenName";
import showNotification from "@/helper/notification";
import {
  GetByNameOrEmail,
  updateProfile,
} from "@/redux/usersSchema/profile/action/actionReducer";
import { Button, DatePicker, Form, Input, Modal, Upload } from "antd";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FormEdit: React.FC<FormEdit> = ({ onChange, fields, form, onFinish }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      name="global_state"
      autoComplete="off"
      fields={fields}
      onFieldsChange={(_, allFields) => {
        onChange(allFields);
      }}
      encType="multipart/form-data"
      onFinish={onFinish}
    >
      <div className="flex gap-10">
        <div>
          <Form.Item
            name="user_name"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please input username",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="flex gap-5">
            <Form.Item
              name="user_first_name"
              label="Firstname"
              rules={[
                {
                  required: true,
                  message: "Please input firstname",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="user_last_name"
              label="Lastname"
              rules={[
                {
                  required: true,
                  message: "Please input lastname",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <Form.Item
            name="user_birth_date"
            label="Birthdate"
            rules={[
              {
                required: true,
                message: "Please input birthdate",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name="user_photo"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
            rules={[
              {
                required: true,
                message: "Please select image",
              },
            ]}
          >
            <Upload listType="picture-circle" maxCount={1} accept="image/*">
              <div>Photo Profile</div>
            </Upload>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

const Index: React.FC<ModalEdit> = ({ open, onCancel, onSubmit }) => {
  const token = getCookie("token");
  const [name, setName] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<FieldData[]>([
    {
      name: ["user_name"],
      value: "",
    },
    {
      name: ["user_first_name"],
      value: "",
    },
    {
      name: ["user_last_name"],
      value: "",
    },
    {
      name: ["user_birth_date"],
      value: "",
    },
    {
      name: ["user_photo"],
      value: null,
    },
  ]);

  let { users, refresh, msg, status }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );

  useEffect(() => {
    const decode = decodeTokenName(token);
    setName(decode);

    if (name) {
      dispatch(GetByNameOrEmail(name));
      setFormValues([
        {
          name: "user_name",
          value: users?.user_name,
        },
        {
          name: "user_first_name",
          value: users?.user_first_name,
        },
        {
          name: "user_last_name",
          value: users?.user_last_name,
        },
        {
          name: "user_birth_date",
          value:
            users?.user_birth_date !== null
              ? dayjs(users?.user_birth_date)
              : null,
        },
        {
          name: "user_photo",
          value: users?.user_photo
            ? [
                {
                  uid: "-1",
                  name: "image.png",
                  status: "done",
                  url: process.env.imageUser + `/${users?.user_photo}`,
                },
              ]
            : [],
        },
      ]);
    }
  }, [token, name, refresh]);

  const handleCancel = () => {
    onCancel();
  };

  const handleOk = async () => {
    await form.validateFields();
    const formData = new FormData();
    formData.append("user_name", formValues[0].value);
    formData.append("user_first_name", formValues[1].value);
    formData.append("user_last_name", formValues[2].value);

    const birthDate = dayjs(formValues[3].value).format("YYYY-MM-DD");
    formData.append("user_birth_date", birthDate);
    const fileList = form.getFieldValue("user_photo");
    if (fileList && fileList.length > 0) {
      formData.append("user_photo", fileList[0].originFileObj);
    }

    try {
      dispatch(updateProfile({ payload: formData, id: users?.user_entity_id }));
      onSubmit();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (msg && status === 400) {
      showNotification("error", msg);
    } else if (msg && status === 200) {
      showNotification("success", msg);
    }
  }, [refresh]);

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      title="Edit Profile"
      mask={false}
      footer={
        <div>
          <Button onClick={handleCancel}>Batal</Button>
          <Button
            onClick={() => form.submit()}
            className="ant-btn ant-btn-primary"
            style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
          >
            Simpan
          </Button>
        </div>
      }
    >
      <FormEdit
        form={form}
        fields={formValues}
        onChange={(newFields) => setFormValues(newFields)}
        onFinish={handleOk}
      />
    </Modal>
  );
};

export default Index;
