import { call, put } from "redux-saga/effects";
import apiMethod from "@/api/salesSchema/apiMethod";

import {
  doGetSalesOrderResponse,
  doAddSalesOrderResponse,
  //  doUpdateSalesOrderResponse,
  doDeleteSalesOrderResponse,
} from "../../salesSchema/action/actionReducer";

export function* handleGetAllSalesOrder(): any {
  try {
    const result = yield call(apiMethod.findAllSalesOrder);
    console.log("logsalesorderget", result);

    yield put(doGetSalesOrderResponse(result.data[0]));
  } catch (error: any) {
    return error.message;
  }
}

export function* handleAddSalesOrder(action: any): any {
  try {
    const result = yield call(apiMethod.createSalesOrder, action.payload);
    yield put(doAddSalesOrderResponse(result.data[0]));
  } catch (error: any) {
    yield put(doAddSalesOrderResponse({ message: error.message, status: 400 }));
  }
}

// export function* handleUpdateSalesOrder(action: any): any {
//     try {
//         const result = yield call(apiMethod.updateSalesOrder, action.payload)
//         yield put(doUpdateSalesOrderResponse(result.data[0]))
//     } catch (error: any) {
//         yield put(doUpdateSalesOrderResponse({ message: error.message, status: 400 }))
//     }
// }
export function* handleDeleteSalesOrder(action: any): any {
  try {
    const result = yield call(apiMethod.deleteSalesOrder, action.payload);
    yield put(doDeleteSalesOrderResponse(result.data[0]));
  } catch (error: any) {
    yield put(
      doDeleteSalesOrderResponse({ message: error.message, status: 400 })
    );
  }
}
