import ActionSalesTypes from "../action/actionType";

const initialState = {
  order: [],
  message: "",
  status: "",
  refresh: "",
};

function salesOrderReducer(state: any = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case ActionSalesTypes.GET_SALES_ORDER_RESPONSE:
      return {
        state,
        order: payload.data,
        // status: payload.status,
        // message: payload.message,
        refresh: true,
      };
    // case ActionSalesTypes.UPDATE_SALES_ORDER_RESPONSE:
    //     return { state, message: payload.message, refresh: false }
    case ActionSalesTypes.ADD_SALES_ORDER_RESPONSE:
      return { state, message: payload.message, refresh: false };
    case ActionSalesTypes.DELETE_SALES_ORDER_RESPONSE:
      return { state, message: payload.message, refresh: false };
    default:
      return state;
  }
}

export default salesOrderReducer;
