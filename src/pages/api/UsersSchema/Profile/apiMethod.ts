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

const addEmail = ({ data, id }: any) => {
    return axios.post(`/users/profile/addEmail/${id}`, data)
}

const editEmail = ({ data, id }: any) => {
    return axios.patch(`http://localhost:8000/users/profile/editEmail/${id}`, data)
}

const deleteEmail = (id: any) => {
    return axios.delete(`/users/profile/deleteEmail/${id}`)
}

export default {
    getUsersByUsernameOrEmail,
    updateProfile,
    addEmail,
    editEmail,
    deleteEmail
}
