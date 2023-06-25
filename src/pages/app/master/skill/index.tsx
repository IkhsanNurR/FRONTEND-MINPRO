import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SkillTemplete from "./skillTemplete/skillTemplete";
import SkillType from "./skillType/skillType";
import {
  reqSkillTemplete,
  reqSkillType,
} from "@/redux/MasterBaruSchema/actions/actionReducer";
import { Content } from "antd/es/layout/layout";
import { MyPage } from "@/components/types";

const Index: MyPage = () => {
  const { skillTemplete, refreshSkillTemplete } = useSelector(
    (state: any) => state.skillTempeleteReducer
  );
  const { skillType, refreshSkillType } = useSelector(
    (state: any) => state.skillTypeReducer
  );
  const dispatch = useDispatch();
  console.log("skill", skillTemplete);

  useEffect(() => {
    dispatch(reqSkillType());
    dispatch(reqSkillTemplete());
  }, [refreshSkillTemplete, refreshSkillType]);

  return (
    <>
      <Content>
        <div>
          <div>
            <div className="rounded bg-blue h-auto shadow-sm py-2">
              <SkillType skillType={skillType} />
            </div>
            <div className="rounded bg-blue h-auto shadow-sm py-2">
              <SkillTemplete
                skillTemplete={skillTemplete}
                skillType={skillType}
              />
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};
Index.Layout = "Admin";
export default Index;
