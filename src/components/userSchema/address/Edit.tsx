import decodeTokenName from "@/helper/decodedTokenName";
import { getAddressType } from "@/redux/masterSchema/addresstype/action/actionReducer";
import { getCity } from "@/redux/masterSchema/city/action/actionReducer";
import {
  GetByNameOrEmail,
  editAddress,
} from "@/redux/usersSchema/profile/action/actionReducer";
import { Button, Form, Input, Modal, Select } from "antd";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FormEdit: React.FC<FormEdit> = ({ form, onChange, fields, onFinish }) => {
  const dispatch = useDispatch();
  let { city, refresh }: City = useSelector((state: any) => state.cityReducers);

  let { addressType }: addressType = useSelector(
    (state: any) => state.addreetypeReducers
  );

  useEffect(() => {
    dispatch(getCity());
    dispatch(getAddressType());
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
      <Form.Item
        label="Address 1"
        name="newAddressLine1"
        rules={[
          {
            required: true,
            message: "Please input your address",
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Address 2" name="newAddressLine2">
        <Input.TextArea />
      </Form.Item>
      <div className="flex justify-between">
        <Form.Item
          label="Postal Code"
          name="newAddressPostalCode"
          rules={[
            {
              required: true,
              message: "Please input your postal code",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="City"
          name="newAddressCityId"
          rules={[
            {
              required: true,
              message: "Please input your city",
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
            style={{ width: "200px" }}
          />
        </Form.Item>
      </div>
      <Form.Item
        label="Address Type"
        name="newAddressTypeId"
        rules={[
          {
            required: true,
            message: "Please input your address type",
          },
        ]}
      >
        <Select
          showSearch
          placeholder="Address Type"
          optionFilterProp="children"
          options={addressType?.map((item) => ({
            value: item.adty_id,
            label: item.adty_name,
          }))}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
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
      name: ["newAddressLine1"],
      value: "",
    },
    {
      name: ["newAddressLine2"],
      value: "",
    },
    {
      name: ["newAddressPostalCode"],
      value: "",
    },
    {
      name: ["newAddressCityId"],
      value: "",
    },
    {
      name: ["newAddressTypeId"],
      value: "",
    },
  ]);

  const handleCancel = () => {
    onCancel();
  };

  const handleOk = async (values: any) => {
    try {
      await form.validateFields();
      dispatch(editAddress({ payload: values, id }));
      onSubmit();
    } catch (error: any) {
      console.log(error.message);
    }
    // console.log("oke", values);
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
      const address = users?.address?.find(
        (item) => Number(item.etad_addr_id) === Number(id)
      );
      setFormValues([
        {
          name: "newAddressLine1",
          value: address?.addr_line1,
        },
        {
          name: "newAddressLine2",
          value: address?.addr_line2,
        },
        {
          name: "newAddressPostalCode",
          value: address?.addr_postal_code,
        },
        {
          name: "newAddressCityId",
          value: address?.city_id,
        },
        {
          name: "newAddressTypeId",
          value: address?.address_type_id,
        },
      ]);
    }
  }, [token, names, refresh, id]);

  return (
    <Modal
      title="Edit Address"
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
        onFinish={handleOk}
        fields={formValues}
        onChange={(newFields) => setFormValues(newFields)}
      />
    </Modal>
  );
};

export default Edit;
