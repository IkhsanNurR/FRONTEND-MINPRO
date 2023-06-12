import axios from '@/config/endPoint'
import checkEmailOrUsername from '@/helper/checkEmail'


const getUsersByUsernameOrEmail = (usernameOrEmail: string) => {
    const cek = checkEmailOrUsername(usernameOrEmail)
    if (cek === 'Email') {
        return axios.get(`/users/email/${usernameOrEmail}`)
    } else {
        return axios.get(`/users/username/${usernameOrEmail}`)
    }
}

const updateProfile = ({ data, id }: any) => {
    return axios.patch(`/users/profile/editprofile/${id}`, data)
}
export default {
    getUsersByUsernameOrEmail,
    updateProfile
}