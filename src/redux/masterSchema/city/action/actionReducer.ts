import cityActionType from "./actionType";

export const getCity = () => {
    return {
        type: cityActionType.GET_CITY
    }
}

export const getCityResponse = (payload: any) => {
    return {
        type: cityActionType.GET_CITY_RESPONSE,
        payload
    }
}