import React from "react";
import Content2 from "../../components/shared/content2";
import { MyPage } from "@/components/types";

const Index: MyPage = () => {
  return (
    <>
      <Content2
        title="COBA"
        fungsi1={() => null}
        namafungsi1="TEST1"
        fungsi2={() => null}
        namafungsi2="TEST2"
      >
        <div className="mt-16 -ml-6 ">
          <h1>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
            delectus beatae id repellendus exercitationem neque facere illum.
            Natus, totam fuga nobis eligendi vero nihil provident expedita
            impedit suscipit sed quia rerum magni sequi nostrum. Porro magni
            veniam voluptates rerum, officia mollitia, tempore earum blanditiis
            quisquam velit officiis harum, at corrupti autem ipsum consequuntur
            culpa! Obcaecati ipsa, nemo quam quo fugiat impedit neque, tempora
            quod corporis accusantium nulla a aliquam totam qui eaque quis
            ratione, adipisci repudiandae eius illum porro placeat ullam? Esse
            quibusdam consectetur cum aliquid odio nihil nisi, totam nulla
            reiciendis, labore natus ex non blanditiis reprehenderit! Corrupti,
            perferendis?
          </h1>
        </div>
      </Content2>
    </>
  );
};

Index.Layout = "Admin";
export default Index;
