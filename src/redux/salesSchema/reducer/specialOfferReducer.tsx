import ActionSalesTypes from "../action/actionType";

const initialState = {
  offer: [],
  message: "",
  status: "",
  refresh: "",
};

function specialOfferReducer(state: any = initialState, action: any) {
  const { type, payload } = action;
  // console.log('123144645', payload);

  // console.log('11231314', payload.data.data);
  switch (type) {
    case ActionSalesTypes.GET_SPECIAL_OFFER_RESPONSE:
      return {
        // state,
        offer: payload.data,
        // status: payload.status,
        // message: payload.message,
        refresh: true,
      };
    case ActionSalesTypes.DELETE_SPECIAL_OFFER:
      return { state, message: payload.message, refresh: false };
    case ActionSalesTypes.ADD_SPECIAL_OFFER:
      return { state, message: payload.message, refresh: false };
    // case ActionSalesTypes.UPDATE_SPECIAL_OFFER:
    //     return { state, message: payload.message, refresh: false }
    default:
      return state;
  }
}

export default specialOfferReducer;
