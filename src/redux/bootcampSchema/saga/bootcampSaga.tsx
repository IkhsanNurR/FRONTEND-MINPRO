import apiMethod from "@/api/bootcampSchema/apiMethod";
import { call, put } from "redux-saga/effects";
import {
  resApplyBatch,
  resCloseBootcamp,
  resCreateBootcamp,
  resDeleteBootcamp,
  resEditBootcamp,
  resExtendBootcamp,
  resGetBootcamp,
  resGetBootcampById,
  resGetBootcampDaftarApply,
  resGetBootcampIndex,
  resPendingBootcamp,
  resSetToRunningBootcamp,
} from "../action/actionReducer";

export function* handleGetBootcamp(): any {
  try {
    const result = yield call(apiMethod.getBootcamp);
    // console.log('sagaget',result)
    yield put(resGetBootcamp(result.data));
  } catch (error) {
    yield put(resGetBootcamp({ message: error, status: 404 }));
  }
}
export function* handleGetBootcampIndex(): any {
  try {
    const result = yield call(apiMethod.getBootcampIndex);
    // console.log('sagaget',result)
    yield put(resGetBootcampIndex(result.data));
  } catch (error) {
    yield put(resGetBootcampIndex({ message: error, status: 404 }));
  }
}
export function* handleCreateBootcamp(action: any): any {
  try {
    const result = yield call(apiMethod.createBootcamp, action.payload);
    // console.log('sagahahal',result)
    yield put(resCreateBootcamp(result.data));
  } catch (error) {
    yield put(resCreateBootcamp({ message: error, status: 404 }));
  }
}
export function* handleApplyBatch(action: any): any {
  try {
    const result = yield call(apiMethod.createApplyBatch, action.payload);
    console.log("saga", result);
    yield put(resApplyBatch(result.data));
  } catch (error) {
    yield put(resApplyBatch({ message: error, status: 404 }));
  }
}

export function* handleGetBootcampById(action: any): any {
  try {
    const result = yield call(apiMethod.getBootcampById, action.payload);
    // console.log('saga',result)
    yield put(resGetBootcampById(result.data));
  } catch (error) {
    yield put(resGetBootcampById({ message: error, status: 404 }));
  }
}
export function* handleEditBootcamp(action: any): any {
  try {
    const result = yield call(apiMethod.editBootcamp, action.payload);
    // console.log('saga',result)
    yield put(resEditBootcamp(result.data));
  } catch (error) {
    yield put(resEditBootcamp({ message: error, status: 404 }));
  }
}
export function* handleCloseBootcamp(action: any): any {
  try {
    const result = yield call(apiMethod.closeBootcamp, action.payload);
    // console.log('sagaClose',result)
    yield put(resCloseBootcamp(result.data));
  } catch (error) {
    yield put(resCloseBootcamp({ message: error, status: 404 }));
  }
}
export function* handlePendingBootcamp(action: any): any {
  try {
    const result = yield call(apiMethod.pendingBootcamp, action.payload);
    // console.log('sagaClose',result)
    yield put(resPendingBootcamp(result.data));
  } catch (error) {
    yield put(resPendingBootcamp({ message: error, status: 404 }));
  }
}
export function* handleExtendBootcamp(action: any): any {
  try {
    const result = yield call(apiMethod.extendBootcamp, action.payload);
    console.log("sagaClose", result);
    yield put(resExtendBootcamp(result.data));
  } catch (error) {
    yield put(resExtendBootcamp({ message: error, status: 404 }));
  }
}
export function* handleDeleteBootcamp(action: any): any {
  try {
    const result = yield call(apiMethod.deleteBootcamp, action.payload);
    // console.log('saga',result)
    yield put(resDeleteBootcamp(result.data));
  } catch (error) {
    yield put(resDeleteBootcamp({ message: error, status: 404 }));
  }
}
export function* handleSetToRunningBootcamp(action: any): any {
  try {
    const result = yield call(apiMethod.setToRunningBootcamp, action.payload);
    // console.log('saga',result)
    yield put(resSetToRunningBootcamp(result.data));
  } catch (error) {
    yield put(resSetToRunningBootcamp({ message: error, status: 404 }));
  }
}
