import apiMethod from "@/pages/api/UsersSchema/Profile/apiMethod";
import { call, put } from "redux-saga/effects";
import { GetByNameOrEmailResponse, updateProfileResponse } from "../action/actionReducer";

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


export function* handleUpdateProfile(action: any): any {
    try {
        const result = yield call(apiMethod.updateProfile, { data: action.payload, id: action.id })
        yield put(updateProfileResponse(result.data))
    } catch (error) {
        yield put(updateProfileResponse({
            message: error,
            status: 400
        }))
    }
}