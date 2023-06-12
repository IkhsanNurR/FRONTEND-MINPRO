import UserProfileActionType from "./actionType";

export const GetByNameOrEmail = (payload: any) => {
    return {
        type: UserProfileActionType.GETBYNAMEOREMAIL,
        payload
    }
}

export const GetByNameOrEmailResponse = (payload: any) => {
    return {
        type: UserProfileActionType.GETBYNAMEOREMAIL_RESPONSE,
        payload
    }
}

export const updateProfile = ({ payload, id }: any) => {
    return {
        type: UserProfileActionType.UPDATEPROFILE,
        payload,
        id
    }
}

export const updateProfileResponse = (payload: any) => {
    return {
        type: UserProfileActionType.UPDATEPROFILE_RESPONSE,
        payload
    }
}