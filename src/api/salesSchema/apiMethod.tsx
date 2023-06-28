//sales order
import axios from "../../config/endPoint";
const findAllSalesOrder = (): any => {
  return axios.get(`/sales/salesorder`);
};
const createSalesOrder = (data: any) => {
  return axios.post(`/sales/salesorder`, data);
};
const deleteSalesOrder = (id: any) => {
  return axios.delete(`/sales/salesorder/${id}`);
};
const findUserCartItem = (): any => {
  console.log("mengecek findcartitem");
  return axios.get(`/sales/cartitem`);
};
const findByIdCartItem = (id: any) => {
  console.log("mengecek findcartitem");
  return axios.get(`/sales/cartitem/${id}`);
};
const createCartItem = (data: any) => {
  return axios.post(`/sales/cartitem`, data);
};
const deleteCartItem = (id: any) => {
  return axios.delete(`/sales/cartitem/${id}`);
};
const createSpecialOffer = (data: any) => {
  return axios.post(`/sales/salesorder`, data);
};
const deleteSpecialOffer = (id: any) => {
  return axios.delete(`/sales/specialoffer`);
};
const findAllSpecialOffer = () => {
  return axios.delete(`/sales/specialoffer`);
};
const findAllPayment = () => {
  return axios.get("/payment");
};

export default {
  findAllSalesOrder,
  findAllSpecialOffer,
  findByIdCartItem,
  findAllPayment,
  findUserCartItem,
  createCartItem,
  createSalesOrder,
  createSpecialOffer,
  deleteCartItem,
  deleteSpecialOffer,
  deleteSalesOrder,
};
