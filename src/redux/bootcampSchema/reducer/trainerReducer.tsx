import ActionType from "../action/actionType";

const initialState = {
    trainer: [],
    // daftarapply: [],
    message: '',
    status: '',
    refresh: ''
}

function trainerReducer(state = initialState, action:any){
    let {type, payload} = action
    // console.log('reducer',payload)
    
    switch (type) {
        case ActionType.RES_GET_TRAINER:
            return {state, trainer: payload.result, status: payload.status, message:payload.message, refresh: true}
        // case ActionType.RES_GET_BOOTCAMP_BY_ID:
        //     return {state, bootcamp: payload.result, status: payload.status, message:payload.message, refresh: true}
        // case ActionType.RES_GET_DAFTAR_APPLY:
        //     return {state, daftarapply: payload.result, status: payload.status, message:payload.message, refresh: true}
        default:
            return state;
    }
}


export default trainerReducer