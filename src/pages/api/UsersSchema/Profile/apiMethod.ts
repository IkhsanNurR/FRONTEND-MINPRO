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

const getPontyCode = () => {
    return axios.get("/users/profile/pontycode")
}

const addEmail = ({ data, id }: any) => {
    return axios.post(`/users/profile/addEmail/${id}`, data)
}

const editEmail = ({ data, id }: any) => {
    return axios.patch(`/users/profile/editEmail/${id}`, data)
}

const deleteEmail = (id: any) => {
    return axios.delete(`/users/profile/deleteEmail/${id}`)
}

const addPhone = ({ data, id }: any) => {
    return axios.post(`users/profile/addPhone/${id}`, data)
}

const editPhone = ({ data, id, phonenumber }: any) => {
    return axios.patch(`users/profile/editPhone/${id}/${phonenumber}`, data)
}

const deletePhone = ({ id, phonenumber }: any) => {
    return axios.delete(`/users/profile/deletePhone/${id}/${phonenumber}`)
}

const addAddress = ({ data, id }: any) => {
    return axios.post(`/users/profile/addAddress/${id}`, data)
}

const editAddress = ({ data, id }: any) => {
    return axios.patch(`/users/profile/editAddress/${id}`, data)
}

const deleteAddress = (id: any) => {
    return axios.delete(`/users/profile/deleteAddress/${id}`)
}

export default {
    getUsersByUsernameOrEmail,
    updateProfile,
    addEmail,
    editEmail,
    deleteEmail,
    addPhone,
    editPhone,
    deletePhone,
    addAddress,
    editAddress,
    deleteAddress,
    getPontyCode
}
