import axios from '@/config/endPoint'

const Login = (data: any) => {
    return axios.post('/users/auth/signin', data)
}

export default {
    Login
}