import { getPontyCode } from "@/redux/usersSchema/pontycode/action/actionReducer";
import { addPhone } from "@/redux/usersSchema/profile/action/actionReducer";
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddPhone: React.FC<ModalAdd> = ({ open, onCancel, onSubmit, id }) => {
  const [form] = Form.useForm();

  const [formValues, setFormValues] = useState<Phones>({
    uspo_ponty_code: "",
    uspo_number: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, uspo_number: event.target.value });
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  const handleOk = async (values: any) => {
    try {
      await form.validateFields();
      dispatch(addPhone({ payload: values, id }));
      onSubmit();
      form.resetFields();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const dispatch = useDispatch();
  let { pontycode, refresh }: pontyCode = useSelector(
    (state: any) => state.pontycodeReducers
  );

  useEffect(() => {
    dispatch(getPontyCode());
  }, [refresh]);

  return (
    <Modal
      title="Tambah Phone"
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
        <div className="flex flex-row gap-20">
          <Form.Item
            label="Phone"
            name="newPhone"
            rules={[
              {
                required: true,
                message: "Please input number phone",
              },
            ]}
          >
            <Input value={formValues.uspo_number} onChange={handleChange} />
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
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              style={{ width: "200px" }}
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default AddPhone;
