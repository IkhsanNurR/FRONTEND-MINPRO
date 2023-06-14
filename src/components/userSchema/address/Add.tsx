import { getAddressType } from "@/redux/masterSchema/addresstype/action/actionReducer";
import { getCity } from "@/redux/masterSchema/city/action/actionReducer";
import { addAddress } from "@/redux/usersSchema/profile/action/actionReducer";
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Add: React.FC<ModalAdd> = ({ open, onCancel, onSubmit, id }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  let { city, refresh }: City = useSelector((state: any) => state.cityReducers);

  let { addressType }: addressType = useSelector(
    (state: any) => state.addreetypeReducers
  );

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  const handleOk = async (values: any) => {
    try {
      await form.validateFields();
      dispatch(addAddress({ payload: values, id }));
      onSubmit();
      form.resetFields();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    dispatch(getCity());
    dispatch(getAddressType());
  }, [refresh]);

  return (
    <Modal
      title="Tambah Address"
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
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
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
    </Modal>
  );
};

export default Add;
