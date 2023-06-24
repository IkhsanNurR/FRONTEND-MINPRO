// import apiMethod from "@/pages/api/UsersSchema/Auth/apiMethod";
import apiMethod from "@/api/UsersSchema/Auth/apiMethod";
import { setCookie } from "cookies-next";
import { call, put } from "redux-saga/effects";
import {
  LoginResponse,
  SignUpExternalResponse,
  SignUpInternalResponse,
} from "../action/actionReducer";

export function* handleLogin(action: any): any {
  try {
    const res = yield call(apiMethod.Login, action.payload);

    if (res.data.token) {
      setCookie("token", res.data.token);
      yield put(
        LoginResponse({ token: res.data.token, message: res.data.message })
      );
    } else {
      yield put(LoginResponse({ token: "", message: res.data.message }));
    }
  } catch (error) {
    yield put(
      LoginResponse({
        message: error,
        status: 400,
      })
    );
  }
}

export function* handleSignupInternal(action: any): any {
  try {
    const res = yield call(apiMethod.signUpInternal, action.payload);
    yield put(SignUpInternalResponse(res.data));
  } catch (error) {
    yield put(
      SignUpInternalResponse({
        message: error,
        status: 400,
      })
    );
  }
}
export function* handleSignupExternal(action: any): any {
  try {
    const res = yield call(apiMethod.signUpExternal, action.payload);
    yield put(SignUpExternalResponse(res.data));
  } catch (error) {
    yield put(
      SignUpExternalResponse({
        message: error,
        status: 400,
      })
    );
  }
}
