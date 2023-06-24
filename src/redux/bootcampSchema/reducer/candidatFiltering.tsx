import ActionType from "../action/actionType";

const initialState = {
    // bootcamp: [],
    filtering: [],
    message: '',
    status: '',
    refreshFiltering: ''
}

function candidateFilteringReducer(state = initialState, action:any){
    let {type, payload} = action
    // console.log('reducer',payload)
    
    switch (type) {
        case ActionType.RES_GET_CANDIDAT_FILTERING:
            return {state, filtering: payload.result, status: payload.status, message:payload.message, refreshFiltering: true}
        case ActionType.RES_UPDATE_CANDIDAT_FILTERING:
            return {status: payload.status, message:payload.message, refreshFiltering: false}
        // case ActionType.RES_GET_CANDIDAT_FILTERING:
        //     return {status: payload.status, message:payload.message, refresh: false}
        default:
            return state;
    }
}


export default candidateFilteringReducer