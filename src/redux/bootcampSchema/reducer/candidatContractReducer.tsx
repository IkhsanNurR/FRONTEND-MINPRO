import ActionType from "../action/actionType";

const initialState = {
    // bootcamp: [],
    contract: [],
    message: '',
    status: '',
    refreshContract: ''
}

function candidateContractReducer(state = initialState, action:any){
    let {type, payload} = action
    // console.log('reducer',payload)
    
    switch (type) {
        case ActionType.RES_GET_CANDIDAT_CONTRACT:
            return {state, contract: payload.result, status: payload.status, message:payload.message, refreshContract: true}
        case ActionType.RES_UPDATE_CANDIDAT_CONTRACT:
            return {status: payload.status, message:payload.message, refreshContract: false}
        // case ActionType.RES_GET_CANDIDAT_FILTERING:
        //     return {status: payload.status, message:payload.message, refresh: false}
        default:
            return state;
    }
}


export default candidateContractReducer