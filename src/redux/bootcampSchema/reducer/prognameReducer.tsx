import ActionType from "../action/actionType";

const initialState = {
    progname: [],
    message: '',
    status: '',
    refresh: ''
}

function PrognameReducer(state = initialState, action:any){
    let {type, payload} = action
    // console.log('reducer',payload)
    
    switch (type) {
        case ActionType.RES_GET_PROGNAME:
            return {state, progname: payload.result, status: payload.status, message:payload.message, refresh: true}
        // case ActionType.RES_GET_BOOTCAMP_BY_ID:
        //     return {state, bootcamp: payload.result, status: payload.status, message:payload.message, refresh: true}
        default:
            return state;
    }
}


export default PrognameReducer