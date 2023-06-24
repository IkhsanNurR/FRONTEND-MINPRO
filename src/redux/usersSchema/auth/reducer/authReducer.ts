import AuthActionTypes from "../action/actionType";

const initialState = {
    message: "",
    token: "",
    refresh: "",
    status: ""
}

export default function authReducers(state = initialState, action: any) {
    const { type, payload } = action


    switch (type) {
        case AuthActionTypes.LOGIN_RESPONSE:
            return {  token: payload.token, message: payload.message, refresh: false }
        case AuthActionTypes.SIGNUPEXTERNAL_RESPONSE:
            return { message: payload.message, status: payload.status, refresh: false }
        case AuthActionTypes.SIGNUPINTERNAL_RESPONSE:
            return { message: payload.message, status: payload.status, refresh: false }
        case AuthActionTypes.RESET_STATE:
            return initialState
        default:
            return state
    }
}