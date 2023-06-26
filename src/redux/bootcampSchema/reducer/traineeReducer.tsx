import ActionType from "../action/actionType";

const initialState = {
    trainee: [],
    message: '',
    status: '',
    refresh: ''
}

function traineeReducer(state = initialState, action:any){
    let {type, payload} = action
    // console.log('reducer',payload)
    
    switch (type) {
        case ActionType.RES_GET_TRAINEE_BY_ID:
            return {state, trainee: payload.result, status: payload.status, message:payload.message, refresh: true}
       default:
            return state;
    }
}


export default traineeReducer