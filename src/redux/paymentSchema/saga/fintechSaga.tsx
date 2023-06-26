import fintechMethod from '../../../api/paymentSchma/fintechMethod'
import {call,put} from 'redux-saga/effects'
import { doGetFintechResponse,doAddFintechResponse, doFintechUpdateResponse, deleteFintechResponse } from '../action/ActionReducer'

function* handlegetAllFintech(): any {
    try {
      const result = yield call(fintechMethod.findAllFintech);
      yield put(doGetFintechResponse(result.data));
    } catch (error) {
      yield put(doGetFintechResponse({ message: error, status: 400 }));
    }
  }
  
  function* handleAddFintech(action: any): any {
    try {
      const result = yield call(fintechMethod.createFintech, action.payload);
      console.log("objectasss", action.payload);
      yield put(doAddFintechResponse(result.data));
    } catch (error) {
      yield put(doAddFintechResponse({ message: error, status: 400 }));
    }
  }
  
  function* handleUpdateFintech(action: any): any {
    // console.log("acti1on");
    try {
      const result = yield call(fintechMethod.updateFintech, action.payload);
      // console.log("object");
      yield put(doFintechUpdateResponse(result.data));
    } catch (error) {
      yield put(doFintechUpdateResponse({ message: error, status: 400 }));
    }
  }
  
  function* handleDeleteFintech(action: any): any {
    try {
      console.log(action.payload);
      const result = yield call(fintechMethod.deleteFintechById, action.payload);
      yield put(deleteFintechResponse(result.data));
    } catch (error) {
      yield put(deleteFintechResponse({ message: error, status: 400 }));
    }
  }

export {
    handlegetAllFintech,
    handleAddFintech,
    handleUpdateFintech,
    handleDeleteFintech
}