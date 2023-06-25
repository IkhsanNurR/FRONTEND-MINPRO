import { call, put } from "redux-saga/effects";
import apiMethod from "../../../../api/jobhireSchema/apiMethod";
import {
  doResponseAddClient,
  doResponseDeleteClient,
  doResponseGetClient,
  doResponseGetClientById,
  doResponseUpdateClient,
} from "../action/actionReducer";

export function* handleGetAllClient(): any {
  try {
    const result = yield call(apiMethod.allClientAll);
    yield put(doResponseGetClient(result.data));
  } catch (error) {
    yield put(doResponseGetClient({ message: error, status: 400 }));
  }
}

export function* handleGetClientById(action: any): any {
  try {
    const result = yield call(apiMethod.clientById, action.payload);
    yield put(doResponseGetClientById(result.data.result[0]));
  } catch (error) {
    yield put(doResponseGetClientById({ message: error, status: 400 }));
  }
}

export function* handleAddClient(action: any): any {
  try {
    const result = yield call(apiMethod.createClient, action.payload);
    yield put(doResponseAddClient(result.data));
  } catch (error) {
    yield put(doResponseAddClient({ message: error, status: 400 }));
  }
}

export function* handleUpdateClient(action: any): any {
  try {
    const result = yield call(apiMethod.updateClient, action.payload);
    yield put(doResponseUpdateClient(result.data));
  } catch (error) {
    yield put(doResponseUpdateClient({ message: error, status: 400 }));
  }
}

export function* handleDeleteClient(action: any): any {
  try {
    const result = yield call(apiMethod.deleteClient, action.payload);
    console.log(result);
    yield put(doResponseDeleteClient(result.data));
  } catch (error) {
    yield put(doResponseDeleteClient({ message: error, status: 400 }));
  }
}
