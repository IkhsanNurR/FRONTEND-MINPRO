import ActionSalesTypes from "../action/actionType";

const initialState = {
  cart: [],
  message: "",
  status: 0,
  refresh: "",
};

function cartItemReducer(state: any = initialState, action: any) {
  const { type, payload } = action;
  console.log("inipayloadcart", payload);

  switch (type) {
    case ActionSalesTypes.GET_CART_ITEM_RESPONSE:
      return {
        cart: payload,
        refresh: true,
      };
    // case ActionSalesTypes.UPDATE_CART_ITEM:
    //     return { state, message: payload.message, refresh: false }
    case ActionSalesTypes.DELETE_CART_ITEM_RESPONSE:
      return { state, message: payload.message, refresh: false };
    case ActionSalesTypes.ADD_CART_ITEM_RESPONSE:
      return { state, message: payload.message, refresh: false };
    default:
      return state;
  }
}

export default cartItemReducer;
