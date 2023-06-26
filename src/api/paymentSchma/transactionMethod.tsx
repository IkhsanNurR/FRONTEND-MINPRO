import axios from "@/config/endPoint";

const findAllTransaction = () => {
  return axios.get("/transaction-payment/View");
};

export default {
  findAllTransaction,
};
