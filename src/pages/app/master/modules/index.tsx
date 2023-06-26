import React, { useEffect } from "react";
import Modules from "./module/modules";
import RouteActions from "./routeAction/routeActions";
import { useDispatch, useSelector } from "react-redux";
import {
  reqGetModule,
  reqGetRouteAction,
} from "@/redux/MasterBaruSchema/actions/actionReducer";
import { MyPage } from "@/components/types";

const index: MyPage = () => {
  const { modules, refreshModules } = useSelector(
    (state: any) => state.modulesReducer
  );
  const { routeActions, refreshRouteActions } = useSelector(
    (state: any) => state.routeActionsReducer
  );
  const dispatch = useDispatch();
  console.log("object", routeActions);

  useEffect(() => {
    dispatch(reqGetModule());
    dispatch(reqGetRouteAction());
  }, [refreshModules, refreshRouteActions]);

  return (
    <>
      <div>
        <div className="rounded bg-blue h-auto shadow-sm py-2">
          <Modules module={modules} />
        </div>
        <div className="rounded bg-blue h-auto shadow-sm py-2">
          <RouteActions routeActions={routeActions} module={modules} />
        </div>
      </div>
    </>
  );
};
index.Layout = "Admin";
export default index;
