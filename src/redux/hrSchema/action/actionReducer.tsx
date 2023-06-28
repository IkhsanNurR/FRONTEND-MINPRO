import ActionTypes from "./actionType";
import apiMethod from "@/api/hrSchema/apiMethod";
import { AnyAction } from "@reduxjs/toolkit";

// employee internal

export const doRequestGetEmployee = () => {
  return {
    type: ActionTypes.REQ_GET_EMPLOYEE,
  };
};
export const doResponseGetEmployee = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_EMPLOYEE,
    payload,
  };
};

export const doRequestUpdate = (payload: any) => {
  return {
    type: ActionTypes.REQ_UPDATE,
    payload,
  };
};
export const doResponseUpdate = (payload: any) => {
  return {
    type: ActionTypes.RES_UPDATE,
    payload,
  };
};

export const doRequestTalentJobPost = () => {
  return {
    type: ActionTypes.REQ_TALENT_JOB_POST,
  };
};
export const doResponseTalentJobPost = (payload: any) => {
  return {
    type: ActionTypes.RES_TALENT_JOB_POST,
    payload,
  };
};

export const doCreateSalary = (payload: any) => {
  return {
    type: ActionTypes.REQ_CREATE_SALARY,
    payload,
  };
};

export const doResponseSalary = (payload: any) => {
  return {
    type: ActionTypes.RES_CREATE_SALARY,
    payload,
  };
};

export const doRequestGetForEmployee = () => {
  return {
    type: ActionTypes.REQ_GET_FOR_EMPLOYEE,
  };
};
export const doResponseGetForEmployee = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_FOR_EMPLOYEE,
    payload,
  };
};

export const doRequestGetFilterDepartment = () => {
  return {
    type: ActionTypes.REQ_GET_FILTER_DEPARTMENT,
  };
};
export const doResponseGetFilterDepartment = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_FILTER_DEPARTMENT,
    payload,
  };
};

export const doRequestGetFilterJobRole = () => {
  return {
    type: ActionTypes.REQ_GET_FILTER_JOBROLE,
  };
};
export const doResponseGetFilterJobRole = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_FILTER_JOBROLE,
    payload,
  };
};

export const doRequestGetFilterUserRole = () => {
  return {
    type: ActionTypes.REQ_GET_FILTER_USERROLE,
  };
};
export const doResponseGetFilterUserRole = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_FILTER_USERROLE,
    payload,
  };
};

export const doRequestCreateEmployeeInternal = (payload: any) => {
  console.log("isiPayoadReducerCreate", payload);
  return {
    type: ActionTypes.REQ_CREATE_EMPLOYE_INTERNAL,
    payload,
  };
};
export const doResponseCreateEmployeeInternal = (payload: any) => {
  // console.log("isiPayoadReducerCreate", payload);
  return {
    type: ActionTypes.RES_CREATE_EMPLOYE_INTERNAL,
    payload,
  };
};

// talent placement

export const doRequestTalent = () => {
  return {
    type: ActionTypes.REQ_TALENT,
  };
};
export const doResponseTalent = (payload: any) => {
  return {
    type: ActionTypes.RES_TALENT,
    payload,
  };
};

export const doRequestClientBootcamp = () => {
  return {
    type: ActionTypes.REQ_CLIENT_BOOTCAMP,
  };
};
export const doResponseClientBootcamp = (payload: any) => {
  return {
    type: ActionTypes.RES_CLIENT_BOOTCAMP,
    payload,
  };
};

export const doRequestCreateEmployeeBootcamp = (payload: any) => {
  return {
    type: ActionTypes.REQ_CREATE_BOOTCAMP,
    payload,
  };
};

export const doResponseCreateEmployeeBootcamp = (payload: any) => {
  return {
    type: ActionTypes.RES_CREATE_BOOTCAMP,
    payload,
  };
};

export const doRequestJobType = () => {
  return {
    type: ActionTypes.REQ_JOBTYPE,
  };
};

export const doResponseJobType = (payload: any) => {
  return {
    type: ActionTypes.RES_JOBTYPE,
    payload,
  };
};

export const doRequestFindEmployee = (payload: any) => {
  return {
    type: ActionTypes.REQ_FIND_EMPLOYEE,
    payload,
  };
};

export const doResponseFindEmployee = (payload: any) => {
  return {
    type: ActionTypes.RES_FIND_EMPLOYEE,
    payload,
  };
};

export const doRequestDepartmentHistory = (payload: any) => {
  return {
    type: ActionTypes.REQ_DEPARTMENT_HISTORY,
    payload,
  };
};

export const doResponseDepartmentHistory = (payload: any) => {
  return {
    type: ActionTypes.RES_DEPARTMENT_HISTORY,
    payload,
  };
};

export const doRequestPayHistory = (payload: any) => {
  return {
    type: ActionTypes.REQ_PAY_HISTORY,
    payload,
  };
};

export const doResponsePayHistory = (payload: any) => {
  return {
    type: ActionTypes.RES_PAY_HISTORY,
    payload,
  };
};
