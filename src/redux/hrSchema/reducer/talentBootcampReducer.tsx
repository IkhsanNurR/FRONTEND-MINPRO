import ActionTypes from "../action/actionType";
import alert from "@/alert";

const initialState = {
  talent: [],
  client: [],
  jobrole: [],
  department: [],
  jobtype: [],
  message: "",
  refresh: "",
};

function TalentBootcampReducer(state = initialState, action: any) {
  const { type, payload } = action;
  console.log("kok kesini", payload);
  // console.log("kok kesana", type);
  if (payload?.status === 201) {
    alert.notifySuccess(payload.result, payload.message);
  } else if ([400, 403, 413].includes(payload?.status)) {
    alert.notifyFailed(payload.status, payload.message);
  }
  switch (type) {
    case ActionTypes.RES_TALENT:
      return { ...state, talent: payload, refresh: true };
    case ActionTypes.RES_CLIENT_BOOTCAMP:
      return { ...state, client: payload, refresh: true };
    case ActionTypes.RES_GET_FILTER_JOBROLE:
      return { ...state, jobrole: payload, refresh: true };
    case ActionTypes.RES_GET_FILTER_DEPARTMENT:
      return { ...state, department: payload, refresh: true };
    case ActionTypes.RES_CREATE_BOOTCAMP:
      return { message: payload.message, refresh: false };
    // case ActionTypes.RES_CREATE_BOOTCAMP:
    //   return { ...state, message: payload.message, refresh: true };
    case ActionTypes.RES_JOBTYPE:
      return { ...state, jobtype: payload, refresh: true };

    default:
      return state;
  }
}

export default TalentBootcampReducer;
