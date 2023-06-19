import axios from '@/config/endPoint'

const Login = (data: any) => {
    return axios.post('/users/auth/signin', data)
}

const SignUp = (data: any) => {
    return axios.post('/users/student', data)
}

export default {
    Login,
    SignUp
}