import React, { useEffect, useState } from "react";
import { getCity } from "@/redux/masterSchema/city/action/actionReducer";
import { addExperience } from "@/redux/usersSchema/profile/action/actionReducer";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import TextEditor from "@/components/shared/textEditor";
import moment, { Moment } from "moment";
import dayjs, { Dayjs } from "dayjs";

const Add: React.FC<ModalAdd> = ({ open, onCancel, onSubmit, id }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  let { city, refresh }: City = useSelector((state: any) => state.cityReducers);

  useEffect(() => {
    dispatch(getCity());
  }, [refresh]);

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  const handleOk = async (values: any) => {
    try {
      await form.validateFields();
      dispatch(
        addExperience({
          payload: values,
          id,
        })
      );
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

  // const [rangeValue, setRangeValue] = useState<[Dayjs | null, Dayjs | null]>([
  //   dayjs("2022-01", "YYYY-MM"),
  //   dayjs("2022-10", "YYYY-MM"),
  // ]);

  // const handleChangeDate = (dates: any) => {
  //   setRangeValue(dates);
  // };

  return (
    <Modal
      title="Tambah Experience"
      open={open}
      onCancel={handleCancel}
      style={{ top: 10 }}
      maskClosable={false}
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
        <Form.Item label="Start" name="Start">
          <DatePicker.RangePicker
            format="YYYY-MM"
            onChange={handleChangeDate}
            picker="month"
          />
        </Form.Item>
        <Form.Item name="newStartDate" hidden />
        <Form.Item name="newEndDate" hidden />
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
    </Modal>
  );
};

export default Add;
