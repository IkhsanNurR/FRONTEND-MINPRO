import ActionTypes from "../action/ActionTypes";

const initialstate = {
    usersaccount : [],
    messageaccount: '',
    statusaccount: 0,
    refreshaccount: '',
}

function AccountReducer(state = initialstate,action:any) {
    const {type,payload} = action;

    switch (type) {
        case ActionTypes.GET_ACCOUNT_RESPONE:
            return {state,usersaccount:payload.data, statusaccount:payload.status, refreshaccount:true}
        case ActionTypes.ADD_ACCOUNT_RESPONSE:
            return {messageaccount:payload.message, statusaccount:payload.status, refreshaccount:false}
        case ActionTypes.UPDATE_ACCOUNT_RESPONSE:
            return {messageaccount:payload.message, statusaccount:payload.status, refreshaccount:false}
        case ActionTypes.DELETE_ACCOUNT_RESPONSE:
            return {messageaccount:payload.message, statusaccount:payload.status, refreshaccount:false }
        default:
            return state;
    }
}

export default AccountReducer