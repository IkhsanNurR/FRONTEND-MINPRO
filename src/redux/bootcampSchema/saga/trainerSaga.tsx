import apiMethod from '../../../api/apiMethod'
import {call, put} from 'redux-saga/effects'
import { resGetTrainer } from '../action/actionReducer'


export function * handleGetTrainer():any{
    try {
        const result = yield call(apiMethod.getTrainer)
        // console.log('saga',result)
        yield put(resGetTrainer(result.data))
    } catch (error) {
        yield put(resGetTrainer({message: error, status: 404}))
    }
}