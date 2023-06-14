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

export const addEmail = ({ payload, id }: any) => {
    return {
        type: UserProfileActionType.ADDEMAIL,
        payload, id
    }
}

export const addEmailResponse = (payload: any) => {
    return {
        type: UserProfileActionType.ADDEMAIL_RESPONSE,
        payload
    }
}

export const editEmail = ({ payload, id }: any) => {
    return {
        type: UserProfileActionType.EDITEMAIL,
        payload, id
    }
}

export const editEmailResponse = (payload: any) => {
    return {
        type: UserProfileActionType.EDITEMAIL_RESPONSE,
        payload
    }
}

export const deleteEmail = (payload: any) => {
    return {
        type: UserProfileActionType.DELETEEMAIL,
        payload
    }
}

export const deleteEmailResponse = (payload: any) => {
    return {
        type: UserProfileActionType.DELETEEMAIL_RESPONSE,
        payload
    }
}

export const addPhone = ({ payload, id }: any) => {
    return {
        type: UserProfileActionType.ADDPHONE,
        payload, id
    }
}

export const addPhoneResponse = (payload: any) => {
    return {
        type: UserProfileActionType.ADDPHONE_RESPONSE,
        payload
    }
}

export const editPhone = ({ payload, id, phonenumber }: any) => {
    return {
        type: UserProfileActionType.EDITPHONE,
        payload,
        id,
        phonenumber
    }
}

export const editPhoneResponse = (payload: any) => {
    return {
        type: UserProfileActionType.EDITPHONE_RESPONSE,
        payload,
    }
}

export const deletePhone = ({ payload, id, phonenumber }: any) => {
    return {
        type: UserProfileActionType.DELETEPHONE,
        payload,
        id,
        phonenumber
    }
}

export const deletePhoneResponse = (payload: any) => {
    return {
        type: UserProfileActionType.DELETEPHONE_RESPONSE,
        payload,
    }
}