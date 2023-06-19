import { addEducation } from "@/redux/usersSchema/profile/action/actionReducer";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

const Add: React.FC<ModalAdd> = ({ open, onCancel, onSubmit, id }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  const handleOk = async (values: any) => {
    try {
      await form.validateFields();
      const data = {
        newSchool: values.newSchool,
        newDegree: values.newDegree,
        newFieldStudy: values.newFieldStudy,
        newGrade: values.newGrade,
        newStartDate: values.Date[0],
        newEndDate: values.Date[1],
        newActivitis: values.newActivitis,
        newDescription: values.newDescription,
      };
      dispatch(addEducation({ payload: data, id }));
      onSubmit();
      form.resetFields();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Modal
      title="Tambah Education"
      open={open}
      style={{ top: 10 }}
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
          label="School"
          name="newSchool"
          rules={[
            {
              required: true,
              message: "Please input your scholl",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Degree"
          name="newDegree"
          rules={[
            {
              required: true,
              message: "Please input your degree",
            },
          ]}
        >
          <Select
            options={[
              {
                value: "Bachelor",
                label: "Bachelor",
              },
              {
                value: "Diploma",
                label: "Diploma",
              },
              {
                value: "PHD",
                label: "PHD",
              },
              {
                value: "High School",
                label: "High School",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Field Study"
          name="newFieldStudy"
          rules={[
            {
              required: true,
              message: "Please input your field study",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Grade"
          name="newGrade"
          rules={[
            {
              required: true,
              message: "Please input your grade",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Start" name="Date">
          <DatePicker.RangePicker />
        </Form.Item>
        <Form.Item
          label="Activies"
          name="newActivitis"
          rules={[
            {
              required: true,
              message: "Please input your activities",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Descriptions"
          name="newDescription"
          rules={[
            {
              required: true,
              message: "Please input your activities",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
