import { call, put } from "redux-saga/effects";
import apiMethod from "../../../../api/jobhireSchema/apiMethod";
import { doResponseGetJobrole } from "../action/actionReducer";

export function* handleGetJobroleJobHire(): any {
  try {
    const result = yield call(apiMethod.findJobrole);
    yield put(doResponseGetJobrole(result.data));
  } catch (error) {
    yield put(doResponseGetJobrole({ message: error, status: 400 }));
  }
}
