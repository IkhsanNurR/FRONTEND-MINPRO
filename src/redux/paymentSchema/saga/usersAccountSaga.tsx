import userAccountMethod from '../../../api/paymentSchma/userAccountMethod'
import {call,put} from 'redux-saga/effects'
import { doGetUsersAccountResponse,doAddAccountResponse, doUsersAccountUpdateResponse, deleteUsersAccountResponse } from '../action/ActionReducer'

function* handlegetAllUsersAccount():any {
    // console.log("wadwa");
    try {
        const result = yield call(userAccountMethod.findAlUsersAccount)
        yield put (doGetUsersAccountResponse(result.data))
    } catch (error) {
        yield put(doGetUsersAccountResponse({message:error,status:400}))
    }
}
  
  function* handleaddUserAccount(action: any): any {
    // console.log("object");
    try {
      const result = yield call(userAccountMethod.createUsersAccount, action.payload);
      // console.log("object");
      yield put(doAddAccountResponse(result.data));
    } catch (error) {
      yield put(doAddAccountResponse({ message: error, status: 400 }));
    }
  }
  
  function* handleUpdateUsersAccount(action: any): any {
    // console.log("acti1on");
    try {
      const result = yield call(userAccountMethod.updateUsersAccount, action.payload);
      // console.log("object");
      yield put(doUsersAccountUpdateResponse(result.data));
    } catch (error) {
      yield put(doUsersAccountUpdateResponse({ message: error, status: 400 }));
    }
  }
  
  function* handleDeleteUsersAccount(action: any): any {
    try {
      console.log(action.payload);
      const result = yield call(userAccountMethod.deleteUsersAccount, action.payload);
      yield put(deleteUsersAccountResponse(result.data));
    } catch (error) {
      yield put(deleteUsersAccountResponse({ message: error, status: 400 }));
    }
  }

export {
    handlegetAllUsersAccount,
    handleaddUserAccount,
    handleUpdateUsersAccount,
    handleDeleteUsersAccount
}