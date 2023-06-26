import axios from "@/config/endPoint";

const findAllFintech = () => {
  return axios.get("/fintech/All");
};

const createFintech = (data: any) => {
  return axios.post("/fintech/Create", data);
};

const updateFintech = (data: any) => {
  return axios.put(`/fintech/Update/${data.fint_entity_id}`, data);
};

const deleteFintechById = (val: any) => {
  return axios.delete(`/fintech/Delete/${val.fint_entity_id}`);
};

export default {
  findAllFintech,
  createFintech,
  updateFintech,
  deleteFintechById,
};
