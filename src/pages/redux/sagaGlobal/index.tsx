import {takeEvery, all} from 'redux-saga/effects'
import ActionType from '../bootcampSchema/action/actionType'
import { handleGetBootcamp, handleGetBootcampById } from '../bootcampSchema/saga/bootcampSaga'
import { handleGetProgName } from '../bootcampSchema/saga/prognameSaga'
import { handleGetBootcampDaftarApply } from '../bootcampSchema/saga/orangApplySaga'
import { handleGetTrainer } from '../bootcampSchema/saga/trainerSaga'
import { handleGetCandidatApply, handleGetCandidatFiltering, handleUpdateCandidatApply } from '../bootcampSchema/saga/candidatSaga'

function * watchAll(){
    yield all([
        takeEvery(ActionType.REQ_GET_BOOTCAMP, handleGetBootcamp),
        takeEvery(ActionType.REQ_GET_BOOTCAMP_BY_ID, handleGetBootcampById),
        takeEvery(ActionType.REQ_GET_PROGNAME, handleGetProgName),
        takeEvery(ActionType.REQ_GET_DAFTAR_APPLY, handleGetBootcampDaftarApply),

        //trainer
        takeEvery(ActionType.REQ_GET_TRAINER, handleGetTrainer),

        //CandidateApply
        takeEvery(ActionType.REQ_GET_CANDIDAT_APPLY, handleGetCandidatApply),
        takeEvery(ActionType.REQ_UPDATE_CANDIDAT_APPLY, handleUpdateCandidatApply),
        takeEvery(ActionType.REQ_GET_CANDIDAT_FILTERING, handleGetCandidatFiltering),
    ])
}

export default watchAll