import { reqSkillType } from "@/redux/MasterBaruSchema/actions/actionReducer";
import { addSkill } from "@/redux/usersSchema/profile/action/actionReducer";
import { Button, Form, Modal, Select } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Add: React.FC<ModalAdd> = ({ open, onCancel, onSubmit, id }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  let { skillType, refreshSkillType }: SkillType = useSelector(
    (state: any) => state.skillTypeReducer
  );

  let { users }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );

  const skill = users?.skill?.map((item) => item.uski_skty_name);

  useEffect(() => {
    dispatch(reqSkillType());
  }, [refreshSkillType]);

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  const handleOk = async (values: any) => {
    try {
      await form.validateFields();
      dispatch(addSkill({ payload: values, id }));
      onSubmit();
      form.resetFields();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Modal
      title="Tambah Skills"
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
          label="Skill"
          name="newSkill"
          rules={[
            {
              required: true,
              message: "Please select skill",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Skill"
            optionFilterProp="children"
            options={skillType
              ?.filter((item) => !skill?.includes(item.skty_name))
              .map((item) => ({
                value: item.skty_name,
                label: item.skty_name,
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
