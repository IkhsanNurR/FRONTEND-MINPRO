import Content1 from "@/components/shared/content1";
import { MyPage } from "@/components/types";

const Users: MyPage = () => {
  return (
    <div>
      <Content1 title="USERS " fungsi1={() => null} namafungsi1="EAAAA">
        <h1>Aji ganteng2</h1>
      </Content1>
    </div>
  );
};

Users.Layout = "Admin";
export default Users;
