import apiMethod from "@/api/apiMethod";
import { call, put } from "redux-saga/effects";
import { resGetProgName, resGetTalent } from "../action/actionReducer";

export function* handleGetTalent(): any {
  try {
    const result = yield call(apiMethod.getTalentBootcamp);
    // console.log('saga',result)
    yield put(resGetTalent(result.data));
  } catch (error) {
    yield put(resGetTalent({ message: error, status: 404 }));
  }
}