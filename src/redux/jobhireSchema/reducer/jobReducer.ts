import jobhireActionType from "../action/actionType";

const initialState = {
    job_post: [],
    message: "",
    status: "",
    refresh: ""
}

export default function jobReducers(state = initialState, action: any) {
    const { type, payload } = action
    switch (type) {
        case jobhireActionType.GETJOB_RESPONSE:
            return { job_post: payload, refresh: true }
        default:
            return state
    }
}