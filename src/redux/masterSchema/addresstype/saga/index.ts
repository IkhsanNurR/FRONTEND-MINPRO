import apiMethod from "@/pages/api/masterSchema/addresstype/apiMethod";
import { call, put } from "redux-saga/effects";
import { getAddressTypeResponse } from "../action/actionReducer";

export function* handleGetAddressType(): any {
    try {
        const res = yield call(apiMethod.getAddressType)
        yield put(getAddressTypeResponse(res.data))
    } catch (error) {
        yield put(getAddressTypeResponse({
            message: error,
            status: 400
        }))
    }
}