import axios from '@/config/endPoint'

const Login = (data: any) => {
    return axios.post('/users/auth/signin', data)
}

const signUpInternal = (data: any) => {
    return axios.post('/users/employee', data)
}
const signUpExternal = (data: any) => {
    return axios.post('/users/student', data)
}

export default {
    Login,
    signUpInternal,
    signUpExternal
}