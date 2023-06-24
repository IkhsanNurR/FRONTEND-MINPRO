import axios from '@/config/endPoint'

const getAddressType = () =>{
    return axios.get(`/addresstype`)
}

export default {
    getAddressType
}