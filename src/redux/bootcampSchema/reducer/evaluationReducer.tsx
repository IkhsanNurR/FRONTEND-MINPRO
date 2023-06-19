import ActionType from "../action/actionType";

const initialState = {
    // bootcamp: [],
    evaluation: [],
    message: '',
    status: '',
    refreshEvaluation: ''
}

function evaluationReducer(state = initialState, action:any){
    let {type, payload} = action
    // console.log('reducer',payload)
    
    switch (type) {
        case ActionType.RES_EVALUATION_DETAIL:
            return {state, status: payload.status, message:payload.message, refreshEvaluation: true}
        case ActionType.RES_EVALUATION_STATUS:
            return {status: payload.status, message:payload.message, refreshNotResponding: false}
        // case ActionType.RES_GET_CANDIDAT_FILTERING:
        //     return {status: payload.status, message:payload.message, refresh: false}
        default:
            return state;
    }
}


export default evaluationReducer