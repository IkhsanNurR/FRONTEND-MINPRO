import { headers } from "next/dist/client/components/headers";
import axios from "../config/endpoint";


//bootcamp
const getBootcamp = () => {
  return axios.get("bootcamp");
};
const getBootcampById = (id: any) => {
  return axios.get(`bootcamp/findbatch/${id}`);
};
const getBootcampDraftApply = () => {
  return axios.get(`bootcamp/orangdaftarupdate`);
};
const createBootcamp = (data:any) => {
  return axios.post(`bootcamp/createbatch`, data);
};


//progName
const getProgName = () => {
  return axios.get(`bootcamp/progname`);
};

//trainer
const getTrainer = () => {
  return axios.get(`bootcamp/trainer`);
};

//CandidatApply
const getCandidatApply = () => {
  return axios.get(`bootcamp/orangapply`);
};
const updateCandidatApply = (data:any) => {
  console.log('api',data)
  return axios.patch(`bootcamp/updatestatusapply`, data
//   ,{
//   headers: {
//     'Content-Type': 'application/json'
// }},
);
};
const getCandidatFiltering = () => {
  return axios.get(`bootcamp/orangfiltering`);
};

export default {
  getBootcamp,
  getBootcampById,
  getBootcampDraftApply,
  createBootcamp,
  
  getProgName,
  
  getTrainer,

  getCandidatApply,
  updateCandidatApply,
  getCandidatFiltering,
};
