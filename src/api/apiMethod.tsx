import { headers } from "next/dist/client/components/headers";
import axios from "../config/endpoint";


//bootcamp
const createApplyBootcamp = (data:any) => {
  return axios.post('bootcamp/applybatch')
}
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
const editBootcamp = (data: any) => {
  return axios.patch(`bootcamp/editbatch`, data)
}
const extendBootcamp = (data: any) => {
  return axios.patch(`bootcamp/extendbatch`, data)
}
const pendingBootcamp = (data: any) => {
  return axios.patch(`bootcamp/pendingbatch`, data)
}
const closeBootcamp = (data: any) => {
  console.log('api',data)
  return axios.patch(`bootcamp/closebatch`, data
  // , {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })
)}
const deleteBootcamp = (data:any) => {
  return axios.patch(`bootcamp/deletebatch`, data)
}
const setToRunningBootcamp = (data:any) => {
  return axios.patch(`bootcamp/settorunning`,data)
}

//progName
const getProgName = () => {
  return axios.get(`bootcamp/progname`);
};

//trainer
const getTrainer = () => {
  return axios.get(`bootcamp/trainer`);
};

//trainee
const getTraineebyId = (data:any) => {
  console.log('api', data)
  return axios.get(`bootcamp/trainee/${+data.batch_id}/${+data.trainee_id}`)
}


//Candidat
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


//review
const evaluationDetail = (data:any) => {
  console.log('api',data)
  return axios.patch(`bootcamp/evaluation/evaluationdetail`, data)
}
const editStatusEvaluation = (data:any) => {
  return axios.patch(`bootcamp/evaluation/editstatusevaluation`, data)
}

export default {
  //bootcamp
  getBootcamp,
  createApplyBootcamp,
  getBootcampById,
  getBootcampDraftApply,
  createBootcamp,
  editBootcamp,
  closeBootcamp,
  extendBootcamp,
  pendingBootcamp,
  deleteBootcamp,
  setToRunningBootcamp,
  
  //progname
  getProgName,
  

  //trainer
  getTrainer,

  //trainee,
  getTraineebyId,

  //review
  editStatusEvaluation,
  evaluationDetail,


  //candidat
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
