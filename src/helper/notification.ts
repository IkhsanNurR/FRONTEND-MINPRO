import { notification } from "antd";
import React from "react";

type NotificationType = "success" | "info" | "warning" | "error";
const showNotification = (
  type: NotificationType,
  message: string | undefined,
  description?: React.ReactNode
) => {
  notification[type]({
    message: message,
    description: description,
    duration: 3,
  });
};

export default showNotification;
