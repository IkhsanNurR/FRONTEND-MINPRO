import ActionTypes from "../action/ActionTypes";

const initialstate = {
    topup : [],
    messagetopup: '',
    statustopup: 0,
    refreshtopup: '',
}

function topupReducer(state = initialstate,action:any) {
    const {type,payload} = action;
    switch (type) {
        case ActionTypes.ADD_TOPUP_RESPONSE:
            return {state,topup:payload.data, statustopup: payload.status, messagetopup:payload.message, refreshtopup:true}
        default:
            return state;
    }
}


export default topupReducer