import ActionTypes from "./actionType";

/*------------ JOB POST SECTION -------------*/
export const doRequestGetJobPost = () => {
  return {
    type: ActionTypes.REQ_GET_JOBPOST,
  };
};
export const doResponseGetJobPost = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_JOBPOST,
    payload,
  };
};

export const doRequestGetJobPostById = (payload: any) => {
  return {
    type: ActionTypes.REQ_GET_JOBPOST_BY_ID,
    payload,
  };
};
export const doResponseGetJobPostById = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_JOBPOST_BY_ID,
    payload,
  };
};

export const doRequestGetCurnumber = () => {
  return {
    type: ActionTypes.REQ_GET_CURNUMBER,
  };
};
export const doResponseGetCurnumber = (cur_number: any) => {
  return {
    type: ActionTypes.RES_GET_CURNUMBER,
    cur_number,
  };
};

export const doRequestGetPhoto = () => {
  return {
    type: ActionTypes.REQ_GET_JOBPHOTO,
  };
};
export const doResponseGetPhoto = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_JOBPHOTO,
    payload,
  };
};

export const doRequestAddJobPost = (payload: any) => {
  return {
    type: ActionTypes.REQ_ADD_JOBPOST,
    payload,
  };
};

export const doResponseAddJobPost = (payload: any) => {
  return {
    type: ActionTypes.RES_ADD_JOBPOST,
    payload,
  };
};

export const doRequestUpdateJobPost = (payload: any) => {
  return {
    type: ActionTypes.REQ_UPDATE_JOBPOST,
    payload,
  };
};

export const doResponseUpdateJobPost = (payload: any) => {
  return {
    type: ActionTypes.RES_UPDATE_JOBPOST,
    payload,
  };
};

export const doRequestDeleteJobPost = (payload: any) => {
  return {
    type: ActionTypes.REQ_DELETE_JOBPOST,
    payload,
  };
};

export const doResponseDeleteJobPost = (payload: any) => {
  return {
    type: ActionTypes.RES_DELETE_JOBPOST,
    payload,
  };
};

export const doRequestUpdateStatus = (payload: any) => {
  return {
    type: ActionTypes.REQ_UPDATE_STATUS,
    payload,
  };
};

export const doResponseUpdateStatus = (payload: any) => {
  return {
    type: ActionTypes.RES_UPDATE_STATUS,
    payload,
  };
};

export const doRequestSearchJobPost = (payload: any) => {
  return {
    type: ActionTypes.REQ_SEARCH_JOBPOST,
    payload,
  };
};

export const doResponseSearchJobPost = (payload: any) => {
  return {
    type: ActionTypes.RES_SEARCH_JOBPOST,
    payload,
  };
};

/*------------ CLIENT SECTION -------------*/

export const doRequestGetClient = () => {
  return {
    type: ActionTypes.REQ_GET_CLIENT,
  };
};
export const doResponseGetClient = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_CLIENT,
    payload,
  };
};

export const doRequestGetClientById = (payload: any) => {
  return {
    type: ActionTypes.REQ_GET_CLIENT_BY_ID,
    payload,
  };
};
export const doResponseGetClientById = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_CLIENT_BY_ID,
    payload,
  };
};

export const doRequestAddClient = (payload: any) => {
  return {
    type: ActionTypes.REQ_ADD_CLIENT,
    payload,
  };
};

export const doResponseAddClient = (payload: any) => {
  return {
    type: ActionTypes.RES_ADD_CLIENT,
    payload,
  };
};

export const doRequestUpdateClient = (payload: any) => {
  return {
    type: ActionTypes.REQ_UPDATE_CLIENT,
    payload,
  };
};

export const doResponseUpdateClient = (payload: any) => {
  return {
    type: ActionTypes.RES_UPDATE_CLIENT,
    payload,
  };
};

export const doRequestDeleteClient = (payload: any) => {
  return {
    type: ActionTypes.REQ_DELETE_CLIENT,
    payload,
  };
};

export const doResponseDeleteClient = (payload: any) => {
  return {
    type: ActionTypes.RES_DELETE_CLIENT,
    payload,
  };
};

/*--------------- EMPLOYEE RANGE SECTION ---------------*/

export const doRequestGetEmprange = () => {
  return {
    type: ActionTypes.REQ_GET_EMPRANGE,
  };
};
export const doResponseGetEmprange = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_EMPRANGE,
    payload,
  };
};

/*------------ TALENT APPLY SECTION -------------*/

export const doRequestAddCandidate = (payload: any) => {
  return {
    type: ActionTypes.REQ_ADD_CANDIDATE_JOB,
    payload,
  };
};

export const doResponseAddCadidate = (payload: any) => {
  return {
    type: ActionTypes.RES_ADD_CANDIDATE_JOB,
    payload,
  };
};

//apply
export const doRequestGetCandidateApply = () => {
  return {
    type: ActionTypes.REQ_GET_CANDIDATE_APPLY_JOB,
  };
};
export const doResponseGetCandidateApply = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_CANDIDATE_APPLY_JOB,
    payload,
  };
};

//interview
export const doRequestGetCandidateInterview = () => {
  return {
    type: ActionTypes.REQ_GET_CANDIDATE_INTERVIEW_JOB,
  };
};
export const doResponseGetCandidateInterview = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_CANDIDATE_INTERVIEW_JOB,
    payload,
  };
};

//contract
export const doRequestGetCandidateContract = () => {
  return {
    type: ActionTypes.REQ_GET_CANDIDATE_CONTRACT_JOB,
  };
};
export const doResponseGetCandidateContract = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_CANDIDATE_CONTRACT_JOB,
    payload,
  };
};

//failed
export const doRequestGetCandidateFailed = () => {
  return {
    type: ActionTypes.REQ_GET_CANDIDATE_FAILED_JOB,
  };
};
export const doResponseGetCandidateFailed = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_CANDIDATE_FAILED_JOB,
    payload,
  };
};

export const doRequestUpdateCandidate = (payload: any) => {
  return {
    type: ActionTypes.REQ_UPDATE_CANDIDATE_JOB,
    payload,
  };
};

export const doResponseUpdateCandidate = (payload: any) => {
  return {
    type: ActionTypes.RES_UPDATE_CANDIDATE_JOB,
    payload,
  };
};
