import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextEditor from "@/components/shared/textEditor";
import dayjs from "dayjs";
import { editExperience } from "@/redux/usersSchema/profile/action/actionReducer";
import { reqGetCity } from "@/redux/MasterBaruSchema/actions/actionReducer";

const FormEdit: React.FC<FormEdit> = ({ form, onChange, onFinish, fields }) => {
  const dispatch = useDispatch();
  let { city, refreshCity }: City = useSelector(
    (state: any) => state.cityReducer
  );

  useEffect(() => {
    dispatch(reqGetCity());
  }, [refreshCity]);

  return (
    <Form
      form={form}
      layout="vertical"
      name="global_state"
      autoComplete="off"
      fields={fields}
      onFieldsChange={(_, allFields) => onChange(allFields)}
      onFinish={onFinish}
    >
      <Form.Item
        label="Title"
        name="newTitle"
        rules={[
          {
            required: true,
            message: "Please input title",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Headline"
        name="newHeadline"
        rules={[
          {
            required: true,
            message: "Please input headline",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Company"
        name="newCompany"
        rules={[
          {
            required: true,
            message: "Please input company",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="City"
        name="newCity"
        rules={[
          {
            required: true,
            message: "Please select your city",
          },
        ]}
      >
        <Select
          showSearch
          placeholder="City"
          options={city?.map((item) => ({
            value: item.city_id,
            label: item.city_name,
          }))}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
      </Form.Item>
      <Form.Item label="Start" name="Date">
        <DatePicker.RangePicker format="YYYY-MM" picker="month" />
      </Form.Item>
      <Form.Item
        name="newIndustry"
        label="Industry"
        rules={[
          {
            required: true,
            message: "Please input industy",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="newEmployeType"
        label="Employment Type"
        rules={[
          {
            required: true,
            message: "Please select employment type",
          },
        ]}
      >
        <Select
          options={[
            {
              value: "fulltime",
              label: "Full-Time",
            },
            {
              value: "freelance",
              label: "Freelance",
            },
            {
              value: "contract",
              label: "Contract",
            },
            {
              value: "remote",
              label: "Remote",
            },
          ]}
        />
      </Form.Item>
      <Form.Item
        name="newDescription"
        label="Description"
        rules={[
          {
            required: true,
            message: "Please input description",
          },
        ]}
      >
        {/* @ts-ignore */}
        <TextEditor />
      </Form.Item>
      <Form.Item
        name="newExperienceType"
        label="Experience Type"
        rules={[
          {
            required: true,
            message: "Please select employment type",
          },
        ]}
      >
        <Select
          options={[
            {
              value: "company",
              label: "Company",
            },
            {
              value: "certified",
              label: "Certified",
            },
            {
              value: "voluntering",
              label: "Voluntering",
            },
            {
              value: "organization",
              label: "Organization",
            },
            {
              value: "reward",
              label: "Reward",
            },
          ]}
        />
      </Form.Item>
    </Form>
  );
};

const Edit: React.FC<ModalEdit> = ({ open, onCancel, onSubmit, id }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState<FieldData[]>([
    {
      name: "newTitle",
      value: "",
    },
    {
      name: "newHeadline",
      value: "",
    },
    {
      name: "newCompany",
      value: "",
    },
    {
      name: "newCity",
      value: "",
    },
    {
      name: "Date",
      value: "",
    },
    {
      name: "newIndustry",
      value: "",
    },
    {
      name: "newEmployeType",
      value: "",
    },
    {
      name: "newDescription",
      value: "",
    },
    {
      name: "newExperienceType",
      value: "",
    },
  ]);

  let { users, refresh }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );

  useEffect(() => {
    const experience = users?.experiences?.find((item) => item.usex_id === id);
    setFormValues([
      {
        name: "newTitle",
        value: experience?.usex_title,
      },
      {
        name: "newHeadline",
        value: experience?.usex_profile_headline,
      },
      {
        name: "newCompany",
        value: experience?.usex_company_name,
      },
      {
        name: "newCity",
        value: experience?.usex_city_id,
      },
      {
        name: "Date",
        value: [
          dayjs(experience?.usex_start_date),
          dayjs(experience?.usex_end_date),
        ],
      },
      {
        name: "newIndustry",
        value: experience?.usex_industry,
      },
      {
        name: "newEmployeType",
        value: experience?.usex_employment_type,
      },
      {
        name: "newDescription",
        value: experience?.usex_description,
      },
      {
        name: "newExperienceType",
        value: experience?.usex_experience_type,
      },
    ]);
  }, [id, refresh]);

  const handleCancel = () => {
    onCancel();
  };

  const handleOk = async (values: any) => {
    try {
      await form.validateFields();
      const data = {
        newTitle: values.newTitle,
        newHeadline: values.newHeadline,
        newCompany: values.newCompany,
        newCity: values.newCity,
        newStartDate: values.Date[0],
        newEndDate: values.Date[1],
        newIndustry: values.newIndustry,
        newEmployeType: values.newEmployeType,
        newDescription: values.newDescription,
        newExperienceType: values.newExperienceType,
      };
      dispatch(editExperience({ payload: data, id }));
      onSubmit();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Modal
      style={{ top: 10 }}
      title="Edit Experience"
      mask={false}
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
        onChange={(newValues) => setFormValues(newValues)}
        onFinish={handleOk}
      />
    </Modal>
  );
};

export default Edit;
