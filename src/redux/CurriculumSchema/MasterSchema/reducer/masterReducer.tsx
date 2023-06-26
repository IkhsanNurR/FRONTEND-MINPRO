import ActionType from "../action/actionType";

const initialState = {
  master: [],
  message: "",
  status: "",
  refresh: "",
};

function masterReducer(state = initialState, action: any) {
  let { type, payload } = action;
  // console.log('Reducer',payload)
  switch (type) {
    case ActionType.RES_GET_MASTER:
      return {
        state,
        master: payload[0],
        status: payload.status,
        message: payload.message,
        refresh: true,
      };
    default:
      return state;
  }
}

export default masterReducer;
