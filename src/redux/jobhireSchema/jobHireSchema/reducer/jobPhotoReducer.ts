import ActionTypes from "../action/actionType";

const initialState = {
  job_photo: [],
  message: "",
  status: "",
  refresh: "",
};

function JobPhotoReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.RES_GET_JOBPHOTO:
      return { state, job_photo: payload, refresh: true };

    default:
      return state;
  }
}

export default JobPhotoReducers;
