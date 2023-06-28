import { call, put } from "redux-saga/effects";
import apiMethod from "@/api/salesSchema/apiMethod";
import {
  doGetCartItemResponse,
  doDeleteCartItemResponse,
  doAddCartItemResponse,
} from "../../salesSchema/action/actionReducer";

export function* handleGetAllCartItem(): any {
  try {
    const result = yield call(apiMethod.findUserCartItem);
    console.log("sagacart", result);

    yield put(doGetCartItemResponse(result.data.data));
  } catch (error: any) {
    yield put(doGetCartItemResponse({ message: error.message, status: 400 }));
  }
}

export function* handleAddCartItem(action: any): any {
  try {
    const result = yield call(apiMethod.createCartItem, action.payload);
    yield put(doAddCartItemResponse(result.data[0]));
  } catch (error: any) {
    yield put(doAddCartItemResponse({ message: error.message, status: 400 }));
  }
}

export function* handleDeleteCartItem(action: any): any {
  try {
    console.log(action.payload);
    const result = yield call(apiMethod.deleteCartItem, action.payload);
    yield put(doDeleteCartItemResponse(result.data[0]));
  } catch (error: any) {
    yield put(
      doDeleteCartItemResponse({ message: error.message, status: 400 })
    );
  }
}
