import bankMethod from "../../../api/paymentSchma/bankMethod";
import { call, put } from "redux-saga/effects";
import {
  doGetBankResponse,
  dobankResponse,
  deleteBankResponse,
  doBankUpdateResponse,
} from "../action/ActionReducer";

function* handlegetAllBank(): any {
  // console.log("result");
  try {
    const result = yield call(bankMethod.findAllBank);
    // console.log(result,'asssd')
    yield put(doGetBankResponse(result.data));
  } catch (error) {
    yield put(doGetBankResponse({ message: error, status: 400 }));
  }
}

function* handleAddBank(action: any): any {
  // console.log("object");
  try {
    const result = yield call(bankMethod.createBank, action.payload);
    // console.log("object");
    yield put(dobankResponse(result.data));
  } catch (error) {
    yield put(dobankResponse({ message: error, status: 400 }));
  }
}

function* handleUpdateBank(action: any): any {
  // console.log("acti1on");
  try {
    const result = yield call(bankMethod.updateBankById, action.payload);
    // console.log("object");
    yield put(doBankUpdateResponse(result.data));
  } catch (error) {
    yield put(doBankUpdateResponse({ message: error, status: 400 }));
  }
}

function* handleDeleteBank(action: any): any {
  try {
    console.log(action.payload);
    const result = yield call(bankMethod.deleteBankById, action.payload);
    yield put(deleteBankResponse(result.data));
  } catch (error) {
    yield put(deleteBankResponse({ message: error, status: 400 }));
  }
}

export { handlegetAllBank, handleAddBank, handleDeleteBank, handleUpdateBank };
