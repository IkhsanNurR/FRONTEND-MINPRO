// import apiMethod from "@/pages/api/masterSchema/city/apiMethod";
import apiMethod from "@/api/masterSchema/city/apiMethod";
import { call, put } from "redux-saga/effects";
import { getCityResponse } from "../action/actionReducer";

export function* handleGetCity(): any {
  try {
    const res = yield call(apiMethod.getCity);
    yield put(getCityResponse(res.data));
  } catch (error) {
    yield put(
      getCityResponse({
        message: error,
        status: 400,
      })
    );
  }
}
