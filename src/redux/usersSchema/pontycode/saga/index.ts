// import apiMethod from "@/pages/api/UsersSchema/Profile/apiMethod";
import apiMethod from "@/api/UsersSchema/Profile/apiMethod";
import { call, put } from "redux-saga/effects";
import { getPontyCodeResponse } from "../action/actionReducer";

export function* handleGetPontycode(): any {
  try {
    const res = yield call(apiMethod.getPontyCode);
    yield put(getPontyCodeResponse(res.data.data));
  } catch (error) {
    yield put(
      getPontyCodeResponse({
        message: error,
        status: 400,
      })
    );
  }
}
