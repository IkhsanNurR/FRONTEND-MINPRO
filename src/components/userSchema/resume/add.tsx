import { addResume } from "@/redux/usersSchema/profile/action/actionReducer";
import { Button, Form, Modal, Upload } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

const Add: React.FC<ModalAdd> = ({ open, onCancel, onSubmit, id }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
      const formData = new FormData();

      const resume = form.getFieldValue("resume");
      if (resume && resume.length > 0)
        formData.append("resume", resume[0].originFileObj);
      dispatch(addResume({ payload: formData, id }));
      onSubmit();
      form.resetFields();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Modal
      title="Tambah Resume"
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
        encType="multipart/form-data"
      >
        <Form.Item
          label="Resume"
          name="resume"
          rules={[
            {
              required: true,
              message: "Please Choose File",
            },
          ]}
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
        >
          <Upload maxCount={1} listType="picture-circle">
            <div>Choose File</div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
