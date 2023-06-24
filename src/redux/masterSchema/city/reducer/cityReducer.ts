import cityActionType from "../action/actionType";

const initialState = {
    city: [],
    message: "",
    status: "",
    refresh: ""
}

export default function cityReducers(state = initialState, action: any) {
    const { type, payload } = action
    switch (type) {
        case cityActionType.GET_CITY_RESPONSE:
            return { city: payload.data, refresh: true }
        default:
            return state
    }
}