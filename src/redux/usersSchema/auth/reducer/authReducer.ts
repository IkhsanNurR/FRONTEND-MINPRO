import AuthActionTypes from "../action/actionType";

const initialState = {
    message: "",
    token: ""
}

export default function authReducers(state = initialState, action: any) {
    const { type, payload } = action
    switch (type) {
        case AuthActionTypes.LOGIN_RESPONSE:
            return { state, token: payload.token, message: payload.message }
        default:
            return state
    }
}