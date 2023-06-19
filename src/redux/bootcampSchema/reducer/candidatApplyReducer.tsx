import ActionType from "../action/actionType";

const initialState = {
    // bootcamp: [],
    apply: [],
    message: '',
    status: '',
    refreshApply: ''
}

function candidateApplyReducer(state = initialState, action:any){
    let {type, payload} = action
    // console.log('reducer',payload)
    
    switch (type) {
        case ActionType.RES_GET_CANDIDAT_APPLY:
            return {state, apply: payload.result, status: payload.status, message:payload.message, refreshApply: true}
        case ActionType.RES_UPDATE_CANDIDAT_APPLY:
            return {status: payload.status, message:payload.message, refreshApply: false}
        default:
            return state;
    }
}


export default candidateApplyReducer