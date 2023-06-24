import axios from '@/config/endPoint'

const getSkillType = () => {
    return axios.get(`/skill-type`)
}

export default {
    getSkillType
}