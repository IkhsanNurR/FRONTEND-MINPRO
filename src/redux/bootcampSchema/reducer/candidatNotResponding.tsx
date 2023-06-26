import ActionType from "../action/actionType";

const initialState = {
    // bootcamp: [],
    notresponding: [],
    message: '',
    status: '',
    refreshNotResponding: ''
}

function candidateNotRespondingReducer(state = initialState, action:any){
    let {type, payload} = action
    // console.log('reducer',payload)
    
    switch (type) {
        case ActionType.RES_GET_CANDIDAT_NOTRESPONDING:
            return {state, notresponding: payload.result, status: payload.status, message:payload.message, refreshNotResponding: true}
        case ActionType.RES_UPDATE_CANDIDAT_NOTRESPONDING:
            return {status: payload.status, message:payload.message, refreshNotResponding: false}
        // case ActionType.RES_GET_CANDIDAT_FILTERING:
        //     return {status: payload.status, message:payload.message, refresh: false}
        default:
            return state;
    }
}


export default candidateNotRespondingReducer