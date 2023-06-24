import { editEducation } from "@/redux/usersSchema/profile/action/actionReducer";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FormEdit: React.FC<FormEdit> = ({ form, onChange, onFinish, fields }) => {
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
  );
};

const Edit: React.FC<ModalEdit> = ({ open, onCancel, onSubmit, id }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState<FieldData[]>([
    {
      name: "newSchool",
      value: "",
    },
    {
      name: "newDegree",
      value: "",
    },
    {
      name: "newFieldStudy",
      value: "",
    },
    {
      name: "newGrade",
      value: "",
    },
    {
      name: "start",
      value: "",
    },
    {
      name: "newActivitis",
      value: "",
    },
    {
      name: "newDescription",
      value: "",
    },
  ]);

  let { users, refresh }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );

  useEffect(() => {
    const education = users?.education?.find((item) => item.usdu_id === id);
    setFormValues([
      {
        name: "newSchool",
        value: education?.usdu_school,
      },
      {
        name: "newDegree",
        value: education?.usdu_degree,
      },
      {
        name: "newFieldStudy",
        value: education?.usdu_field_study,
      },
      {
        name: "newGrade",
        value: education?.usdu_grade,
      },
      {
        name: "Date",
        value: [
          dayjs(education?.usdu_start_date),
          dayjs(education?.usdu_end_date),
        ],
      },
      {
        name: "newActivitis",
        value: education?.usdu_activities,
      },
      {
        name: "newDescription",
        value: education?.usdu_description,
      },
    ]);
  }, [refresh, id]);

  const handleCancel = () => {
    onCancel();
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
      dispatch(editEducation({ payload: data, id }));
      onSubmit();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Modal
      title="Edit Education"
      open={open}
      onCancel={handleCancel}
      style={{ top: 10 }}
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
