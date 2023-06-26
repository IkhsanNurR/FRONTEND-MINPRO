import axios from "@/config/endPoint";

const findAllBank = () => {
  return axios.get("/bank/All");
};

const createBank = (data: any) => {
  return axios.post("/bank/Create", data);
};

const updateBankById = (data: any) => {
  return axios.put(`/bank/Update/${data.bank_entity_id}`, data);
};

const deleteBankById = (val: any) => {
  return axios.delete(`/bank/${val.bank_entity_id}`);
};

export default {
  findAllBank,
  createBank,
  deleteBankById,
  updateBankById,
};
