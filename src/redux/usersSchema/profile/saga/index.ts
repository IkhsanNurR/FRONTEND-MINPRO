import apiMethod from "@/pages/api/UsersSchema/Profile/apiMethod";
import { call, put } from "redux-saga/effects";
import { GetByNameOrEmailResponse, addAddressResponse, addEducationResponse, addEmailResponse, addExperienceResponse, addPhoneResponse, deleteAddressResponse, deleteEducationResponse, deleteEmailResponse, deleteExperienceResponse, deletePhoneResponse, editAddressResponse, editEducationResponse, editEmailResponse, editExperienceResponse, editPhoneResponse, updateProfileResponse } from "../action/actionReducer";

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

export function* handleAddAddress(action: any): any {
    try {
        const result = yield call(apiMethod.addAddress, { data: action.payload, id: action.id })
        yield put(addAddressResponse(result.data))
    } catch (error) {
        yield put(addAddressResponse({
            message: error,
            status: 400
        }))
    }
}

export function* handleEditAddress(action: any): any {
    try {
        const result = yield call(apiMethod.editAddress, { data: action.payload, id: action.id })
        yield put(editAddressResponse(result.data))
    } catch (error) {
        yield put(editAddressResponse({
            message: error,
            status: 400
        }))
    }
}

export function* handleDeleteAddress(action: any): any {
    try {
        const result = yield call(apiMethod.deleteAddress, action.payload)
        yield put(deleteAddressResponse(result.data))
    } catch (error) {
        yield put(deleteAddressResponse({
            message: error,
            status: 400
        }))
    }
}

export function* handleAddEducation(action: any): any {
    try {
        const result = yield call(apiMethod.addEducation, { data: action.payload, id: action.id })
        yield put(addEducationResponse(result.data))
    } catch (error) {
        yield put(addEducationResponse({
            message: error,
            status: 400
        }))
    }
}

export function* handleEditEducation(action: any): any {
    try {
        const result = yield call(apiMethod.editEducation, { data: action.payload, id: action.id })
        yield put(editEducationResponse(result.data))
    } catch (error) {
        yield put(editEducationResponse({
            message: error,
            status: 400
        }))
    }
}

export function* handleDeleteEducation(action: any): any {
    try {
        const result = yield call(apiMethod.deleteEducation, action.payload)
        yield put(deleteEducationResponse(result.data))
    } catch (error) {
        yield put(deleteEducationResponse({
            message: error,
            status: 400
        }))
    }
}

export function* handleAddExperience(action: any): any {
    try {
        const result = yield call(apiMethod.addExperience, { data: action.payload, id: action.id })
        yield put(addExperienceResponse(result.data))
    } catch (error) {
        yield put(addExperienceResponse({
            message: error,
            status: 400
        }))
    }
}

export function* handleEditExperience(action: any): any {
    try {
        const result = yield call(apiMethod.editExperience, { data: action.payload, id: action.id })
        yield put(editExperienceResponse(result.data))
    } catch (error) {
        yield put(editExperienceResponse({
            message: error,
            status: 400
        }))
    }
}

export function* handleDeleteExperience(action: any): any {
    try {
        const result = yield call(apiMethod.deleteExperience, action.payload)
        yield put(deleteExperienceResponse(result.data))
    } catch (error) {
        yield put(deleteExperienceResponse({
            message: error,
            status: 400
        }))
    }
}