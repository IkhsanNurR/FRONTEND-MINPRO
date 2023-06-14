import addreetypeActionType from "../action/actionType";

const initialState = {
    addressType: [],
    message: "",
    status: "",
    refresh: ""
}

export default function addreetypeReducers(state = initialState, action: any) {
    const { type, payload } = action
    switch (type) {
        case addreetypeActionType.GET_ADDRESSTYPE_RESPONSE:
            return { addressType: payload.data, refresh: true }
        default:
            return state
    }
}