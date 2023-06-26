import ActionTypes from "../action/ActionTypes";

const initialstate = {
    fintech : [],
    messagefintech: '',
    statusfintech: 0,
    refreshfintech: '',
}

function fintechReducer(state = initialstate,action:any) {
    const {type,payload} = action;
    switch (type) {
        case ActionTypes.GET_FINTECH_RESPONE:
            return {state,fintech: payload.data,statusfintech: payload.status,refreshfintech:true}
        case ActionTypes.ADD_FINTECH_RESPONSE:
            return {messagefintech:payload.message,statusfintech:payload.status,refreshfintech:false}
        case ActionTypes.UPDATE_FINTECH_RESPONSE:
            return {messagefintech:payload.message,statusfintech:payload.status,refreshfintech: false}
        case ActionTypes.DELETE_FINTECH_RESPONSE:
            return {messagefintech:payload.message,statusfintech:payload.status,refreshfintech: false }
        default:
            return state;
    }
}


export default fintechReducer