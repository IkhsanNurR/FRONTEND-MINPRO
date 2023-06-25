import { all, takeEvery } from "redux-saga/effects";
import AuthActionTypes from "../usersSchema/auth/action/actionType";
import {
  handleLogin,
  handleSignupExternal,
  handleSignupInternal,
} from "../usersSchema/auth/saga";
import UserProfileActionType from "../usersSchema/profile/action/actionType";
import {
  handleAddAddress,
  handleAddEducation,
  handleAddEmail,
  handleAddExperience,
  handleAddPhone,
  handleAddResume,
  handleAddSkill,
  handleApplyJob,
  handleChangePassword,
  handleDeleteAddress,
  handleDeleteEducation,
  handleDeleteEmail,
  handleDeleteExperience,
  handleDeletePhone,
  handleDeleteResume,
  handleDeleteSkil,
  handleEditAddress,
  handleEditEducation,
  handleEditEmail,
  handleEditExperience,
  handleEditPhone,
  handleGetByNameOrEmail,
  handleUpdateProfile,
} from "../usersSchema/profile/saga";
import pontyCodeActionType from "../usersSchema/pontycode/action/actionType";
import { handleGetPontycode } from "../usersSchema/pontycode/saga";
// import { handleGetCity } from "../masterSchema/city/saga";
// import { handleGetSkillType } from "../masterSchema/skillType/saga";
import jobhireActionType from "../jobhireSchema/jobHireSchema/action/actionType";
import masterJobHireActionType from "../jobhireSchema/master-jobhireSchema/action/actionType";
import ActionType from "../bootcampSchema/action/actionType";
import {
  handleApplyBatch,
  handleCloseBootcamp,
  handleCreateBootcamp,
  handleDeleteBootcamp,
  handleEditBootcamp,
  handleExtendBootcamp,
  handleGetBootcamp,
  handleGetBootcampById,
  handleGetBootcampIndex,
  handlePendingBootcamp,
  handleSetToRunningBootcamp,
} from "../bootcampSchema/saga/bootcampSaga";
import { handleGetProgName } from "../bootcampSchema/saga/prognameSaga";
import { handleGetBootcampDaftarApply } from "../bootcampSchema/saga/orangApplySaga";
import { handleGetTrainer } from "../bootcampSchema/saga/trainerSaga";
import { handleGetTraineeById } from "../bootcampSchema/saga/traineeSaga";
import {
  handleEvaluationDetail,
  handleEvaluationStatus,
} from "../bootcampSchema/saga/evaluationSaga";
import {
  handleGetCandidatApply,
  handleGetCandidatContract,
  handleGetCandidatDisqualified,
  handleGetCandidatFiltering,
  handleGetCandidatNotResponding,
  handleUpdateCandidatApply,
  handleUpdateCandidatContract,
  handleUpdateCandidatDisqualified,
  handleUpdateCandidatFiltering,
  handleUpdateCandidatNotResponding,
} from "../bootcampSchema/saga/candidatSaga";
import { handleGetTalent } from "../bootcampSchema/saga/talentSaga";
import {
  handleAddJobPost,
  handleDeleteJobPost,
  handleGetAllJobPost,
  handleGetCurnumber,
  handleGetJobPostById,
  handleGetSearchJobPost,
  handleUpdateJobPost,
  handleUpdateStatus,
} from "../jobhireSchema/jobHireSchema/saga/jobPostSaga";
import {
  handleGetAllClient,
  handleGetClientById,
  handleAddClient,
  handleUpdateClient,
  handleDeleteClient,
} from "../jobhireSchema/jobHireSchema/saga/clientSaga";
import { handleGetEmprange } from "../jobhireSchema/jobHireSchema/saga/empRangeSaga";
import { handleGetPhoto } from "../jobhireSchema/jobHireSchema/saga/photoSaga";
import {
  handleGetProCandidate,
  handleUpdateCandidate,
} from "../jobhireSchema/jobHireSchema/saga/talentSaga";
import { handleGetEducationJobHire } from "../jobhireSchema/master-jobhireSchema/saga/educationSaga";
import { handleGetWorktypeJobHire } from "../jobhireSchema/master-jobhireSchema/saga/worktypeSaga";
import { handleGetJobroleJobHire } from "../jobhireSchema/master-jobhireSchema/saga/jobroleSaga";
import { handleGetIndustryJobHire } from "../jobhireSchema/master-jobhireSchema/saga/industrySaga";
import { handleGetRoacJobHire } from "../jobhireSchema/master-jobhireSchema/saga/routeactionSaga";
import { handleGetCityJobHire } from "../jobhireSchema/master-jobhireSchema/saga/citySaga";
import ActionTypes from "../MasterBaruSchema/actions/actionType";
import {
  handleCreateCat,
  handleDelCat,
  handleGetCat,
  handleupdateCat,
} from "../MasterBaruSchema/saga/catSaga";
import {
  handleCreateSkillType,
  handleDelSkillType,
  handleGeSkillType,
  handleUpdateSkillType,
} from "../MasterBaruSchema/saga/skillType";
import {
  handleCreateSkillTemplete,
  handleDelSkillTemplete,
  handleGetSkillTemplete,
  handleUpdateSkillTemplete,
} from "../MasterBaruSchema/saga/skillTempeleteSaga";
import {
  handleCreateModule,
  handleDelModule,
  handleGetModule,
  handleUpdateModule,
} from "../MasterBaruSchema/saga/modulesSaga";
import {
  handleCreateAddressType,
  handleDelAddressType,
  handleGetAddressType,
  handleUpdateAddressType,
} from "../MasterBaruSchema/saga/addressTypeSaga";
import {
  handleCreateRouteActions,
  handleDelRouteActions,
  handleGetRouteActions,
  handleUpdateDisplayRouteActions,
  handleUpdateRouteActions,
} from "../MasterBaruSchema/saga/routeActionsReduce";
import {
  handleCreateCountry,
  handleDelCountry,
  handleGetCountry,
  handleUpdateCountry,
} from "../MasterBaruSchema/saga/countrySaga";
import {
  handleCreateProv,
  handleDelProv,
  handleGetProv,
  handleUpdateProv,
} from "../MasterBaruSchema/saga/provSaga";
import {
  handleCreateCity,
  handleDelCity,
  handleGetCity,
  handleUpdateCity,
} from "../MasterBaruSchema/saga/citySaga";

