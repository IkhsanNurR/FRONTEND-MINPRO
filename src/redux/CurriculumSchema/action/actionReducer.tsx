import actionType from "./actionType";

export const reqGetCurriclum = () => {
  return {
    type: actionType.REQ_GET_CURRICULUM,
  };
};
export const resGetCurriculum = (payload: any) => {
  return {
    type: actionType.RES_GET_CURRICULUM,
    payload,
  };
};

export const resGetIdCurriculum = (payload: any) => {
  return {
    type: actionType.RES_GET_CURRICULUM_BY_ID,
    payload,
  };
};
export const reqGetIdCurriculum = (payload: any) => {
  return {
    type: actionType.REQ_GET_CURRICULUM_BY_ID,
    payload,
  };
};

export const reqCreateCurriculum = (payload: any) => {
  // console.log("actionReducer", payload);
  return {
    type: actionType.REQ_CREATE_CURRICULUM,
    payload,
  };
};
export const resCreateCurriculum = (payload: any) => {
  // console.log("actionReducer response", payload);
  return {
    type: actionType.RES_CREATE_CURRICULUM,
    payload,
  };
};
export const reqGetCurrNum = () => {
  return {
    type: actionType.REQ_GET_CURRNUM,
  };
};
export const resGetCurrNum = (currnumber: any) => {
  return {
    type: actionType.RES_GET_CURRNUM,
    currnumber,
  };
};

export const getEmployee = () => {
  return {
    type: actionType.REQ_EMPLOYEE,
  };
};

export const getEmployeeResponse = (payload: any) => {
  return {
    type: actionType.RES_EMPLOYEE,
    payload,
  };
};

export const reqUpdateCurriculum = (payload: any) => {
  // console.log("payload", payload);
  return {
    type: actionType.REQ_UPDATE_CURRICULUM,
    payload,
  };
};

export const resUpdateCurriculum = (payload: any) => {
  console.log("payload", payload);
  return {
    type: actionType.RES_UPDATE_CURRICULUM,
    payload,
  };
};

export const resCreateSection = (payload: any) => {
  return {
    type: actionType.RES_CREATE_SECTION,
    payload,
  };
};
export const reqCreateSection = (payload: any) => {
  return {
    type: actionType.REQ_CREATE_SECTION,
    payload,
  };
};

export const resCreateSectionDetail = (payload: any) => {
  return {
    type: actionType.RES_CREATE_SECTION_DETAIL,
    payload,
  };
};

export const reqCreateSectionDetail = (id: any, payload: any) => {
  return {
    type: actionType.REQ_CREATE_SECTION_DETAIL,
    id,
    payload,
  };
};

export const reqGetSectionMerge = () => {
  return {
    type: actionType.REQ_GET_MERGE,
  };
};
export const resGetSectionMergeRes = (sections: any) => {
  return {
    type: actionType.RES_GET_MERGE,
    sections,
  };
};
