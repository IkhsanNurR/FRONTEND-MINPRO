import apiMethod from "@/api/CurriculumSchema/apiMethod";
import { call, put } from "redux-saga/effects";
import {
  getEmployeeResponse,
  reqUpdateCurriculum,
  resCreateCurriculum,
  resCreateSection,
  resCreateSectionDetail,
  resGetCurrNum,
  resGetCurriculum,
  resGetIdCurriculum,
  resGetSectionMergeRes,
  resUpdateCurriculum,
} from "../action/actionReducer";
// import { resGetBootcampById } from '../../bootcampSchema/action/actionReducer'

export function* handleGetCurriculum(): any {
  try {
    const result = yield call(apiMethod.getCurriculum);
    yield put(resGetCurriculum(result.data));
    // console.log("saga",result.data);
  } catch (error) {
    yield put(resGetCurriculum({ message: error, status: 404 }));
  }
}

export function* handleGetCurriculumByid(action: any): any {
  try {
    const result = yield call(apiMethod.getCurriculumById, action.payload);
    yield put(resGetIdCurriculum(result.data));
    // console.log("saga",result.data);getCurriculumById
  } catch (error) {
    yield put(resGetIdCurriculum({ message: error, status: 404 }));
  }
}

export function* handleCreateCurriculum(action: any): any {
  try {
    const pay = action.payload;
    console.log("paynya", ...pay);
    const result = yield call(apiMethod.createCurriculum, action.payload);
    // console.log('saaaga',result);
    yield put(resCreateCurriculum(result.data));
  } catch (error) {
    yield put(resCreateCurriculum({ message: error, status: 404 }));
  }
}

export function* handleUpdateCurriculum(action: any): any {
  console.log("saaaga", action);
  try {
    // const pay = action.payload
    // console.log('paynya', ...pay)
    const result = yield call(apiMethod.updateCurriculum, action.payload);
    yield put(resUpdateCurriculum(result.data));
  } catch (error) {
    yield put(resUpdateCurriculum({ message: error, status: 404 }));
  }
}

export function* handleGetCurrNum(): any {
  try {
    const result = yield call(apiMethod.getCurrNum);
    yield put(resGetCurrNum(result.data));
  } catch (error) {
    yield put(resGetCurrNum({ message: error, status: 404 }));
  }
}

export function* handleGetUserEmployee(): any {
  try {
    const res = yield call(apiMethod.getUserEmployee);
    yield put(getEmployeeResponse(res.data.data));
  } catch (error) {
    yield put(
      getEmployeeResponse({
        message: error,
        status: 400,
      })
    );
  }
}
export function* handleCreateSectionDetail(action: any): any {
  try {
    const result = yield call(
      apiMethod.createSectionDetail,
      action.id,
      action.payload
    );
    yield put(resCreateSectionDetail(result.data));
  } catch (error) {
    yield put(resCreateSectionDetail({ message: error, status: 400 }));
  }
}

export function* handleCreateSection(action: any): any {
  try {
    const result = yield call(apiMethod.createSection, action.payload);
    yield put(resCreateSection(result.data));
  } catch (error) {
    yield put(resCreateSection({ message: error, status: 400 }));
  }
}

export function* handleGetSectionMerge(): any {
  try {
    const result = yield call(apiMethod.sectionMerge);
    // console.log(result.data, 'hai');
    yield put(resGetSectionMergeRes(result.data.mergedData));
  } catch (error) {
    yield put(resGetSectionMergeRes({ message: error, status: 400 }));
  }
}
