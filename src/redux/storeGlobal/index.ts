import { createLogger } from "redux-logger";
import createSagaMiddleware from "@redux-saga/core";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducers from "../usersSchema/auth/reducer/authReducer";
import userProfileReducers from "../usersSchema/profile/reducer/profileReducer";
import rootSaga from '@/redux/sagaGlobal'
import pontycodeReducers from "../usersSchema/pontycode/reducer/pontycodeReducer";
import cityReducers from "../masterSchema/city/reducer/cityReducer";
import addreetypeReducers from "../masterSchema/addresstype/reducer/addresstypeReducer";
import skilltypeReducers from "../masterSchema/skillType/reducer/skilltypeReducer";

const logger = createLogger()
const saga = createSagaMiddleware()
const reducer = combineReducers({
    authReducers,
    userProfileReducers,
    pontycodeReducers,
    cityReducers,
    addreetypeReducers,
    skilltypeReducers
})

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(logger).concat(saga)
})

saga.run(rootSaga)

export default store