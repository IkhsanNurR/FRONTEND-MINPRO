import { call, put } from "redux-saga/effects";
import apiMethod from "../../../../api/jobhireSchema/apiMethod";
import { doResponseGetPhoto } from "../action/actionReducer";

export function* handleGetPhoto(): any {
  try {
    const result = yield call(apiMethod.findJobPhoto);
    console.log("DARISAGA", result.data);
    yield put(doResponseGetPhoto(result.data));
  } catch (error) {
    yield put(doResponseGetPhoto({ message: error, status: 400 }));
  }
}
