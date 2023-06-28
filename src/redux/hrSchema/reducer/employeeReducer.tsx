import ActionTypes from "../action/actionType";

const initialState = {
  employee: [],
  employeeJobPost: [],
  users: [],
  department: [],
  jobrole: [],
  userrole: [],
  departmentHistory: [],
  detailEmployee: [],
  payHistory: [],
  message: "",
  refresh: "",
};

function EmployeeReducer(state = initialState, action: any) {
  const { type, payload } = action;
  console.log("pyloademp", payload);
  switch (type) {
    //RES_TALENT_JOB_POST

    case ActionTypes.RES_GET_EMPLOYEE:
      return { ...state, employee: payload, refresh: true };
    case ActionTypes.RES_TALENT_JOB_POST:
      return { ...state, employeeJobPost: payload, refresh: true };
    case ActionTypes.RES_UPDATE:
      return { ...state, message: payload.message, refresh: true };
    case ActionTypes.RES_GET_FOR_EMPLOYEE:
      return { ...state, users: payload, refresh: true };
    case ActionTypes.RES_GET_FILTER_DEPARTMENT:
      return { ...state, department: payload, refresh: true };
    case ActionTypes.RES_GET_FILTER_JOBROLE:
      return { ...state, jobrole: payload, refresh: true };
    case ActionTypes.RES_GET_FILTER_USERROLE:
      return { ...state, userrole: payload, refresh: true };
    case ActionTypes.RES_CREATE_EMPLOYE_INTERNAL:
      return { ...state, message: payload.message, refresh: true };
    case ActionTypes.RES_FIND_EMPLOYEE:
      return { ...state, detailEmployee: payload, refresh: true };
    case ActionTypes.RES_DEPARTMENT_HISTORY:
      return { ...state, departmentHistory: payload, refresh: true };
    case ActionTypes.RES_PAY_HISTORY:
      return { ...state, payHistory: payload, refresh: true };
    case ActionTypes.RES_CREATE_SALARY:
      return { ...state, message: payload.message, refresh: true };
    case ActionTypes.RESET_STATE:
      return { initialState };

    default:
      return state;
  }
}

export default EmployeeReducer;
