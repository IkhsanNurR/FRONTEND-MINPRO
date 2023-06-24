import skillTypeActionType from "../action/actionType";

const initialState = {
    skillType: [],
    message: "",
    status: "",
    refresh: ""
}

export default function skilltypeReducers(state = initialState, action: any) {
    const { type, payload } = action
    switch (type) {
        case skillTypeActionType.GET_SKILLTYPE_RESPONSE:
            return { skillType: payload.data, refresh: true }
        default:
            return state
    }
}