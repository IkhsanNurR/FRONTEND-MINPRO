import apiMethod from '../../../api/apiMethod'
import {call, put} from 'redux-saga/effects'
import { resGetBootcampDaftarApply, resGetCandidatApply, resGetCandidatFiltering, resUpdateCandidatApply } from '../action/actionReducer'



export function * handleGetCandidatApply():any{
    try {
        const result = yield call(apiMethod.getCandidatApply)
        // console.log('saga',result)
        yield put(resGetCandidatApply(result.data))
    } catch (error) {
        yield put(resGetCandidatApply({message: error, status: 404}))
    }
}
export function * handleUpdateCandidatApply(action:any):any{
    try {
        const result = yield call(apiMethod.updateCandidatApply, action.payload)
        console.log('saga',result)
        yield put(resUpdateCandidatApply(result))
    } catch (error) {
        yield put(resUpdateCandidatApply({message: error, status: 404}))
    }
}
export function * handleGetCandidatFiltering():any{
    try {
        const result = yield call(apiMethod.getCandidatFiltering)
        // console.log('saga',result)
        yield put(resGetCandidatFiltering(result.data))
    } catch (error) {
        yield put(resGetCandidatFiltering({message: error, status: 404}))
    }
}