function* watchAll() {
  yield all([
    takeEvery(AuthActionTypes.LOGIN, handleLogin),
    takeEvery(AuthActionTypes.SIGNUPINTERNAL, handleSignupInternal),
    takeEvery(AuthActionTypes.SIGNUPEXTERNAL, handleSignupExternal),

    takeEvery(UserProfileActionType.GETBYNAMEOREMAIL, handleGetByNameOrEmail),
    takeEvery(UserProfileActionType.UPDATEPROFILE, handleUpdateProfile),
    takeEvery(UserProfileActionType.CHANGEPASSWORD, handleChangePassword),

    takeEvery(pontyCodeActionType.GETPONTYCODE, handleGetPontycode),

    takeEvery(UserProfileActionType.ADDEMAIL, handleAddEmail),
    takeEvery(UserProfileActionType.EDITEMAIL, handleEditEmail),
    takeEvery(UserProfileActionType.DELETEEMAIL, handleDeleteEmail),

    takeEvery(UserProfileActionType.ADDPHONE, handleAddPhone),
    takeEvery(UserProfileActionType.EDITPHONE, handleEditPhone),
    takeEvery(UserProfileActionType.DELETEPHONE, handleDeletePhone),

    takeEvery(UserProfileActionType.ADDADDRESS, handleAddAddress),
    takeEvery(UserProfileActionType.EDITADDRESS, handleEditAddress),
    takeEvery(UserProfileActionType.DELETEADDRESS, handleDeleteAddress),

    takeEvery(UserProfileActionType.ADDEDUCATION, handleAddEducation),
    takeEvery(UserProfileActionType.DELETEEDUCATION, handleDeleteEducation),
    takeEvery(UserProfileActionType.EDITEDUCATION, handleEditEducation),

    takeEvery(UserProfileActionType.ADDEXPERIENCE, handleAddExperience),
    takeEvery(UserProfileActionType.EDITEXPERIENCE, handleEditExperience),
    takeEvery(UserProfileActionType.DELETEEXPERIENCE, handleDeleteExperience),

    takeEvery(UserProfileActionType.ADDSKILL, handleAddSkill),
    takeEvery(UserProfileActionType.DELETESKILL, handleDeleteSkil),

    takeEvery(UserProfileActionType.ADDRESUME, handleAddResume),
    takeEvery(UserProfileActionType.DELETERESUME, handleDeleteResume),

    takeEvery(UserProfileActionType.APPLYJOB, handleApplyJob),

    //job-hire
    takeEvery(jobhireActionType.REQ_GET_JOBPOST, handleGetAllJobPost),
    takeEvery(jobhireActionType.REQ_GET_CURNUMBER, handleGetCurnumber),
    takeEvery(jobhireActionType.REQ_ADD_JOBPOST, handleAddJobPost),
    takeEvery(jobhireActionType.REQ_UPDATE_JOBPOST, handleUpdateJobPost),
    takeEvery(jobhireActionType.REQ_DELETE_JOBPOST, handleDeleteJobPost),
    takeEvery(jobhireActionType.REQ_GET_JOBPOST_BY_ID, handleGetJobPostById),
    takeEvery(jobhireActionType.REQ_UPDATE_STATUS, handleUpdateStatus),
    takeEvery(jobhireActionType.REQ_SEARCH_JOBPOST, handleGetSearchJobPost),

    takeEvery(jobhireActionType.REQ_GET_EMPRANGE, handleGetEmprange),
    takeEvery(jobhireActionType.REQ_GET_JOBPHOTO, handleGetPhoto),

    takeEvery(jobhireActionType.REQ_GET_CANDIDATE, handleGetProCandidate),
    takeEvery(jobhireActionType.REQ_UPDATE_CANDIDATE, handleUpdateCandidate),

    takeEvery(jobhireActionType.REQ_GET_CLIENT, handleGetAllClient),
    takeEvery(jobhireActionType.REQ_GET_CLIENT_BY_ID, handleGetClientById),
    takeEvery(jobhireActionType.REQ_ADD_CLIENT, handleAddClient),
    takeEvery(jobhireActionType.REQ_UPDATE_CLIENT, handleUpdateClient),
    takeEvery(jobhireActionType.REQ_DELETE_CLIENT, handleDeleteClient),

    takeEvery(
      masterJobHireActionType.REQ_GET_EDUCATION,
      handleGetEducationJobHire
    ),
    takeEvery(
      masterJobHireActionType.REQ_GET_WORKTYPE,
      handleGetWorktypeJobHire
    ),
    takeEvery(masterJobHireActionType.REQ_GET_JOBROLE, handleGetJobroleJobHire),
    takeEvery(
      masterJobHireActionType.REQ_GET_INDUSTRY,
      handleGetIndustryJobHire
    ),
    takeEvery(masterJobHireActionType.REQ_GET_CITY, handleGetCityJobHire),

    takeEvery(masterJobHireActionType.REQ_GET_ROAC, handleGetRoacJobHire),

    //MODULE BOOTCAMP========================================================
    takeEvery(ActionType.REQ_GET_BOOTCAMP, handleGetBootcamp),
    takeEvery(ActionType.REQ_GET_BOOTCAMP_INDEX, handleGetBootcampIndex),
    takeEvery(ActionType.REQ_CREATE_BOOTCAMP, handleCreateBootcamp),
    takeEvery(ActionType.REQ_GET_APPLY_BATCH, handleApplyBatch),
    takeEvery(ActionType.REQ_GET_BOOTCAMP_BY_ID, handleGetBootcampById),
    takeEvery(ActionType.REQ_GET_PROGNAME, handleGetProgName),
    takeEvery(ActionType.REQ_GET_DAFTAR_APPLY, handleGetBootcampDaftarApply),
    takeEvery(ActionType.REQ_EDIT_BOOTCAMP, handleEditBootcamp),
    takeEvery(ActionType.REQ_EXTEND_BOOTCAMP, handleExtendBootcamp),
    takeEvery(ActionType.REQ_CLOSE_BOOTCAMP, handleCloseBootcamp),
    takeEvery(ActionType.REQ_PENDING_BOOTCAMP, handlePendingBootcamp),
    takeEvery(ActionType.REQ_DELETE_BOOTCAMP, handleDeleteBootcamp),
    takeEvery(
      ActionType.REQ_SET_TO_RUNNING_BOOTCAMP,
      handleSetToRunningBootcamp
    ),

    //trainer
    takeEvery(ActionType.REQ_GET_TRAINER, handleGetTrainer),

    // trainee
    takeEvery(ActionType.REQ_GET_TRAINEE_BY_ID, handleGetTraineeById),

    //evaluation
    takeEvery(ActionType.REQ_EVALUATION_DETAIL, handleEvaluationDetail),
    takeEvery(ActionType.REQ_EVALUATION_STATUS, handleEvaluationStatus),

    //CandidateApply
    takeEvery(ActionType.REQ_GET_CANDIDAT_APPLY, handleGetCandidatApply),
    takeEvery(ActionType.REQ_UPDATE_CANDIDAT_APPLY, handleUpdateCandidatApply),
    takeEvery(
      ActionType.REQ_GET_CANDIDAT_FILTERING,
      handleGetCandidatFiltering
    ),
    takeEvery(
      ActionType.REQ_UPDATE_CANDIDAT_FILTERING,
      handleUpdateCandidatFiltering
    ),
    takeEvery(ActionType.REQ_GET_CANDIDAT_CONTRACT, handleGetCandidatContract),
    takeEvery(
      ActionType.REQ_UPDATE_CANDIDAT_CONTRACT,
      handleUpdateCandidatContract
    ),
    takeEvery(
      ActionType.REQ_GET_CANDIDAT_DISQUALIFIED,
      handleGetCandidatDisqualified
    ),
    takeEvery(
      ActionType.REQ_UPDATE_CANDIDAT_DISQUALIFIED,
      handleUpdateCandidatDisqualified
    ),
    takeEvery(
      ActionType.REQ_GET_CANDIDAT_NOTRESPONDING,
      handleGetCandidatNotResponding
    ),
    takeEvery(
      ActionType.REQ_UPDATE_CANDIDAT_NOTRESPONDING,
      handleUpdateCandidatNotResponding
    ),

    //talent
    takeEvery(ActionType.REQ_GET_TALENT, handleGetTalent),

    //===================================================

    //master
    takeEvery(ActionTypes.GET_CAT, handleGetCat),
    takeEvery(ActionTypes.SKILL_TYPE, handleGeSkillType),
    takeEvery(ActionTypes.UPDATE_CAT, handleupdateCat),
    takeEvery(ActionTypes.DELETE_CAT, handleDelCat),
    takeEvery(ActionTypes.CREATE_CAT, handleCreateCat),
    takeEvery(ActionTypes.CREATE_SKILLTYPE, handleCreateSkillType),
    takeEvery(ActionTypes.DELETE_SKILLTYPE, handleDelSkillType),
    takeEvery(ActionTypes.UPDATE_SKILLTYPE, handleUpdateSkillType),

    takeEvery(ActionTypes.SKILL_TEMPLETE, handleGetSkillTemplete),
    takeEvery(ActionTypes.DEL_SKILL_TEMPLETE, handleDelSkillTemplete),
    takeEvery(ActionTypes.CREATE_SKILL_TEMPLETE, handleCreateSkillTemplete),
    takeEvery(ActionTypes.UPDATE_SKILL_TEMPLETE, handleUpdateSkillTemplete),

    takeEvery(ActionTypes.GET_MODULE, handleGetModule),
    takeEvery(ActionTypes.CREATE_MODULE, handleCreateModule),
    takeEvery(ActionTypes.DEL_MODULE, handleDelModule),
    takeEvery(ActionTypes.UPDATE_MODULE, handleUpdateModule),

    takeEvery(ActionTypes.GET_ADDRESSTYPE, handleGetAddressType),
    takeEvery(ActionTypes.CREATE_ADDTYPE, handleCreateAddressType),
    takeEvery(ActionTypes.DEL_ADDTYPE, handleDelAddressType),
    takeEvery(ActionTypes.UPDATE_ADDTYPE, handleUpdateAddressType),

    takeEvery(ActionTypes.GET_ROUTE_ACTIONS, handleGetRouteActions),
    takeEvery(ActionTypes.DEL_ROUTE_ACTIONS, handleDelRouteActions),
    takeEvery(ActionTypes.CREATE_ROUTE_ACTIONS, handleCreateRouteActions),
    takeEvery(ActionTypes.UPDATE_ROUTE_ACTIONS, handleUpdateRouteActions),
    takeEvery(
      ActionTypes.UPDATE_DISPLAY_ROUTE_ACTIONS,
      handleUpdateDisplayRouteActions
    ),

    takeEvery(ActionTypes.GET_COUNTRY, handleGetCountry),
    takeEvery(ActionTypes.DEL_COUNTRY, handleDelCountry),
    takeEvery(ActionTypes.CREATE_COUNTRY, handleCreateCountry),
    takeEvery(ActionTypes.UPDATE_COUNTRY, handleUpdateCountry),

    takeEvery(ActionTypes.GET_PROV, handleGetProv),
    takeEvery(ActionTypes.DEL_PROV, handleDelProv),
    takeEvery(ActionTypes.CREATE_PROV, handleCreateProv),
    takeEvery(ActionTypes.UPDATE_PROV, handleUpdateProv),

    takeEvery(ActionTypes.GET_CITY, handleGetCity),
    takeEvery(ActionTypes.DEL_CITY, handleDelCity),
    takeEvery(ActionTypes.CREATE_CITY, handleCreateCity),
    takeEvery(ActionTypes.UPDATE_CITY, handleUpdateCity),
  ]);
}

export default watchAll;
