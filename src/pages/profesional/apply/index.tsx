import { MyPage } from "@/components/types";
import decodeTokenName from "@/helper/decodedTokenName";
import { GetByNameOrEmail } from "@/redux/usersSchema/profile/action/actionReducer";
import { UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select, Upload } from "antd";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Index: MyPage = () => {
  const [form] = Form.useForm();
  const token = getCookie("token");
  const [name, setName] = useState<string | null>(null);
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    console.log("object", values);
  };

  const onChange = (date: any, dateString: string) => {
    form.setFieldsValue({
      birth: dayjs(dateString),
    });
  };

  let { users, refresh }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );

  useEffect(() => {
    const decode = decodeTokenName(token);
    setName(decode);

    if (name) dispatch(GetByNameOrEmail(name));
  }, [token, name, refresh]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Profesional Application Process {users.user_name}
      </h1>
      <Form
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        form={form}
      >
        <div className="grid grid-cols-3 gap-4">
          <div />
          <div>
            <Form.Item name="fullname">
              <Input placeholder="fullname" size="small" />
            </Form.Item>
            <Form.Item name="birth">
              <DatePicker
                size="small"
                onChange={onChange}
                format="YYYY-MM-DD"
              />
            </Form.Item>
            <Form.Item
              name="pendidikan"
              rules={[
                {
                  required: true,
                  message: "Please input your degree",
                },
              ]}
            >
              <Select
                placeholder="pendidikan"
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
            <Form.Item name="school">
              <Input size="small" placeholder="Sekolah / University" />
            </Form.Item>
            <Form.Item name="jurusan">
              <Input size="small" placeholder="Jurusan" />
            </Form.Item>
            <Form.Item name="HP">
              <Input size="small" placeholder="HP Number" />
            </Form.Item>
            <Form.Item name="resume">
              <Upload accept=".pdf">
                <Button icon={<UploadOutlined />}>Choose File PDF</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="default" htmlType="reset" style={{ width: "50%" }}>
                Cancel
              </Button>
              <Button htmlType="submit" style={{ width: "50%" }}>
                Submit
              </Button>
            </Form.Item>
          </div>
          <Form.Item
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
            rules={[
              {
                required: true,
                message: "Please select image",
              },
            ]}
          >
            <Upload
              name="avatar"
              listType="picture-circle"
              maxCount={1}
              accept="image/*"
            >
              <div>Photo</div>
            </Upload>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

Index.Layout = "User";
export default Index;
