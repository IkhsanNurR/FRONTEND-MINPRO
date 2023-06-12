import UserProfileActionType from "../action/actionType";

const initialState = {
    users: [],
    message: "",
    status: "",
    refresh: ""
}

export default function userProfileReducers(state = initialState, action: any) {
    const { type, payload } = action
    switch (type) {
        case UserProfileActionType.GETBYNAMEOREMAIL_RESPONSE:
            return { users: payload, refresh: true }
        default:
            return state
    }
}