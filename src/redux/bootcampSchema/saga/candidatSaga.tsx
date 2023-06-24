import apiMethod from '../../../api/bootcampSchema/apiMethod'
import {call, put} from 'redux-saga/effects'
import { resGetBootcampDaftarApply, resGetCandidatApply, resGetCandidatContract, resGetCandidatDisqualified, resGetCandidatFiltering, resGetCandidatNotResponding, resUpdateCandidatApply, resUpdateCandidatContract, resUpdateCandidatDisqualified, resUpdateCandidatFiltering, resUpdateCandidatNotResponding } from '../action/actionReducer'

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
export function * handleUpdateCandidatFiltering(action:any):any{
    try {
        const result = yield call(apiMethod.updateCandidatFiltering, action.payload)
        // console.log('saga',result)
        yield put(resUpdateCandidatFiltering(result.data))
    } catch (error) {
        yield put(resUpdateCandidatFiltering({message: error, status: 404}))
    }
}
export function * handleGetCandidatContract():any{
    try {
        const result = yield call(apiMethod.getCandidatContract)
        // console.log('saga',result)
        yield put(resGetCandidatContract(result.data))
    } catch (error) {
        yield put(resGetCandidatContract({message: error, status: 404}))
    }
}
export function * handleUpdateCandidatContract(action:any):any{
    try {
        const result = yield call(apiMethod.updateCandidatContract, action.payload)
        // console.log('saga',result)
        yield put(resUpdateCandidatContract(result.data))
    } catch (error) {
        yield put(resUpdateCandidatContract({message: error, status: 404}))
    }
}
export function * handleGetCandidatDisqualified():any{
    try {
        const result = yield call(apiMethod.getCandidatDisqualified)
        // console.log('saga',result)
        yield put(resGetCandidatDisqualified(result.data))
    } catch (error) {
        yield put(resGetCandidatDisqualified({message: error, status: 404}))
    }
}
export function * handleUpdateCandidatDisqualified(action:any):any{
    try {
        const result = yield call(apiMethod.updateCandidatDisqualified, action.payload)
        // console.log('saga',result)
        yield put(resUpdateCandidatDisqualified(result.data))
    } catch (error) {
        yield put(resUpdateCandidatDisqualified({message: error, status: 404}))
    }
}
export function * handleGetCandidatNotResponding():any{
    try {
        const result = yield call(apiMethod.getCandidatNotResponding)
        // console.log('saga',result)
        yield put(resGetCandidatNotResponding(result.data))
    } catch (error) {
        yield put(resGetCandidatNotResponding({message: error, status: 404}))
    }
}
export function * handleUpdateCandidatNotResponding(action:any):any{
    try {
        const result = yield call(apiMethod.updateCandidatNotResponding, action.payload)
        // console.log('saga',result)
        yield put(resUpdateCandidatNotResponding(result.data))
    } catch (error) {
        yield put(resUpdateCandidatNotResponding({message: error, status: 404}))
    }
}