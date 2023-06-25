import { call, put } from "redux-saga/effects";
import apiMethod from "../../../../api/jobhireSchema/apiMethod";
import { doResponseGetCity } from "../action/actionReducer";

export function* handleGetCityJobHire(): any {
  try {
    const result = yield call(apiMethod.findCity);
    //   console.log('sa',result.data)
    yield put(doResponseGetCity(result.data));
  } catch (error) {
    yield put(doResponseGetCity({ message: error, status: 400 }));
  }
}
