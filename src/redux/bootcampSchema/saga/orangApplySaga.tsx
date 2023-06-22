import apiMethod from '../../../api/bootcampSchema/apiMethod'
import {call, put} from 'redux-saga/effects'
import { resGetBootcampDaftarApply } from '../action/actionReducer'



export function * handleGetBootcampDaftarApply():any{
    try {
        const result = yield call(apiMethod.getBootcampDraftApply)
        // console.log('saga',result)
        yield put(resGetBootcampDaftarApply(result.data))
    } catch (error) {
        yield put(resGetBootcampDaftarApply({message: error, status: 404}))
    }
}