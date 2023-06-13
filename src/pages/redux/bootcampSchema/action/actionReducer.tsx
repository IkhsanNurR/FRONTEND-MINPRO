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