import ActionTypes from "../action/ActionTypes";
import alert from "@/pages/alert"

const initialstate = {
    bank : [],
    message: '',
    status: 0,
    refresh: '',
}

function bankReducer(state = initialstate,action:any) {
    const {type,payload} = action;
    if (payload?.status === 200 && (type === "UPDATE_BANK_RESPONSE")
    || type === "ADD_BANK_RESPONSE" || type === "DELETE_BANK_RESPONSE") {
        setTimeout(() => {
            alert.notifySuccess(payload.status,payload.message)
        }, 500);
    } else if (payload?.status  !=200 && (type === "UPDATE_BANK_RESPONSE")
    || type === "ADD_BANK_RESPONSE" || type === "DELETE_BANK_RESPONSE"){
        setTimeout(() => {
            alert.notifyFailed(payload.status,payload.message)
        }, 500);
    }

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
