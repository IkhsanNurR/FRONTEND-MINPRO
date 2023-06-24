import pontyCodeActionType from "./actionType"

export const getPontyCode = () => {
    return {
        type: pontyCodeActionType.GETPONTYCODE,
    }
}

export const getPontyCodeResponse = (payload: any) => {
    return {
        type: pontyCodeActionType.GETPONTYCODE_RESPONSE,
        payload
    }
}