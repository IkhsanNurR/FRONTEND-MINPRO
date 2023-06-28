import { takeEvery, call, put } from "redux-saga/effects";
import apimethod from "@/api/hrSchema/apiMethod";
import {
  doResponseClientBootcamp,
  doResponseCreateEmployeeBootcamp,
  doResponseCreateEmployeeInternal,
  doResponseDepartmentHistory,
  doResponseFindEmployee,
  doResponseGetEmployee,
  doResponseGetFilterDepartment,
  doResponseGetFilterJobRole,
  doResponseGetFilterUserRole,
  doResponseGetForEmployee,
  doResponseJobType,
  doResponsePayHistory,
  doResponseSalary,
  doResponseTalent,
  doResponseTalentJobPost,
  doResponseUpdate,
} from "../action/actionReducer";

export function* handleEmployee(): any {
  try {
    const result = yield call(apimethod.findAll);
    console.log("isidatapayloadrequest", result);
    yield put(doResponseGetEmployee(result.data.result[0]));
  } catch (error) {
    yield put(doResponseGetEmployee({ message: error, status: 400 }));
  }
}

export function* handleGetTalentJobPost(): any {
  try {
    const result = yield call(apimethod.findAllfromJobPost);
    yield put(doResponseTalentJobPost(result.data.result[0]));
  } catch (error) {
    yield put(doResponseTalentJobPost({ message: error, status: 400 }));
  }
}

export function* handleForEmployee(): any {
  try {
    const result = yield call(apimethod.findForEmployee);

    yield put(doResponseGetForEmployee(result.data.result[0]));
  } catch (error) {
    yield put(doResponseGetForEmployee({ message: error, status: 400 }));
  }
}
export function* handleFilterDepartment(): any {
  try {
    const result = yield call(apimethod.filterDepartment);
    yield put(doResponseGetFilterDepartment(result.data.result[0]));
  } catch (error) {
    yield put(doResponseGetFilterDepartment({ message: error, status: 400 }));
  }
}

export function* handleFilterJobRole(): any {
  try {
    const result = yield call(apimethod.filterJobrole);
    yield put(doResponseGetFilterJobRole(result.data.result[0]));
  } catch (error) {
    yield put(doResponseGetFilterJobRole({ message: error, status: 400 }));
  }
}

export function* handleFilterUserRole(): any {
  try {
    const result = yield call(apimethod.filterUserRole);
    yield put(doResponseGetFilterUserRole(result.data.result[0]));
  } catch (error) {
    yield put(doResponseGetFilterUserRole({ message: error, status: 400 }));
  }
}

export function* handleCreateEmployeeInternal(action: any): any {
  console.log("isiPayloadCreate", action.payload);
  try {
    const result = yield call(apimethod.createEmployeInternal, action.payload);
    yield put(doResponseCreateEmployeeInternal(result.data.result[0]));
  } catch (error) {
    yield put(
      doResponseCreateEmployeeInternal({ message: error, status: 400 })
    );
  }
}

export function* handleUpdate(action: any): any {
  try {
    const result = yield call(apimethod.updateEmployee, action.payload);
    yield put(doResponseUpdate(result.data.result[0]));
  } catch (error) {
    yield put(doResponseUpdate({ message: error, status: 400 }));
  }
}

export function* handleDepartmentHistory(action: any): any {
  try {
    const result = yield call(apimethod.findDepartmentHistory, action.payload);
    yield put(doResponseDepartmentHistory(result.data.result[0]));
  } catch (error) {
    yield put(doResponseDepartmentHistory({ message: error, status: 400 }));
  }
}

export function* handleTalent(): any {
  try {
    const result = yield call(apimethod.viewTalent);
    yield put(doResponseTalent(result.data.result[0]));
  } catch (error) {
    yield put(doResponseTalent({ message: error, status: 400 }));
  }
}

export function* handleTalentBootcamp(): any {
  try {
    const result = yield call(apimethod.clientBootcamp);
    yield put(doResponseClientBootcamp(result.data.result[0]));
  } catch (error) {
    yield put(doResponseClientBootcamp({ message: error, status: 400 }));
  }
}

export function* handleCreateEmployeeBootcamp(action: any): any {
  console.log("isiDatauntukApi", action.payload);
  try {
    const result = yield call(apimethod.createFromBootcamp, action.payload);
    yield put(doResponseCreateEmployeeBootcamp(result.data));
    // yield put(doResponseCreateEmployeeBootcamp(result.data.result[0]));
  } catch (error) {
    yield put(
      doResponseCreateEmployeeBootcamp({ message: error, status: 400 })
    );
  }
}

export function* getJobtype(): any {
  try {
    const result = yield call(apimethod.jobtype);
    yield put(doResponseJobType(result.data.result[0]));
  } catch (error) {
    yield put(doResponseJobType({ message: error, status: 400 }));
  }
}

export function* handleFindEmployee(action: any): any {
  try {
    const result = yield call(apimethod.findEmployee, action.payload);
    yield put(doResponseFindEmployee(result.data.result[0][0]));
  } catch (error) {
    yield put(doResponseFindEmployee({ message: error, status: 400 }));
  }
}

export function* handlePayHistory(action: any): any {
  try {
    const result = yield call(apimethod.getPayHistory, action.payload);
    yield put(doResponsePayHistory(result.data.result[0]));
  } catch (error) {
    yield put(doResponsePayHistory({ message: error, status: 400 }));
  }
}

export function* handleCreateSalary(action: any): any {
  console.log("isiActionPayload", action.payload);

  try {
    const result = yield call(apimethod.createSalary, action.payload);
    yield put(doResponseSalary(result.data.result[0]));
  } catch (error) {
    yield put(doResponseSalary({ message: error, status: 400 }));
  }
}
