import { createLogger } from "redux-logger";
import createSagaMiddleware from "@redux-saga/core";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducers from "../usersSchema/auth/reducer/authReducer";
import userProfileReducers from "../usersSchema/profile/reducer/profileReducer";
import rootSaga from '@/redux/sagaGlobal'
import pontycodeReducers from "../usersSchema/pontycode/reducer/pontycodeReducer";

const logger = createLogger()
const saga = createSagaMiddleware()
const reducer = combineReducers({
    authReducers,
    userProfileReducers,
    pontycodeReducers
})

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(logger).concat(saga)
})

saga.run(rootSaga)

export default store