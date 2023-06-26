
import ActionTypes from "./ActionTypes";


//BANK
export const doRequestGetBank = () =>{
    return {
        type:ActionTypes.REQ_GET_BANK
    }
}

export const doGetBankResponse = (payload:any) =>{
    return {
        type:ActionTypes.GET_BANK_RESPONE,
        payload
    }
}

export const doaddbank = (payload:any) =>{
    return {
        type:ActionTypes.ADD_BANK,
        payload
    }
}

export const dobankResponse = (payload:any) => {
    return{
        type:ActionTypes.ADD_BANK_RESPONSE,
        payload
    }
}

export const  doupdatebank = (payload:any) =>{
    // console.log("object");
    return{
        type:ActionTypes.UPDATE_BANK,
        payload
    }
}

export const doBankUpdateResponse = (payload:any) => {
    // console.log("object");
    return{
        type:ActionTypes.UPDATE_BANK_RESPONSE,
        payload
    }
}

export const dodeleteBank = (payload:any) => {
    return{
        type:ActionTypes.DELETE_BANK,
        payload
    }
}

export const deleteBankResponse = (payload:any) => {
    return{
        type:ActionTypes.DELETE_BANK_RESPONSE,
        payload
    }
}



//FINTECH
export const doRequestGetFintech = () =>{
    return {
        type:ActionTypes.REQ_GET_FINTECH
    }
}

export const doGetFintechResponse = (payload:any) =>{
    return {
        type:ActionTypes.GET_FINTECH_RESPONE,
        payload
    }
}

export const doAddFintech = (payload:any) => {
    return {
        type:ActionTypes.ADD_FINTECH,
        payload
    }
}

export const doAddFintechResponse = (payload:any) => {
    return {
        type:ActionTypes.ADD_FINTECH_RESPONSE,
        payload
    }
}

export const  doupdatefintech = (payload:any) =>{
    return{
        type:ActionTypes.UPDATE_FINTECH,
        payload
    }
}

export const doFintechUpdateResponse = (payload:any) => {
    return{
        type:ActionTypes.UPDATE_FINTECH_RESPONSE,
        payload
    }
}

export const dodeleteFintech = (payload:any) => {
    return{
        type:ActionTypes.DELETE_FINTECH,
        payload
    }
}

export const deleteFintechResponse = (payload:any) => {
    return{
        type:ActionTypes.DELETE_FINTECH_RESPONSE,
        payload
    }
}



//USERS ACCOUNT
export const doRequestGetUsersAccount = () =>{
    return {
        type:ActionTypes.REQ_GET_ACCOUNT
    }
}

export const doGetUsersAccountResponse = (payload:any) =>{
    return {
        type:ActionTypes.GET_ACCOUNT_RESPONE,
        payload
    }
}

export const doAddAccount = (payload:any) => {
    return {
        type:ActionTypes.ADD_ACCOUNT,
        payload
    }
}

export const doAddAccountResponse = (payload:any) => {
    return {
        type: ActionTypes.ADD_ACCOUNT_RESPONSE,
        payload
    }
}

export const  doupdateUsersaccount= (payload:any) =>{
    return{
        type:ActionTypes.UPDATE_ACCOUNT,
        payload
    }
}

export const doUsersAccountUpdateResponse = (payload:any) => {
    return{
        type:ActionTypes.UPDATE_ACCOUNT_RESPONSE,
        payload
    }
}

export const dodeleteUsersAccount = (payload:any) => {
    return{
        type:ActionTypes.DELETE_ACCOUNT,
        payload
    }
}

export const deleteUsersAccountResponse = (payload:any) => {
    return{
        type:ActionTypes.DELETE_ACCOUNT_RESPONSE,
        payload
    }
}

//TOPUP
export const doAddTOPUP = (payload:any) => {
    return {
        type:ActionTypes.ADD_TOPUP,
        payload
    }
}

export const doAddTOPUPResponse = (payload:any) => {
    return {
        type: ActionTypes.ADD_TOPUP_RESPONSE,
        payload
    }
}


//TRANSACTION
export const doRequestGetTRANSACTION = () =>{
    return {
        type:ActionTypes.REQ_GET_TRANSACTION
    }
}

export const doGetTRANSACTIONResponse = (payload:any) =>{
    return {
        type:ActionTypes.GET_TRANSACTION_RESPONE,
        payload
    }
}