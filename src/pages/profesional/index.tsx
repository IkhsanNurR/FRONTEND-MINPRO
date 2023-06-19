import { MyPage } from "@/components/types";
import decodeTokenRole from "@/helper/decodeTokenRole";
import decodeTokenName from "@/helper/decodedTokenName";
import { getJob } from "@/redux/jobhireSchema/action/actionReducer";
import { GetByNameOrEmail } from "@/redux/usersSchema/profile/action/actionReducer";
import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  FrownOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Button, Card, Image, List, Progress, notification } from "antd";
import { CookieValueTypes, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Index: MyPage = () => {
  const router = useRouter();
  const [haveToken, setHaveToken] = useState<CookieValueTypes>("");
  const [name, setName] = useState<string | null>(null);

  const dispatch = useDispatch();

  let { job_post }: Job = useSelector((state: any) => state.jobReducers);
  let { users, refresh }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );

  const token = getCookie("token");
  useEffect(() => {
    const decode = decodeTokenName(token);
    setName(decode);

    if (name) dispatch(GetByNameOrEmail(name));

    // const decode = decodeTokenRole(haveToken);
    // console.log(decode?.role, "p");

    setHaveToken(token);

    dispatch(getJob());
  }, [token, name, refresh]);

  type NotificationType = "success" | "info" | "warning" | "error";
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    msg: string,
    completeness?: number
  ) => {
    let message = "";
    let description = null;

    switch (type) {
      case "success":
        message = "Success Notification";
        description = "This is a success notification.";
        break;
      case "info":
        message = "Info Notification";
        description = "This is an info notification.";
        break;
      case "warning":
        message = msg;
        break;
      case "error":
        message = msg;
        break;
      default:
        return null;
    }

    api[type]({
      message,
      description: (
        <>
          {description}
          {completeness && (
            <Progress type="circle" percent={completeness} size={40} />
          )}
        </>
      ),
      duration: 2,
    });
  };

  const handleClick = () => {
    const pathname = router.pathname.substring(1);
    if (!haveToken) {
      openNotificationWithIcon("error", "Silahkan Login");

      setTimeout(() => {
        router.push({
          pathname: "/external/signup",
          query: { url: pathname },
        });
      }, 2000);
    } else if (haveToken && completeness !== 100) {
      openNotificationWithIcon(
        "warning",
        "Silahkan Lengkapi Data Diri Anda",
        completeness
      );
    } else {
      console.log("oke");
    }
  };

  function calculateDataCompleteness(user: Users): number {
    const requiredAttributes: (keyof Users)[] = [
      "user_first_name",
      "user_last_name",
      "user_birth_date",
      "user_photo",
      "phone",
      "education",
      "resume",
    ];
    const totalAttributes = requiredAttributes.length;
    let completedAttributes = 0;

    requiredAttributes.forEach((attribute) => {
      if (user.hasOwnProperty(attribute) && user[attribute]) {
        completedAttributes++;
      }
    });

    const completenessPercentage =
      (completedAttributes / totalAttributes) * 100;
    return Number(completenessPercentage.toFixed());
  }

  const completeness = calculateDataCompleteness(users);

  return (
    <div>
      {contextHolder}
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        size="small"
        dataSource={job_post}
        renderItem={(item) => (
          <List.Item key={item.jopo_entity_id}>
            <Card
              style={{ width: 200 }}
              cover={
                <Image src={process.env.imageJob + `/${item.jopho_filename}`} />
              }
              title={item.jopo_title}
              actions={[
                <div className="flex flex-col justify-center">
                  <Button type="link" onClick={handleClick}>
                    <CheckOutlined />
                    <span>Apply</span>
                  </Button>
                </div>,
              ]}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

Index.Layout = "User";
export default Index;
