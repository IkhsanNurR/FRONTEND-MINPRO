import axios from '@/config/endPoint'
import checkEmailOrUsername from '@/helper/checkEmail'


const getUsersByUsernameOrEmail = (usernameOrEmail: string) => {
    const cek = checkEmailOrUsername(usernameOrEmail)
    if (cek === 'Email') {
        return axios.get(`/users/email/${usernameOrEmail}`)
    }else{
        return axios.get(`/users/username/${usernameOrEmail}`)
    }
}

export default {
    getUsersByUsernameOrEmail,
}