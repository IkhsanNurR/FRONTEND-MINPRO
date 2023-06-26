import Topup from '../../../api/paymentSchma/topupMethod'
import {call,put} from 'redux-saga/effects'
import { doAddTOPUPResponse } from '../action/ActionReducer'

function* handlegetTOPUP(action:any):any {
    try {
        const result = yield call(Topup.TopupAccount, action.payload);
        yield put (doAddTOPUPResponse(result.data))
    } catch (error) {
        yield put(doAddTOPUPResponse({message:error,status:400}))
    }
}

export {
    handlegetTOPUP
}