import apiMethod from '../../../api/apiMethod'
import {call, put} from 'redux-saga/effects'
import { resEvaluationDetail, resEvaluationStatus, resGetTraineeById, resGetTrainer } from '../action/actionReducer'


export function * handleEvaluationDetail(action:any):any{
    try {
        const result = yield call(apiMethod.evaluationDetail, action.payload)
        console.log('saga',result)
        yield put(resEvaluationDetail(result.data))
    } catch (error) {
        yield put(resEvaluationDetail({message: error, status: 404}))
    }
}
export function * handleEvaluationStatus(action:any):any{
    try {
        const result = yield call(apiMethod.editStatusEvaluation, action.payload)
        // console.log('saga',result.data)
        yield put(resEvaluationStatus(result.data))
    } catch (error) {
        yield put(resEvaluationStatus({message: error, status: 404}))
    }
}