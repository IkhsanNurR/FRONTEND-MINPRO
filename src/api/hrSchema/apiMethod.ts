import axios from "@/config/endPoint";

const findAll = () => {
  return axios.get("/hr/employee");
};

const findAllfromJobPost = () => {
  return axios.get("/hr/employee-jobpost");
};
const findForEmployee = () => {
  return axios.get("/hr/for-employee");
};

const filterDepartment = () => {
  return axios.get("/hr/filter-department");
};

const filterJobrole = () => {
  return axios.get("/hr/filter-jobrole");
};

const filterUserRole = () => {
  return axios.get("/hr/filter-userrole");
};

const createEmployeInternal = (data: any) => {
  return axios.post("/hr/create", data);
};

const updateEmployee = (data: any) => {
  return axios.patch("/hr/update", data);
};

const viewTalent = () => {
  return axios.get("/hr/talent");
};
const clientBootcamp = () => {
  return axios.get("/hr/client-bootcamp");
};

const jobtype = () => {
  return axios.get("/hr/jobtype");
};

const createFromBootcamp = (data: any) => {
  return axios.post("/hr/createfrombootcamp", data);
};

const findEmployee = (data: any) => {
  return axios.get(`/hr/find-one/${data}`);
};

const findDepartmentHistory = (data: any) => {
  return axios.get(`/hr/department-history/${data}`);
};

const getPayHistory = (data: any) => {
  return axios.get(`/hr/pay-history/${data}`);
};

export default {
  findAll,
  findForEmployee,
  filterDepartment,
  filterJobrole,
  filterUserRole,
  createEmployeInternal,
  viewTalent,
  clientBootcamp,
  createFromBootcamp,
  jobtype,
  findEmployee,
  findAllfromJobPost,
  updateEmployee,
  findDepartmentHistory,
  getPayHistory,
};
