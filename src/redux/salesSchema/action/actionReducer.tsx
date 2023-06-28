import ActionSalesTypes from "./actionType";

//action reducer special offer
export const doGetSpecialOffer = () => {
  return {
    type: ActionSalesTypes.GET_SPECIAL_OFFER,
  };
};

export const doGetSpecialOfferResponse = (payload: any) => {
  return {
    type: ActionSalesTypes.GET_SPECIAL_OFFER_RESPONSE,
    payload,
  };
};

export const doAddSpecialOffer = (payload: any) => {
  return {
    type: ActionSalesTypes.ADD_SPECIAL_OFFER,
    payload,
  };
};

export const doAddSpecialOfferResponse = (payload: any) => {
  return {
    type: ActionSalesTypes.ADD_SPECIAL_OFFER_RESPONSE,
    payload,
  };
};

export const doDeleteSpecialOffer = (payload: any) => {
  return {
    type: ActionSalesTypes.DELETE_SPECIAL_OFFER,
    payload,
  };
};

export const doDeleteSpecialOfferResponse = (payload: any) => {
  return {
    type: ActionSalesTypes.DELETE_SPECIAL_OFFER_RESPONSE,
    payload,
  };
};
//action reducer sales order
export const doRequestGetSalesOrder = () => {
  return {
    type: ActionSalesTypes.GET_SALES_ORDER,
  };
};

export const doGetSalesOrderResponse = (payload: any) => {
  return {
    type: ActionSalesTypes.GET_SALES_ORDER_RESPONSE,
    payload,
  };
};

export const doAddSalesOrder = (payload: any) => {
  return {
    type: ActionSalesTypes.ADD_SALES_ORDER,
    payload,
  };
};

export const doAddSalesOrderResponse = (payload: any) => {
  return {
    type: ActionSalesTypes.ADD_SALES_ORDER_RESPONSE,
    payload,
  };
};

export const doDeleteSalesOrder = (payload: any) => {
  return {
    type: ActionSalesTypes.DELETE_SALES_ORDER,
    payload,
  };
};

export const doDeleteSalesOrderResponse = (payload: any) => {
  return {
    type: ActionSalesTypes.DELETE_SALES_ORDER_RESPONSE,
    payload,
  };
};

// export const doUpdateSalesOrder = (payload: any) => {
//     return {
//         type: ActionSalesTypes.UPDATE_SALES_ORDER,
//         payload
//     }
// }

// export const doUpdateSalesOrderResponse = (payload: any) => {
//     return {
//         type: ActionSalesTypes.UPDATE_SALES_ORDER_RESPONSE,
//         payload
//     }
// }

export const doGetCartItem = () => {
  console.log("actionpayloadcartafafa");
  return {
    type: ActionSalesTypes.GET_CART_ITEM,
  };
};

export const doGetCartItemResponse = (payload: any) => {
  console.log("actionpayloadcart", payload);

  return {
    type: ActionSalesTypes.GET_CART_ITEM_RESPONSE,
    payload,
  };
};

export const doAddCartItem = (payload: any) => {
  return {
    type: ActionSalesTypes.ADD_CART_ITEM,
    payload,
  };
};

export const doAddCartItemResponse = (payload: any) => {
  return {
    type: ActionSalesTypes.ADD_CART_ITEM_RESPONSE,
    payload,
  };
};

export const doDeleteCartItem = (payload: any) => {
  // console.log(payload)
  return {
    type: ActionSalesTypes.DELETE_CART_ITEM,
    payload,
  };
};

export const doDeleteCartItemResponse = (payload: any) => {
  // console.log(payload, "GDSFSFHSF")
  return {
    type: ActionSalesTypes.DELETE_CART_ITEM_RESPONSE,
    payload,
  };
};

export const doGetPayment = () => {
  // console.log('selamatdatang')
  return {
    type: ActionSalesTypes.GET_PAYMENT_REQUEST,
  };
};

export const doGetPaymentResponse = (payload: any) => {
  // console.log('selamatdatangpayment')
  return {
    type: ActionSalesTypes.GET_PAYMENT_RESPONSE,
    payload,
  };
};
