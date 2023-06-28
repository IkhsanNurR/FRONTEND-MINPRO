import { put, call } from "redux-saga/effects";
import { doGetPaymentResponse } from "../../salesSchema/action/actionReducer";
import apiMethod from "@/api/salesSchema/apiMethod";

export function* handleGetAllPayment(): any {
  try {
    const result = yield call(apiMethod.findAllPayment);
    console.log("saga payment", result);
    yield put(doGetPaymentResponse(result.data));
  } catch (error: any) {
    yield put(doGetPaymentResponse({ message: error.message, status: 400 }));
  }
}
