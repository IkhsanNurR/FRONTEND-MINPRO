import { createLogger } from "redux-logger";
import createSagaMiddleware from "@redux-saga/core";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducers from "../usersSchema/auth/reducer/authReducer";
import userProfileReducers from "../usersSchema/profile/reducer/profileReducer";
import rootSaga from "@/redux/sagaGlobal";
import pontycodeReducers from "../usersSchema/pontycode/reducer/pontycodeReducer";
import cityReducers from "../masterSchema/city/reducer/cityReducer";
import addreetypeReducers from "../masterSchema/addresstype/reducer/addresstypeReducer";
import skilltypeReducers from "../masterSchema/skillType/reducer/skilltypeReducer";
import jobReducers from "../jobhireSchema/reducer/jobReducer";
import talentReducer from "../bootcampSchema/reducer/talentReducer";
import evaluationReducer from "../bootcampSchema/reducer/evaluationReducer";
import candidateNotRespondingReducer from "../bootcampSchema/reducer/candidatNotResponding";
import traineeReducer from "../bootcampSchema/reducer/traineeReducer";
import candidateDisqualifiedReducer from "../bootcampSchema/reducer/candidatDisqualifiedReducer";
import candidateContractReducer from "../bootcampSchema/reducer/candidatContractReducer";
import candidateFilteringReducer from "../bootcampSchema/reducer/candidatFiltering";
import candidateApplyReducer from "../bootcampSchema/reducer/candidatApplyReducer";
import trainerReducer from "../bootcampSchema/reducer/trainerReducer";
import orangApplyReducer from "../bootcampSchema/reducer/orangApplyReducer";
import prognameReducer from "../bootcampSchema/reducer/prognameReducer";
import bootcampReducer from "../bootcampSchema/reducer/bootcampReducer";

const logger = createLogger();
const saga = createSagaMiddleware();
const reducer = combineReducers({
  authReducers,
  userProfileReducers,
  pontycodeReducers,
  cityReducers,
  addreetypeReducers,
  skilltypeReducers,
  jobReducers,
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
  talentReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(logger)
      .concat(saga),
});

saga.run(rootSaga);

export default store;
