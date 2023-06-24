import axios from '@/config/endPoint'

const findAllJob =( ) =>{
    return axios.get(`job-hire/alljob`)
}

export default {
    findAllJob
}