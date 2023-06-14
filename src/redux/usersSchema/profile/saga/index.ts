import apiMethod from "@/pages/api/UsersSchema/Profile/apiMethod";
import { call, put } from "redux-saga/effects";
import { GetByNameOrEmailResponse, addEmailResponse, addPhoneResponse, deleteEmailResponse, deletePhoneResponse, editEmailResponse, editPhoneResponse, updateProfileResponse } from "../action/actionReducer";

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

export function* handleAddEmail(action: any): any {
    try {
        const result = yield call(apiMethod.addEmail, { data: action.payload, id: action.id })
        yield put(addEmailResponse(result.data))
    } catch (error) {
        yield put(addEmailResponse({
            message: error,
            status: 400
        }))
    }
}

export function* handleEditEmail(action: any): any {
    try {
        const result = yield call(apiMethod.editEmail, { data: action.payload, id: action.id })
        yield put(editEmailResponse(result.data))
    } catch (error) {
        yield put(editEmailResponse({
            message: error,
            status: 400
        }))
    }
}

export function* handleDeleteEmail(action: any): any {
    try {
        const result = yield call(apiMethod.deleteEmail, action.payload)
        yield put(deleteEmailResponse(result.data))
    } catch (error) {
        yield put(deleteEmailResponse({
            message: error,
            status: 400
        }))
    }
}

export function* handleAddPhone(action: any): any {
    try {
        const result = yield call(apiMethod.addPhone, { data: action.payload, id: action.id })
        yield put(addPhoneResponse(result.data))
    } catch (error) {
        yield put(addPhoneResponse({
            message: error,
            status: 400
        }))
    }
}

export function* handleEditPhone(action: any): any {
    try {
        const result = yield call(apiMethod.editPhone, { data: action.payload, id: action.id, phonenumber: action.phonenumber })
        yield put(editPhoneResponse(result.data))
    } catch (error) {
        yield put(editPhoneResponse({
            message: error,
            status: 400
        }))
    }
}

export function* handleDeletePhone(action: any): any {
    try {
        const result = yield call(apiMethod.deletePhone, { id: action.id, phonenumber: action.phonenumber })
        yield put(deletePhoneResponse(result.data))
    } catch (error) {
        yield put(deletePhoneResponse({
            message: error,
            status: 400
        }))
    }
}