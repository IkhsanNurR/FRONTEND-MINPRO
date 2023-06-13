import ActionType from "../action/actionType";

const initialState = {
    // bootcamp: [],
    apply: [],
    message: '',
    status: '',
    refresh: ''
}

function candidateApplyReducer(state = initialState, action:any){
    let {type, payload} = action
    // console.log('reducer',payload)
    
    switch (type) {
        case ActionType.RES_GET_CANDIDAT_APPLY:
            return {state, apply: payload.result, status: payload.status, message:payload.message, refresh: true}
        case ActionType.RES_UPDATE_CANDIDAT_APPLY:
            return {status: payload.status, message:payload.message, refresh: false}
        default:
            return state;
    }
}


export default candidateApplyReducer