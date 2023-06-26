// import ActionTypes from "../action/ActionTypes";
// import {
//   handleAddBank,
//   handlegetAllBank,
//   handleDeleteBank,
//   handleUpdateBank,
// } from "../saga/bankSaga";
// import {
//   handlegetAllFintech,
//   handleAddFintech,
//   handleUpdateFintech,
//   handleDeleteFintech,
// } from "../saga/fintechSaga";
// import { takeEvery, all } from "redux-saga/effects";
// import {
//   handlegetAllUsersAccount,
//   handleaddUserAccount,
//   handleUpdateUsersAccount,
//   handleDeleteUsersAccount,
// } from "./usersAccountSaga";
// import { handlegetTOPUP } from "./topupSaga";
// import { handlegetAllTransaction } from "./transactionSaga";

// function* watchAll() {
//   // console.log("coba");
//   yield all([
//     //Bank
//     takeEvery(ActionTypes.REQ_GET_BANK, handlegetAllBank),
//     takeEvery(ActionTypes.ADD_BANK, handleAddBank),
//     takeEvery(ActionTypes.UPDATE_BANK, handleUpdateBank),
//     takeEvery(ActionTypes.DELETE_BANK, handleDeleteBank),

//     //Fintech
//     takeEvery(ActionTypes.REQ_GET_FINTECH, handlegetAllFintech),
//     takeEvery(ActionTypes.ADD_FINTECH, handleAddFintech),
//     takeEvery(ActionTypes.UPDATE_FINTECH, handleUpdateFintech),
//     takeEvery(ActionTypes.DELETE_FINTECH, handleDeleteFintech),

//     //Users Account
//     takeEvery(ActionTypes.REQ_GET_ACCOUNT, handlegetAllUsersAccount),
//     takeEvery(ActionTypes.ADD_ACCOUNT, handleaddUserAccount),
//     takeEvery(ActionTypes.UPDATE_ACCOUNT, handleUpdateUsersAccount),
//     takeEvery(ActionTypes.DELETE_ACCOUNT, handleDeleteUsersAccount),

//     //TOPUP
//     takeEvery(ActionTypes.ADD_TOPUP, handlegetTOPUP),

//     //Transaction
//     takeEvery(ActionTypes.REQ_GET_TRANSACTION, handlegetAllTransaction),
//   ]);
// }

// export default watchAll;
