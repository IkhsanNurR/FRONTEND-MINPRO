import {takeEvery, all} from 'redux-saga/effects'
import ActionType from '../bootcampSchema/action/actionType'
import { handleCloseBootcamp, handleCreateBootcamp, handleDeleteBootcamp, handleEditBootcamp, handleExtendBootcamp, handleGetBootcamp, handleGetBootcampById, handleSetToRunningBootcamp } from '../bootcampSchema/saga/bootcampSaga'
import { handleGetProgName } from '../bootcampSchema/saga/prognameSaga'
import { handleGetBootcampDaftarApply } from '../bootcampSchema/saga/orangApplySaga'
import { handleGetTrainer } from '../bootcampSchema/saga/trainerSaga'
import { handleGetCandidatApply, handleGetCandidatContract, handleGetCandidatDisqualified, handleGetCandidatFiltering, handleGetCandidatNotResponding, handleUpdateCandidatApply, handleUpdateCandidatContract, handleUpdateCandidatDisqualified, handleUpdateCandidatFiltering, handleUpdateCandidatNotResponding } from '../bootcampSchema/saga/candidatSaga'
import { handleGetTraineeById } from '../bootcampSchema/saga/traineeSaga'
import { handleEvaluationDetail, handleEvaluationStatus } from '../bootcampSchema/saga/evaluationSaga'
import ActionTypes from '../paymentSchema/action/ActionTypes'
import { handleAddBank, handlegetAllBank, handleUpdateBank, handleDeleteBank } from '../paymentSchema/saga/bankSaga'
import { handleAddFintech, handleDeleteFintech, handleUpdateFintech, handlegetAllFintech } from '../paymentSchema/saga/fintechSaga'
import { handleDeleteUsersAccount, handleUpdateUsersAccount, handleaddUserAccount, handlegetAllUsersAccount } from '../paymentSchema/saga/usersAccountSaga'
import { handlegetAllTransaction } from '../paymentSchema/saga/transactionSaga'
import { handlegetTOPUP } from '../paymentSchema/saga/topupSaga'

function * watchAll(){
    yield all([
        takeEvery(ActionType.REQ_GET_BOOTCAMP, handleGetBootcamp),
        takeEvery(ActionType.REQ_CREATE_BOOTCAMP, handleCreateBootcamp),
        takeEvery(ActionType.REQ_GET_BOOTCAMP_BY_ID, handleGetBootcampById),
        takeEvery(ActionType.REQ_GET_PROGNAME, handleGetProgName),
        takeEvery(ActionType.REQ_GET_DAFTAR_APPLY, handleGetBootcampDaftarApply),
        takeEvery(ActionType.REQ_EDIT_BOOTCAMP, handleEditBootcamp),
        takeEvery(ActionType.REQ_EXTEND_BOOTCAMP, handleExtendBootcamp),
        takeEvery(ActionType.REQ_CLOSE_BOOTCAMP, handleCloseBootcamp),
        takeEvery(ActionType.REQ_DELETE_BOOTCAMP, handleDeleteBootcamp),
        takeEvery(ActionType.REQ_SET_TO_RUNNING_BOOTCAMP, handleSetToRunningBootcamp),

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
        takeEvery(ActionType.REQ_GET_CANDIDAT_FILTERING, handleGetCandidatFiltering),
        takeEvery(ActionType.REQ_UPDATE_CANDIDAT_FILTERING, handleUpdateCandidatFiltering),
        takeEvery(ActionType.REQ_GET_CANDIDAT_CONTRACT, handleGetCandidatContract),
        takeEvery(ActionType.REQ_UPDATE_CANDIDAT_CONTRACT, handleUpdateCandidatContract),
        takeEvery(ActionType.REQ_GET_CANDIDAT_DISQUALIFIED, handleGetCandidatDisqualified),
        takeEvery(ActionType.REQ_UPDATE_CANDIDAT_DISQUALIFIED, handleUpdateCandidatDisqualified),
        takeEvery(ActionType.REQ_GET_CANDIDAT_NOTRESPONDING, handleGetCandidatNotResponding),
        takeEvery(ActionType.REQ_UPDATE_CANDIDAT_NOTRESPONDING, handleUpdateCandidatNotResponding),

        //Payment
        takeEvery(ActionTypes.REQ_GET_BANK,handlegetAllBank),
        takeEvery(ActionTypes.ADD_BANK,handleAddBank),
        takeEvery(ActionTypes.UPDATE_BANK,handleUpdateBank),
        takeEvery(ActionTypes.DELETE_BANK,handleDeleteBank),

        takeEvery(ActionTypes.REQ_GET_FINTECH,handlegetAllFintech),
        takeEvery(ActionTypes.ADD_FINTECH,handleAddFintech),
        takeEvery(ActionTypes.UPDATE_FINTECH,handleUpdateFintech),
        takeEvery(ActionTypes.DELETE_FINTECH,handleDeleteFintech),


        takeEvery(ActionTypes.REQ_GET_ACCOUNT,handlegetAllUsersAccount),
        takeEvery(ActionTypes.ADD_ACCOUNT,handleaddUserAccount),
        takeEvery(ActionTypes.UPDATE_ACCOUNT,handleUpdateUsersAccount),
        takeEvery(ActionTypes.DELETE_ACCOUNT,handleDeleteUsersAccount),


        takeEvery(ActionTypes.ADD_TOPUP,handlegetTOPUP),

        takeEvery(ActionTypes.REQ_GET_TRANSACTION,handlegetAllTransaction),
        
    ])
}

export default watchAll