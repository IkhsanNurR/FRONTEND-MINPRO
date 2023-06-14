import ActionType from "./actionType";

export const reqGetBootcamp = () => {
    return{
        type : ActionType.REQ_GET_BOOTCAMP
    }
}
export const resGetBootcamp = (payload:any) => {
    return{
        type : ActionType.RES_GET_BOOTCAMP,
        payload
    }
}
export const reqCreateBootcamp = (payload:any) => {
    return{
        type : ActionType.REQ_CREATE_BOOTCAMP,
        payload
    }
}
export const resCreateBootcamp = (payload:any) => {
    return{
        type : ActionType.RES_CREATE_BOOTCAMP,
        payload
    }
}

export const reqGetBootcampById = (payload:any) => {
    return{
        type : ActionType.REQ_GET_BOOTCAMP_BY_ID,
        payload
    }
}
export const resGetBootcampById = (payload:any) => {
    return{
        type : ActionType.RES_GET_BOOTCAMP_BY_ID,
        payload
    }
}
export const reqGetBootcampDaftarApply = () => {
    return{
        type : ActionType.REQ_GET_DAFTAR_APPLY
    }
}
export const resGetBootcampDaftarApply = (payload:any) => {
    return{
        type : ActionType.RES_GET_DAFTAR_APPLY,
        payload
    }
}

//ProgName
export const reqGetProgName = () => {
    return{
        type : ActionType.REQ_GET_PROGNAME,
        
    }
}
export const resGetProgName = (payload:any) => {
    return{
        type : ActionType.RES_GET_PROGNAME,
        payload
    }
}

//Trainer
export const reqGetTrainer = () => {
    return{
        type : ActionType.REQ_GET_TRAINER,
        
    }
}
export const resGetTrainer = (payload:any) => {
    return{
        type : ActionType.RES_GET_TRAINER,
        payload
    }
}


//Candidat
export const reqGetCandidatApply = () => {
    return{
        type : ActionType.REQ_GET_CANDIDAT_APPLY,
        
    }
}
export const resGetCandidatApply = (payload:any) => {
    return{
        type : ActionType.RES_GET_CANDIDAT_APPLY,
        payload
    }
}
export const reqUpdateCandidatApply = (payload:any) => {
    return{
        type : ActionType.REQ_UPDATE_CANDIDAT_APPLY,
        payload
    }
}
export const resUpdateCandidatApply = (payload:any) => {
    return{
        type : ActionType.RES_UPDATE_CANDIDAT_APPLY,
        payload
    }
}

export const reqGetCandidatFiltering = () => {
    return{
        type : ActionType.REQ_GET_CANDIDAT_FILTERING,
        
    }
}
export const resGetCandidatFiltering = (payload:any) => {
    return{
        type : ActionType.RES_GET_CANDIDAT_FILTERING,
        payload
    }
}
export const reqUpdateCandidatFiltering = (payload:any) => {
    return{
        type : ActionType.REQ_UPDATE_CANDIDAT_FILTERING,
        payload
        
    }
}
export const resUpdateCandidatFiltering = (payload:any) => {
    return{
        type : ActionType.RES_UPDATE_CANDIDAT_FILTERING,
        payload
    }
}
export const reqGetCandidatContract = () => {
    return{
        type : ActionType.REQ_GET_CANDIDAT_CONTRACT,
        
    }
}
export const resGetCandidatContract = (payload:any) => {
    return{
        type : ActionType.RES_GET_CANDIDAT_CONTRACT,
        payload
    }
}
export const reqUpdateCandidatContract = (payload:any) => {
    return{
        type : ActionType.REQ_UPDATE_CANDIDAT_CONTRACT,
        payload
        
    }
}
export const resUpdateCandidatContract = (payload:any) => {
    return{
        type : ActionType.RES_UPDATE_CANDIDAT_CONTRACT,
        payload
    }
}
export const reqGetCandidatDisqualified = () => {
    return{
        type : ActionType.REQ_GET_CANDIDAT_DISQUALIFIED,
        
    }
}
export const resGetCandidatDisqualified = (payload:any) => {
    return{
        type : ActionType.RES_GET_CANDIDAT_DISQUALIFIED,
        payload
    }
}
export const reqUpdateCandidatDisqualified = (payload:any) => {
    return{
        type : ActionType.REQ_UPDATE_CANDIDAT_DISQUALIFIED,
        payload
    }
}
export const resUpdateCandidatDisqualified = (payload:any) => {
    return{
        type : ActionType.RES_UPDATE_CANDIDAT_DISQUALIFIED,
        payload
    }
}
export const reqGetCandidatNotResponding = () => {
    return{
        type : ActionType.REQ_GET_CANDIDAT_NOTRESPONDING,
        
    }
}
export const resGetCandidatNotResponding = (payload:any) => {
    return{
        type : ActionType.RES_GET_CANDIDAT_NOTRESPONDING,
        payload
    }
}
export const reqUpdateCandidatNotResponding = (payload:any) => {
    return{
        type : ActionType.REQ_UPDATE_CANDIDAT_NOTRESPONDING,
        payload
        
    }
}
export const resUpdateCandidatNotResponding = (payload:any) => {
    return{
        type : ActionType.RES_UPDATE_CANDIDAT_NOTRESPONDING,
        payload
    }
}