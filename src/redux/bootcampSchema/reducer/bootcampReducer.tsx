import ActionType from "../action/actionType";
import alert from "@/pages/alert";

const initialState = {
    bootcamp: [],
    // daftarapply: [],
    message: '',
    status: '',
    refresh: ''
}

function bootcampReducer(state = initialState, action:any){
    let {type, payload} = action
    console.log('reducermatap',payload)

    if (payload?.status === 201) {
      alert.notifySuccess(payload.result, payload.message);
    } else if (payload?.status === 400) {
      alert.notifyFailed(payload.status, payload.message);
    }
    switch (type) {
        case ActionType.RES_GET_BOOTCAMP:
            return {state, bootcamp: payload.result, status: payload.status, message:payload.message, refresh: true}
        case ActionType.RES_GET_BOOTCAMP_BY_ID:
            return {state, bootcamp: payload.result, status: payload.status, message:payload.message, refresh: false}
        case ActionType.RES_CREATE_BOOTCAMP:
            return {status: payload.status, message:payload.message, refresh: false}
        case ActionType.RES_APPLY_BOOTCAMP:
            return {status: payload.status, message:payload.message, refresh: false}
        case ActionType.RES_EDIT_BOOTCAMP:
            return {status: payload.status, message:payload.message, refresh: false}
        case ActionType.RES_EXTEND_BOOTCAMP:
            return {status: payload.status, message:payload.message, refresh: false}
        case ActionType.RES_CLOSE_BOOTCAMP:
            return {status: payload.status, message:payload.message, refresh: false}
        case ActionType.RES_PENDING_BOOTCAMP:
            return {status: payload.status, message:payload.message, refresh: false}
        case ActionType.RES_DELETE_BOOTCAMP:
            return {status: payload.status, message:payload.message, refresh: false}
        case ActionType.RES_SET_TO_RUNNING_BOOTCAMP:
            return {status: payload.status, message:payload.message, refresh: false}
        case ActionType.RESET_STATE:
            return initialState;
        // case ActionType.RES_GET_DAFTAR_APPLY:
        //     return {state, daftarapply: payload.result, status: payload.status, message:payload.message, refresh: true}
        default:
            return state;
    }
}


export default bootcampReducer