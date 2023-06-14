import pontyCodeActionType from "../action/actionType";

const initialState = {
    pontycode: [],
    message: "",
    status: "",
    refresh: ""
}

export default function pontycodeReducers(state = initialState, action: any) {
    const { type, payload } = action
    switch (type) {
        case pontyCodeActionType.GETPONTYCODE_RESPONSE:
            return { pontycode: payload, refresh: true }
        default:
            return state
    }
}