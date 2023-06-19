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

export const SignUp = (payload: any) => {
    return {
        type: AuthActionTypes.SIGNUP,
        payload
    }
}

export const SignUpResponse = (payload: any) => {
    return {
        type: AuthActionTypes.SIGNUP_RESPONSE,
        payload
    }
}
