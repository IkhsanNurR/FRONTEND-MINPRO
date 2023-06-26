import apiMethod from "@/api/CurriculumSchema/apiMethod";
import { call, put } from "redux-saga/effects";
import { resGetMaster } from "../action/actionReducer";

export function* handleGetMaster(): any {
  try {
    const result = yield call(apiMethod.getMaster);
    yield put(resGetMaster(result.data));
    console.log("saga", result.data);
  } catch (error) {
    yield put(resGetMaster({ message: error, status: 404 }));
  }
}
