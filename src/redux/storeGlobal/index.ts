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

import ClientReducers from "../jobhireSchema/jobHireSchema/reducer/clientReducer";
import EmprangeReducers from "../jobhireSchema/jobHireSchema/reducer/empRangeReducer";
import JobPhotoReducers from "../jobhireSchema/jobHireSchema/reducer/jobPhotoReducer";
import JobPostReducers from "../jobhireSchema/jobHireSchema/reducer/jobPostReducer";
import TalentReducers from "../jobhireSchema/jobHireSchema/reducer/talentReducer";
import CityReducers from "../jobhireSchema/master-jobhireSchema/reducer/cityReducer";
import EducationReducers from "../jobhireSchema/master-jobhireSchema/reducer/educationReducer";
import IndustryReducers from "../jobhireSchema/master-jobhireSchema/reducer/industryReducer";
import JobroleReducers from "../jobhireSchema/master-jobhireSchema/reducer/jobroleReducer";
import RouteactionReducers from "../jobhireSchema/master-jobhireSchema/reducer/routeactionReducer";
import WorktypeReducers from "../jobhireSchema/master-jobhireSchema/reducer/worktypeReducer";

const logger = createLogger();
const saga = createSagaMiddleware();
const reducer = combineReducers({
  authReducers,
  userProfileReducers,
  pontycodeReducers,
  cityReducers,
  addreetypeReducers,
  skilltypeReducers,
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

  //jobhire
  CityReducers,
  JobPostReducers,
  ClientReducers,
  TalentReducers,
  EducationReducers,
  WorktypeReducers,
  JobroleReducers,
  IndustryReducers,
  EmprangeReducers,
  JobPhotoReducers,
  RouteactionReducers,
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
