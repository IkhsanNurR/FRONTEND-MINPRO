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
import cityActionType from "../masterSchema/city/action/actionType";
import { handleGetCity } from "../masterSchema/city/saga";
import addreetypeActionType from "../masterSchema/addresstype/action/actionType";
import { handleGetAddressType } from "../masterSchema/addresstype/saga";
import skillTypeActionType from "../masterSchema/skillType/action/actionType";
import { handleGetSkillType } from "../masterSchema/skillType/saga";
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

    //MASTER
    takeEvery(cityActionType.GET_CITY, handleGetCity),
    takeEvery(addreetypeActionType.GET_ADDRESSTYPE, handleGetAddressType),
    takeEvery(skillTypeActionType.GET_SKILLTYPE, handleGetSkillType),

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
  ]);
}

export default watchAll;
