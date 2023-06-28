import { call, put } from "redux-saga/effects";
import apiMethod from "@/api/salesSchema/apiMethod";
import {
  doAddSpecialOfferResponse,
  doGetSpecialOfferResponse,
  doDeleteSpecialOfferResponse,
} from "../../salesSchema/action/actionReducer";

export function* handleGetAllSpecialOffer(): any {
  try {
    const result = yield call(apiMethod.findAllSpecialOffer);
    // console.log('cobasagaspecialoffer', result)
    yield put(doGetSpecialOfferResponse(result));
  } catch (error: any) {
    return error.message;
  }
}

export function* handleAddSpecialOffer(action: any): any {
  try {
    const result = yield call(apiMethod.createSpecialOffer, action.payload);
    yield put(doAddSpecialOfferResponse(result.data[0]));
  } catch (error: any) {
    yield put(
      doAddSpecialOfferResponse({ message: error.message, status: 400 })
    );
  }
}

// export function* handleUpdateSpecialOffer(action: any): any {
//     try {
//         const result = yield call(apiMethod.updateSpecialOffer, action.payload)
//         yield put(doUpdateSpecialOfferResponse(result.data[0]))
//     } catch (error: any) {
//         yield put(doUpdateSpecialOfferResponse({ message: error.message, status: 400 }))
//     }
// }

export function* handleDeleteSpecialOffer(action: any): any {
  try {
    const result = yield call(apiMethod.deleteSpecialOffer, action.payload);
    yield put(doDeleteSpecialOfferResponse(result.data[0]));
  } catch (error: any) {
    yield put(
      doDeleteSpecialOfferResponse({ message: error.message, status: 400 })
    );
  }
}
