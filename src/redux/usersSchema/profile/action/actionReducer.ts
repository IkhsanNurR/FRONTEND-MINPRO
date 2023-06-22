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

export const changePassword = ({ payload, id }: any) => {
    return {
        type: UserProfileActionType.CHANGEPASSWORD,
        payload, id
    }
}

export const changePasswordResponse = (payload: any) => {
    return {
        type: UserProfileActionType.CHANGEPASSWORD_RESPONSE,
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

export const addAddress = ({ payload, id }: any) => {
    return {
        type: UserProfileActionType.ADDADDRESS,
        payload, id
    }
}

export const addAddressResponse = (payload: any) => {
    return {
        type: UserProfileActionType.ADDADDRESS_RESPONSE,
        payload
    }
}

export const editAddress = ({ payload, id }: any) => {
    return {
        type: UserProfileActionType.EDITADDRESS,
        payload, id
    }
}

export const editAddressResponse = (payload: any) => {
    return {
        type: UserProfileActionType.EDITADDRESS_RESPONSE,
        payload
    }
}

export const deleteAddress = (payload: any) => {
    return {
        type: UserProfileActionType.DELETEADDRESS,
        payload
    }
}

export const deleteAddressResponse = (payload: any) => {
    return {
        type: UserProfileActionType.DELETEADDRESS_RESPONSE,
        payload,
    }
}

export const addEducation = ({ payload, id }: any) => {
    return {
        type: UserProfileActionType.ADDEDUCATION,
        payload, id
    }
}

export const addEducationResponse = (payload: any) => {
    return {
        type: UserProfileActionType.ADDEDUCATION_RESPONSE,
        payload
    }
}

export const editEducation = ({ payload, id }: any) => {
    return {
        type: UserProfileActionType.EDITEDUCATION,
        payload, id
    }
}

export const editEducationResponse = (payload: any) => {
    return {
        type: UserProfileActionType.EDITEDUCATION_RESPONSE,
        payload
    }
}

export const deleteEducation = (payload: any) => {
    return {
        type: UserProfileActionType.DELETEEDUCATION,
        payload
    }
}

export const deleteEducationResponse = (payload: any) => {
    return {
        type: UserProfileActionType.DELETEEDUCATION_RESPONSE,
        payload
    }
}

export const addExperience = ({ payload, id }: any) => {
    return {
        type: UserProfileActionType.ADDEXPERIENCE,
        payload, id
    }
}

export const addExperienceResponse = (payload: any) => {
    return {
        type: UserProfileActionType.ADDEXPERIENCE_RESPONSE,
        payload,
    }
}

export const editExperience = ({ payload, id }: any) => {
    return {
        type: UserProfileActionType.EDITEXPERIENCE,
        payload, id
    }
}

export const editExperienceResponse = (payload: any) => {
    return {
        type: UserProfileActionType.EDITEXPERIENCE_RESPONSE,
        payload
    }
}

export const deleteExperience = (payload: any) => {
    return {
        type: UserProfileActionType.DELETEEXPERIENCE,
        payload
    }
}

export const deleteExperienceResponse = (payload: any) => {
    return {
        type: UserProfileActionType.DELETEEXPERIENCE_RESPONSE,
        payload
    }
}

export const addSkill = ({ payload, id }: any) => {
    return {
        type: UserProfileActionType.ADDSKILL,
        payload, id
    }
}

export const addSkillResponse = (payload: any) => {
    return {
        type: UserProfileActionType.ADDSKILL_RESPONSE,
        payload,
    }
}

export const deleteSkill = (payload: any) => {
    return {
        type: UserProfileActionType.DELETESKILL,
        payload
    }
}

export const deleteSkillResponse = (payload: any) => {
    return {
        type: UserProfileActionType.DELETESKILL_RESPONSE,
        payload
    }
}

export const addResume = ({ payload, id }: any) => {
    return {
        type: UserProfileActionType.ADDRESUME,
        payload, id
    }
}

export const addResumeResponse = (payload: any) => {
    return {
        type: UserProfileActionType.ADDRESUME_RESPONSE,
        payload
    }
}

export const deleteResume = (payload: any) => {
    return {
        type: UserProfileActionType.DELETERESUME,
        payload
    }
}

export const deleteResumeResponse = (payload: any) => {
    return {
        type: UserProfileActionType.DELETERESUME_RESPONSE,
        payload
    }
}

export const applyJob = ({ payload, id, idPost }: any) => {
    return {
        type: UserProfileActionType.APPLYJOB,
        payload,
        id,
        idPost
    }
}

export const applyJobResponse = (payload: any) => {
    return {
        type: UserProfileActionType.APPLYJOB_RESPONSE,
        payload
    }
}

// export const editPhone = ({ payload, id, phonenumber }: any) => {
//     return {
//         type: UserProfileActionType.EDITPHONE,
//         payload,
//         id,
//         phonenumber
//     }
// }

// export const editPhoneResponse = (payload: any) => {
//     return {
//         type: UserProfileActionType.EDITPHONE_RESPONSE,
//         payload,
//     }
// }