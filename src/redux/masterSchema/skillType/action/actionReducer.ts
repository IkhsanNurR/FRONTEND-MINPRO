import skillTypeActionType from './actionType'

export const getSkillType = () => {
    return {
        type: skillTypeActionType.GET_SKILLTYPE
    }
}


export const getSkillTypeResponse = (payload: any) => {
    return {
        type: skillTypeActionType.GET_SKILLTYPE_RESPONSE,
        payload
    }
}