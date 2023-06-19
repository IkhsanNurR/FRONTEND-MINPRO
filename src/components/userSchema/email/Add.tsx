import { addEmail } from "@/redux/usersSchema/profile/action/actionReducer";
import { Button, Form, Input, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Add: React.FC<ModalAdd> = ({ open, onCancel, onSubmit, id }) => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<Users>({
    user_entity_id: "",
    pmail_address: undefined,
  });
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: [{ pmail_id: "", pmail_address: value }],
    });
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  const handleOk = async (values: any) => {
    try {
      await form.validateFields();
      dispatch(addEmail({ payload: values, id: id }));
      onSubmit();
      form.resetFields();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Modal
        title="Tambah Email"
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
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={handleOk}
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
            <Input
              value={formValues.pmail_address?.[0].pmail_address}
              onChange={handleChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Add;
