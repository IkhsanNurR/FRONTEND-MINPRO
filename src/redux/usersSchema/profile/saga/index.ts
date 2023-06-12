import apiMethod from "@/pages/api/UsersSchema/Profile/apiMethod";
import { call, put } from "redux-saga/effects";
import {GetByNameOrEmailResponse } from "../action/actionReducer";

export function* handleGetByNameOrEmail(action: any): any {
    try {
        const res = yield call(apiMethod.getUsersByUsernameOrEmail, action.payload)
        yield put(GetByNameOrEmailResponse(res.data))
    } catch (error) {
        yield put(GetByNameOrEmailResponse({
            message: error,
            status: 400
        }))
    }
}


