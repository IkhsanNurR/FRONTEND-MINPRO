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

const changePassword = ({ data, id }: any) => {
    return axios.patch(`/users/profile/changePassword/${id}`, data)
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

const addEducation = ({ data, id }: any) => {
    return axios.post(`/users/profile/addEducation/${id}`, data)
}

const editEducation = ({ data, id }: any) => {
    return axios.patch(`/users/profile/editEducation/${id}`, data)
}

const deleteEducation = (id: any) => {
    return axios.delete(`/users/profile/deleteEducation/${id}`)
}

const addExperience = ({ data, id }: any) => {
    return axios.post(`/users/profile/addExperiences/${id}`, data)
}

const editExperience = ({ data, id }: any) => {
    return axios.patch(`/users/profile/editExperience/${id}`, data)
}

const deleteExperience = (id: any) => {
    return axios.delete(`/users/profile/deleteExperience/${id}`)
}

const addSkill = ({ data, id }: any) => {
    return axios.post(`/users/profile/addSkill/${id}`, data)
}

const deleteSkill = (id: any): any => {
    return axios.delete(`/users/profile/deleteSkill/${id}`)
}

const addResume = ({ data, id }: any) => {
    return axios.post(`/users/profile/uploadResume/${id}`, data)
}

const deleteResume = (id: any) => {
    return axios.delete(`/users/profile/deleteResume/${id}`)
}

const applyJob = ({ id, idPost }: any) => {
    return axios.post(`/users/job/apply/${id}/${idPost}`)
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
    addEducation,
    editEducation,
    deleteEducation,
    addExperience,
    editExperience,
    deleteExperience,
    addSkill,
    deleteSkill,
    addResume,
    deleteResume,
    applyJob,
    getPontyCode,
    changePassword
}
