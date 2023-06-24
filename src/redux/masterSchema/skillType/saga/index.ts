// import apiMethod from "@/pages/api/masterSchema/skillType/apiMethod";
import apiMethod from "@/api/masterSchema/skillType/apiMethod";
import { call, put } from "redux-saga/effects";
import { getSkillTypeResponse } from "../action/actionReducer";

export function* handleGetSkillType(): any {
  try {
    const res = yield call(apiMethod.getSkillType);
    yield put(getSkillTypeResponse(res.data));
  } catch (error) {
    yield put(
      getSkillTypeResponse({
        message: error,
        status: 400,
      })
    );
  }
}
