import actionType from "./actionType";
export const reqGetMaster = () => {
  return {
    type: actionType.REQ_GET_MASTER,
  };
};
export const resGetMaster = (payload: any) => {
  return {
    type: actionType.RES_GET_MASTER,
    payload,
  };
};
