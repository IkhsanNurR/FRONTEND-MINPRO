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
  // console.log('api',data)
  return axios.patch(`bootcamp/updatestatusapply`, data);
};
const getCandidatFiltering = () => {
  return axios.get(`bootcamp/orangfiltering`);
};
const updateCandidatFiltering = (data:any) => {
  // console.log('api', data)
  return axios.patch(`bootcamp/updatecandidatefiltering`, data);
};
const getCandidatContract = () => {
  return axios.get(`bootcamp/orangcontract`);
};
const updateCandidatContract = (data:any) => {
  return axios.patch(`bootcamp/updatecandidatecontract`,data);
};
const getCandidatDisqualified = () => {
  return axios.get(`bootcamp/orangdisqualified`)
}
const updateCandidatDisqualified = (data:any) => {
  console.log('api',data) 
  return axios.patch(`bootcamp/updatecandidatedisqualified`,data)
}
const getCandidatNotResponding = () => {
  return axios.get(`bootcamp/orangnotresponding`)
}
const updateCandidatNotResponding = (data:any) => {
  return axios.patch(`bootcamp/updatecandidatenotresponding`,data)
}

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
  updateCandidatFiltering,
  getCandidatContract,
  updateCandidatContract,
  getCandidatDisqualified,
  updateCandidatDisqualified,
  getCandidatNotResponding,
  updateCandidatNotResponding
};
