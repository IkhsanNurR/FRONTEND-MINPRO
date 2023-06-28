import ActionType from "../action/actionType";

const initialState = {
  curriculum: [],
  currnum: [],
  userEmployee: [],
  entity_id: [],
  sections: [],
  message: "",
  status: "",
  refresh: "",
};

function curriculumReducer(state = initialState, action: any) {
  let { type, payload, currnumber, sections }: any = action;
  // console.log("curriculumReducer",payload);
  switch (type) {
    case ActionType.RES_GET_CURRICULUM:
      return {
        ...state,
        curriculum: payload[0],
        status: payload.status,
        message: payload.message,
        refresh: true,
      };

    case ActionType.RES_GET_CURRICULUM_BY_ID:
      return {
        ...state,
        entity_id: payload,
        status: payload.status,
        message: payload.message,
        refresh: true,
      };

    case ActionType.RES_GET_CURRNUM:
      return {
        ...state,
        currnum: currnumber,
        status: currnumber.status,
        message: currnumber.message,
        refresh: true,
      };
    case ActionType.RES_CREATE_CURRICULUM:
      return {
        status: payload.status,
        message: payload.message,
        refresh: false,
      };

    case ActionType.RES_CREATE_CURRICULUM:
      return {
        status: payload.status,
        message: payload.message,
        refresh: false,
      };

    case ActionType.RES_UPDATE_CURRICULUM:
      return {
        status: payload.status,
        message: payload.message,
        refresh: false,
      };
    case ActionType.RES_CREATE_SECTION:
      return {
        state,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };

    case ActionType.RES_CREATE_SECTION_DETAIL:
      return {
        state,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };

    case ActionType.RES_GET_MERGE:
      return {
        state,
        section: sections,
        message: sections.message,
        status: sections.status,
        refresh: true,
      };
    case ActionType.RES_EMPLOYEE:
      return { ...state, userEmployee: payload, refresh: true };
    default:
      return state;
  }
}

export default curriculumReducer;
