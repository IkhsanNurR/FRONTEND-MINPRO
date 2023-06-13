import decodeTokenName from "@/helper/decodedTokenName";
import {
  GetByNameOrEmail,
  editEmail,
} from "@/redux/usersSchema/profile/action/actionReducer";
import { Button, Form, Input, Modal } from "antd";
import { getCookie } from "cookies-next";
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
      onFinish={onFinish}
    >
      <Form.Item
        label="Email"
        name="newEmail"
        rules={[
          {
            required: true,
            message: "Please input a valid email address",
            type: "email",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

const Edit: React.FC<ModalEdit> = ({ open, onCancel, onSubmit, id }) => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<FieldData[]>([
    {
      name: ["newEmail"],
      value: "",
    },
  ]);

  const dispatch = useDispatch();
  const handleCancel = () => {
    onCancel();
    console.log("cancel");
  };

  let { users, refresh }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );

  const token = getCookie("token");
  const [names, setName] = useState<string | null>(null);

  useEffect(() => {
    const decode = decodeTokenName(token);
    setName(decode);

    if (names) {
      dispatch(GetByNameOrEmail(names));
      const email = users?.pmail_address?.find(
        (item) => Number(item.pmail_id) === Number(id)
      );
      setFormValues([
        {
          name: "newEmail",
          value: email?.pmail_address,
        },
      ]);
    }
  }, [token, names, refresh, id]);

  const handleOk = async (values: any) => {
    try {
      await form.validateFields();
      dispatch(editEmail({ payload: values, id }));
      onSubmit();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Modal
      title="Edit Email"
      open={open}
      onCancel={handleCancel}
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

export default Edit;
