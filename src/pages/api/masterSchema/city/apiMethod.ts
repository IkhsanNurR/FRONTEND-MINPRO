import axios from '@/config/endPoint'

const getCity = () => {
    return axios.get(`/city`)
}

export default {
    getCity
}