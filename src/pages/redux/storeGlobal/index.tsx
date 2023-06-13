import { configureStore } from "@reduxjs/toolkit";
import createMiddleware from '@redux-saga/core'
import {createLogger} from 'redux-logger'
import bootcampReducer from '../bootcampSchema/reducer/bootcampReducer'
import prognameReducer from '../bootcampSchema/reducer/prognameReducer'
import orangApplyReducer from '../bootcampSchema/reducer/orangApplyReducer'
import trainerReducer from "../bootcampSchema/reducer/trainerReducer";
import candidateApplyReducer from "../bootcampSchema/reducer/candidatApplyReducer";
import candidateFilteringReducer from '../bootcampSchema/reducer/candidatFiltering'
import { combineReducers } from 'redux'
import rootSaga from '../sagaGlobal'

const logger = createLogger()
const saga = createMiddleware()
const reducer = combineReducers({
        bootcampReducer,
        prognameReducer,
        orangApplyReducer,
        trainerReducer,
        candidateApplyReducer,
        candidateFilteringReducer
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
