import ActionTypes from "../action/actionType";

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
  console.log("kok kesana", type);
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
      return { ...state, message: payload.message, refresh: true };
    case ActionTypes.RES_JOBTYPE:
      return { ...state, jobtype: payload, refresh: true };

    default:
      return state;
  }
}

export default TalentBootcampReducer;
