import jobhireActionType from "./actionType";

export const getJob = () => {
    return {
        type: jobhireActionType.GETJOB,
    }
}

export const getJobResponse = (payload: any) => {
    return {
        type: jobhireActionType.GETJOB_RESPONSE,
        payload
    }
}