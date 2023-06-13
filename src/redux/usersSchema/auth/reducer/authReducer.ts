import AuthActionTypes from "../action/actionType";

const initialState = {
    message: "",
    token: "",
    refresh: ""
}

export default function authReducers(state = initialState, action: any) {
    const { type, payload } = action
    switch (type) {
        case AuthActionTypes.LOGIN_RESPONSE:
            return { state, token: payload.token, message: payload.message, refresh: true }
        default:
            return state
    }
}