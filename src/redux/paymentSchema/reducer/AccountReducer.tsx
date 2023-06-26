import ActionTypes from "../action/ActionTypes";
import alert from "@/alert";

const initialstate = {
  usersaccount: [],
  messageaccount: "",
  statusaccount: 0,
  refreshaccount: "",
};

function AccountReducer(state = initialstate, action: any) {
  const { type, payload } = action;
  if (
    (payload?.status === 200 && type === "UPDATE_ACCOUNT_RESPONSE") ||
    type === "ADD_ACCOUNT_RESPONSE" ||
    type === "DELETE_ACCOUNT_RESPONSE"
  ) {
    setTimeout(() => {
      alert.notifySuccess(payload.status, payload.message);
    }, 500);
  } else if (
    (payload?.status != 200 && type === "UPDATE_ACCOUNT_RESPONSE") ||
    type === "ADD_ACCOUNT_RESPONSE" ||
    type === "DELETE_ACCOUNT_RESPONSE"
  ) {
    setTimeout(() => {
      alert.notifyFailed(payload.status, payload.message);
    }, 500);
  }

  switch (type) {
    case ActionTypes.GET_ACCOUNT_RESPONE:
      return {
        state,
        usersaccount: payload.data,
        statusaccount: payload.status,
        refreshaccount: true,
      };
    case ActionTypes.ADD_ACCOUNT_RESPONSE:
      return {
        messageaccount: payload.message,
        statusaccount: payload.status,
        refreshaccount: false,
      };
    case ActionTypes.UPDATE_ACCOUNT_RESPONSE:
      return {
        messageaccount: payload.message,
        statusaccount: payload.status,
        refreshaccount: false,
      };
    case ActionTypes.DELETE_ACCOUNT_RESPONSE:
      return {
        messageaccount: payload.message,
        statusaccount: payload.status,
        refreshaccount: false,
      };
    default:
      return state;
  }
}

export default AccountReducer;
