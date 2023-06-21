import ActionType from "../action/actionType";

const initialState = {
  talent: [],
  message: "",
  status: "",
  refresh: "",
};

function talentReducer(state = initialState, action: any) {
  let { type, payload } = action;
  // console.log('reducer',payload)

  switch (type) {
    case ActionType.RES_GET_TALENT:
      return {
        state,
        talent: payload.result,
        status: payload.status,
        message: payload.message,
        refresh: true,
      };
    // case ActionType.RES_GET_BOOTCAMP_BY_ID:
    //     return {state, bootcamp: payload.result, status: payload.status, message:payload.message, refresh: true}
    default:
      return state;
  }
}

export default talentReducer;