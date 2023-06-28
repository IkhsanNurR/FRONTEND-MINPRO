import ActionTypes from "../action/actionType";

const initialState = {
  candidates_apply: [],
  candidates_interview: [],
  candidates_contract: [],
  candidates_failed: [],
  message: "",
  status: "",
  refresh: "",
};

function JobTalentReducers(state = initialState, action: any) {
  const { type, payload } = action;
  // console.log("talentReducer payload",payload);
  switch (type) {
    case ActionTypes.RES_GET_CANDIDATE_APPLY_JOB:
      return { ...state, candidates_apply: payload, refresh: true };

    case ActionTypes.RES_GET_CANDIDATE_INTERVIEW_JOB:
      return { ...state, candidates_interview: payload, refresh: true };

    case ActionTypes.RES_GET_CANDIDATE_CONTRACT_JOB:
      return { ...state, candidates_contract: payload, refresh: true };

    case ActionTypes.RES_GET_CANDIDATE_FAILED_JOB:
      return { ...state, candidates_failed: payload, refresh: true };

    case ActionTypes.RES_ADD_CANDIDATE_JOB:
      return {
        message: payload.message,
        status: payload.status,
        refresh: false,
      };

    case ActionTypes.RES_UPDATE_CANDIDATE_JOB:
      return {
        message: payload.message,
        status: payload.status,
        refresh: false,
      };
    default:
      return state;
  }
}

export default JobTalentReducers;
