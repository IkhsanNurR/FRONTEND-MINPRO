import addreetypeActionType from "./actionType";

export const getAddressType = () => {
    return {
        type: addreetypeActionType.GET_ADDRESSTYPE
    }
}

export const getAddressTypeResponse = (payload: any) => {
    return {
        type: addreetypeActionType.GET_ADDRESSTYPE_RESPONSE,
        payload
    }
}