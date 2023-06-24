// import apiMethod from "@/pages/api/jobhireSchema/apiMethod";
import apiMethod from "@/api/jobhireSchema/apiMethod";
import { call, put } from "redux-saga/effects";
import { getJobResponse } from "../action/actionReducer";

export function* handleGetAllJob(): any {
  try {
    const res = yield call(apiMethod.findAllJob);
    yield put(getJobResponse(res.data));
  } catch (error) {
    yield put(
      getJobResponse({
        message: error,
        status: 400,
      })
    );
  }
}
