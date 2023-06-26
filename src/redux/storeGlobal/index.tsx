import { configureStore } from "@reduxjs/toolkit";
import createMiddleware from '@redux-saga/core'
import {createLogger} from 'redux-logger'
import bootcampReducer from '../bootcampSchema/reducer/bootcampReducer'
import prognameReducer from '../bootcampSchema/reducer/prognameReducer'
import orangApplyReducer from '../bootcampSchema/reducer/orangApplyReducer'
import trainerReducer from "../bootcampSchema/reducer/trainerReducer";
import candidateApplyReducer from "../bootcampSchema/reducer/candidatApplyReducer";
import candidateFilteringReducer from '../bootcampSchema/reducer/candidatFiltering'
import candidateContractReducer from '../bootcampSchema/reducer/candidatContractReducer'
import candidateDisqualifiedReducer from '../bootcampSchema/reducer/candidatDisqualifiedReducer'
import candidateNotRespondingReducer from '../bootcampSchema/reducer/candidatNotResponding'
import traineeReducer from '../bootcampSchema/reducer/traineeReducer'
import evaluationReducer from '../bootcampSchema/reducer/evaluationReducer'
import bankReducer from "../paymentSchema/reducer/BankReducer"
import fintechReducer from "../paymentSchema/reducer/FintechReducer"
import AccountReducer from "../paymentSchema/reducer/AccountReducer";
import { combineReducers } from 'redux'
import rootSaga from '../sagaGlobal'
import transactionReducer from "../paymentSchema/reducer/TransactionReducer";
import topupReducer from "../paymentSchema/reducer/TopupReducer";

const logger = createLogger()
const saga = createMiddleware()
const reducer = combineReducers({
        bootcampReducer,
        prognameReducer,
        orangApplyReducer,
        trainerReducer,
        candidateApplyReducer,
        candidateFilteringReducer,
        candidateContractReducer,
        candidateDisqualifiedReducer,
        candidateNotRespondingReducer,
        traineeReducer,
        evaluationReducer,
        bankReducer,
        fintechReducer,
        AccountReducer,
        transactionReducer,
        topupReducer
})

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(logger).concat(saga)
})

saga.run(rootSaga)
export default store
