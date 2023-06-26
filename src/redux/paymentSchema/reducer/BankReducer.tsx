import ActionTypes from "../action/ActionTypes";

const initialstate = {
    bank : [],
    message: '',
    status: 0,
    refresh: '',
}

function bankReducer(state = initialstate,action:any) {
    const {type,payload} = action;
    switch (type) {
        case ActionTypes.GET_BANK_RESPONE:
            return {state,bank:payload.data, status:payload.status, refresh:true}
        case ActionTypes.UPDATE_BANK_RESPONSE:
            return {message:payload.message, status:payload.status, refresh: false}
        case ActionTypes.ADD_BANK_RESPONSE:
            return {message:payload.message, status:payload.status, refresh:false}
        case ActionTypes.DELETE_BANK_RESPONSE:
            return {message:payload.message, status:payload.status, refresh: false }
        default:
            return state;
        }
    }


export default bankReducer
