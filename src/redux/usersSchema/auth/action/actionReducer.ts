import AuthActionTypes from "./actionType";

export const Login = (payload: any) => {
    return {
        type: AuthActionTypes.LOGIN,
        payload
    }
}

export const LoginResponse = (payload: any) => {
    return {
        type: AuthActionTypes.LOGIN_RESPONSE,
        payload
    }
}
