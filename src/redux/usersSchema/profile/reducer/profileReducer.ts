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
        case UserProfileActionType.UPDATEPROFILE_RESPONSE:
            return { message: payload.message, refresh: false }

        case UserProfileActionType.ADDEMAIL_RESPONSE:
            return { users: payload, refresh: false }
        case UserProfileActionType.DELETEEMAIL_RESPONSE:
            return { message: payload.message, refresh: false }
        case UserProfileActionType.EDITEMAIL_RESPONSE:
            return { message: payload.message, refresh: false }

        case UserProfileActionType.ADDPHONE_RESPONSE:
            return { message: payload.message, refresh: false }
        case UserProfileActionType.EDITPHONE_RESPONSE:
            return { message: payload.message, refresh: false }
        case UserProfileActionType.DELETEPHONE_RESPONSE:
            return { message: payload.message, refresh: false }

        case UserProfileActionType.ADDADDRESS_RESPONSE:
            return { message: payload.message, refresh: false }
        case UserProfileActionType.EDITADDRESS_RESPONSE:
            return { message: payload.message, refresh: false }
        case UserProfileActionType.DELETEADDRESS_RESPONSE:
            return { message: payload.message, refresh: false }
        default:
            return state
    }
}