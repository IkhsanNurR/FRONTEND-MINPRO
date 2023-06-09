import Content from "@/components/shared/content";
import { MyPage } from "@/components/types";

const Users: MyPage = () => {
  return (
    <div>
      <Content title="USERS ">
        <h1>Aji ganteng</h1>
      </Content>
    </div>
  );
};

Users.Layout = "Admin";
export default Users;
