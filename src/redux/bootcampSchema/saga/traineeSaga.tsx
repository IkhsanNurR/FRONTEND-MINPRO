import apiMethod from '../../../api/apiMethod'
import {call, put} from 'redux-saga/effects'
import { resGetTraineeById, resGetTrainer } from '../action/actionReducer'


export function * handleGetTraineeById(action:any):any{
    try {
        const result = yield call(apiMethod.getTraineebyId, action.payload)
        // console.log('saga',result.data)
        yield put(resGetTraineeById(result.data))
    } catch (error) {
        yield put(resGetTraineeById({message: error, status: 404}))
    }
}