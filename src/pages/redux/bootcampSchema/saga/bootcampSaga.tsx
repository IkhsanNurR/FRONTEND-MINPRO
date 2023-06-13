import apiMethod from '../../../api/apiMethod'
import {call, put} from 'redux-saga/effects'
import { resGetBootcamp, resGetBootcampById, resGetBootcampDaftarApply } from '../action/actionReducer'


export function * handleGetBootcamp():any{
    try {
        const result = yield call(apiMethod.getBootcamp)
        // console.log('saga',result)
        yield put(resGetBootcamp(result.data))
    } catch (error) {
        yield put(resGetBootcamp({message: error, status: 404}))
    }
}

export function * handleGetBootcampById(action:any):any{
    try {
        const result = yield call(apiMethod.getBootcampById, action.payload)
        // console.log('saga',result)
        yield put(resGetBootcampById(result.data))
    } catch (error) {
        yield put(resGetBootcampById({message: error, status: 404}))
    }
}

// export function * handleGetBootcampDaftarApply():any{
//     try {
//         const result = yield call(apiMethod.getBootcampDraftApply)
//         console.log('saga',result)
//         yield put(resGetBootcampDaftarApply(result.data))
//     } catch (error) {
//         yield put(resGetBootcampDaftarApply({message: error, status: 404}))
//     }
// }