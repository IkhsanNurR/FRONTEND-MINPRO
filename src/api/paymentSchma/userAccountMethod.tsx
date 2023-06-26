import axios from "../../config/endpoint"

const findAlUsersAccount= () =>{
    return axios.get("/users-account/All")
}

const createUsersAccount = (data:any) => {
    return axios.post("/users-account/Create", data)
}

const updateUsersAccount = (data:any) => {
    return axios.put(`/users-account/Update/${data.usac_user_entity_id}`, data)
}

const deleteUsersAccount = (val:any) => {
    return axios.delete(`/users-account/Delete/${val.usac_user_entity_id}`)
}

  

export default{
    findAlUsersAccount,
    createUsersAccount,
    updateUsersAccount,
    deleteUsersAccount
}