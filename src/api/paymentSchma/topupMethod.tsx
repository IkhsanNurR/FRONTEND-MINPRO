import axios from "@/config/endPoint";

const TopupAccount = (data: any) => {
  return axios.post("/transaction-payment/Topup", data);
};

export default {
  TopupAccount,
};
