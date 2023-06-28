import ActionSalesTypes from "../action/actionType";

const initialState = {
    payment: [],
    message: '',
    status: 0,
    refreshPayment: ''
}

function paymentReducer(state: any = initialState, action: any) {
    const { type, payload } = action
    console.log('aji', payload);
    switch (type) {
        case ActionSalesTypes.GET_PAYMENT_RESPONSE:
            return {
                state,
                // payment: payload,
                payment: payload.data,
                refreshPayment: true
            }
        default: return state;
    }
}

export default paymentReducer