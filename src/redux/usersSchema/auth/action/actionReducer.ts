import AuthActionTypes from "./actionType";

export const Login = (payload: any) => {
  return {
    type: AuthActionTypes.LOGIN,
    payload,
  };
};

export const LoginResponse = (payload: any) => {
  return {
    type: AuthActionTypes.LOGIN_RESPONSE,
    payload,
  };
};

export const SignUpInternal = (payload: any) => {
  return {
    type: AuthActionTypes.SIGNUPINTERNAL,
    payload,
  };
};

export const SignUpInternalResponse = (payload: any) => {
  return {
    type: AuthActionTypes.SIGNUPINTERNAL_RESPONSE,
    payload,
  };
};

export const SignUpExternal = (payload: any) => {
  return {
    type: AuthActionTypes.SIGNUPEXTERNAL,
    payload,
  };
};

export const SignUpExternalResponse = (payload: any) => {
  return {
    type: AuthActionTypes.SIGNUPEXTERNAL_RESPONSE,
    payload,
  };
};
