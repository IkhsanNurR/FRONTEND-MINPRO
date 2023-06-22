import { MyPage } from "@/components/types";
import showNotification from "@/helper/notification";
import { Button } from "antd";

const Home: MyPage = () => {
  const handleNotification = () => {
    showNotification("error", "Info message");
  };
  return (
    <div>
      <Button onClick={handleNotification}>Open Notification</Button>
    </div>
  );
};

Home.Layout = "User";
export default Home;
