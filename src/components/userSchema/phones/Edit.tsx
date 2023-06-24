import decodeTokenName from "@/helper/decodedTokenName";
import { getPontyCode } from "@/redux/usersSchema/pontycode/action/actionReducer";
import {
  GetByNameOrEmail,
  editPhone,
} from "@/redux/usersSchema/profile/action/actionReducer";
import { Button, Form, Input, Modal, Select } from "antd";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FormEdit: React.FC<FormEdit> = ({ onChange, fields, form, onFinish }) => {
  const dispatch = useDispatch();
  let { pontycode, refresh }: pontyCode = useSelector(
    (state: any) => state.pontycodeReducers
  );

  useEffect(() => {
    dispatch(getPontyCode());
  }, [refresh]);

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
      <div className="flex flex-row gap-2">
        <Form.Item
          label="Phone"
          name="newPhone"
          rules={[
            {
              required: true,
              message: "Please input phone number",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Type"
          name="newPontyCode"
          rules={[
            {
              required: true,
              message: "Please select type phone",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select a type"
            optionFilterProp="children"
            //   onChange={onchangeSelect}
            //   onSearch={onSearch}
            options={pontycode.map((item) => ({
              value: item.ponty_code,
              label: item.ponty_code,
            }))}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
      </div>
    </Form>
  );
};

const EditPhone: React.FC<ModalEdit> = ({
  open,
  onCancel,
  onSubmit,
  phonenumber,
  id,
}) => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<FieldData[]>([
    {
      name: ["newPhone"],
      value: "",
    },
    {
      name: ["newPontyCode"],
      value: "",
    },
  ]);

  const dispatch = useDispatch();
  let { users }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );

  const token = getCookie("token");
  const [names, setName] = useState<string | null>(null);

  useEffect(() => {
    const decode = decodeTokenName(token);
    setName(decode);

    if (names) {
      dispatch(GetByNameOrEmail(names));
      const phone = users?.phone?.find(
        (item) => item.uspo_number === phonenumber
      );
      setFormValues([
        {
          name: "newPhone",
          value: phone?.uspo_number,
        },
        {
          name: "newPontyCode",
          value: phone?.uspo_ponty_code,
        },
      ]);
    }
  }, [token, names, phonenumber]);

  const handleCancel = () => {
    onCancel();
  };

  const handleOk = async (values: any) => {
    try {
      await form.validateFields();
      dispatch(editPhone({ payload: values, id, phonenumber }));
      onSubmit();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Modal
      title="Edit Phone"
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

export default EditPhone;
