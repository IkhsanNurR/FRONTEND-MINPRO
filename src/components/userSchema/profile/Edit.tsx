import decodeTokenName from "@/helper/decodedTokenName";
import {
  GetByNameOrEmail,
  updateProfile,
} from "@/redux/usersSchema/profile/action/actionReducer";
import { Button, DatePicker, Form, Input, Modal, Upload } from "antd";
import axios from "axios";
import { getCookie } from "cookies-next";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FormEdit: React.FC<FormEdit> = ({ onChange, fields, form }) => {
  const dateFormat = "YYYY/MM/DD";

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
            <DatePicker
              format={dateFormat}
              value={form.getFieldValue("user_birth_date")}
            />
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

const Index: React.FC<EditProfile> = ({ open, onCancel, onSubmit }) => {
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

  let { users, refresh } = useSelector(
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
          value: users.user_name,
        },
        {
          name: "user_first_name",
          value: users.user_first_name,
        },
        {
          name: "user_last_name",
          value: users.user_last_name,
        },
        {
          name: "user_birth_date",
          value: moment(users.user_birth_date),
        },
        {
          name: "user_photo",
          value: null,
        },
      ]);
    }
  }, [token, name, refresh]);

  const handleOk = async () => {
    form.validateFields().then(async () => {
      const formData = new FormData();
      formData.append("user_name", formValues[0].value);
      formData.append("user_first_name", formValues[1].value);
      formData.append("user_last_name", formValues[2].value);
      formData.append("user_birth_date", formValues[3].value);
      const fileList = form.getFieldValue("user_photo");
      if (fileList && fileList.length > 0) {
        formData.append("user_photo", fileList[0].originFileObj);
      }

      try {
        dispatch(
          updateProfile({ payload: formData, id: users.user_entity_id })
        );
        onSubmit();
      } catch (error: any) {
        console.log(error.message);
      }
    });
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields(["user_photo"]);
  };

  return (
    <Modal
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      title="Edit Profile"
      mask={false}
      footer={
        <div>
          <Button onClick={handleCancel}>Batal</Button>
          <Button
            onClick={handleOk}
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
      />
    </Modal>
  );
};

export default Index;
