import { addEducation } from "@/redux/usersSchema/profile/action/actionReducer";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
      dispatch(addEducation({ payload: values, id }));
      onSubmit();
      form.resetFields();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleChangeDate = (
    dates: any | null,
    dateStrings: [string, string]
  ) => {
    form.setFieldsValue({
      newStartDate: dateStrings[0],
      newEndDate: dateStrings[1],
    });
  };

  return (
    <Modal
      title="Tambah Education"
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
        <Form.Item label="Start">
          <DatePicker.RangePicker onChange={handleChangeDate} picker="month" />
        </Form.Item>
        <Form.Item name="newStartDate" hidden />
        <Form.Item name="newEndDate" hidden />
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
