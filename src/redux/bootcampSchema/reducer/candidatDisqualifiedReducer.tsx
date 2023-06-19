import ActionType from "../action/actionType";

const initialState = {
    // bootcamp: [],
    disqualified: [],
    message: '',
    status: '',
    refreshDisqualified: ''
}

function candidateDisqualifiedReducer(state = initialState, action:any){
    let {type, payload} = action
    // console.log('reducer',payload)
    
    switch (type) {
        case ActionType.RES_GET_CANDIDAT_DISQUALIFIED:
            return {state, disqualified: payload.result, status: payload.status, message:payload.message, refreshDisqualified: true}
        case ActionType.RES_UPDATE_CANDIDAT_DISQUALIFIED:
            return {status: payload.status, message:payload.message, refreshDisqualified: false}
        // case ActionType.RES_GET_CANDIDAT_FILTERING:
        //     return {status: payload.status, message:payload.message, refresh: false}
        default:
            return state;
    }
}


export default candidateDisqualifiedReducer