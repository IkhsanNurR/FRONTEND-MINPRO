const ActionType = {
  REQ_GET_BOOTCAMP: "REQ_GET_BOOTCAMP",
  RES_GET_BOOTCAMP: "RES_GET_BOOTCAMP",
  REQ_GET_APPLY_BATCH: "REQ_GET_APPLY_BATCH",
  RES_GET_APPLY_BATCH: "RES_GET_APPLY_BATCH",
  REQ_GET_BOOTCAMP_INDEX: "REQ_GET_BOOTCAMP_INDEX",
  RES_GET_BOOTCAMP_INDEX: "RES_GET_BOOTCAMP_INDEX",
  REQ_CREATE_BOOTCAMP: "REQ_CREATE_BOOTCAMP",
  RES_CREATE_BOOTCAMP: "RES_CREATE_BOOTCAMP",
  REQ_GET_BOOTCAMP_BY_ID: "REQ_GET_BOOTCAMP_BY_ID",
  RES_GET_BOOTCAMP_BY_ID: "RES_GET_BOOTCAMP_BY_ID",
  REQ_GET_DAFTAR_APPLY: "REQ_GET_DAFTAR_APPLY",
  RES_GET_DAFTAR_APPLY: "RES_GET_DAFTAR_APPLY",
  REQ_EDIT_BOOTCAMP: "REQ_EDIT_BOOTCAMP",
  RES_EDIT_BOOTCAMP: "RES_EDIT_BOOTCAMP",
  REQ_CLOSE_BOOTCAMP: "REQ_CLOSE_BOOTCAMP",
  RES_CLOSE_BOOTCAMP: "RES_CLOSE_BOOTCAMP",
  REQ_PENDING_BOOTCAMP: "REQ_PENDING_BOOTCAMP",
  RES_PENDING_BOOTCAMP: "RES_PENDING_BOOTCAMP",
  REQ_EXTEND_BOOTCAMP: "REQ_EXTEND_BOOTCAMP",
  RES_EXTEND_BOOTCAMP: "RES_EXTEND_BOOTCAMP",
  REQ_DELETE_BOOTCAMP: "REQ_DELETE_BOOTCAMP",
  RES_DELETE_BOOTCAMP: "RES_DELETE_BOOTCAMP",
  REQ_SET_TO_RUNNING_BOOTCAMP: "REQ_SET_TO_RUNNING_BOOTCAMP",
  RES_SET_TO_RUNNING_BOOTCAMP: "RES_SET_TO_RUNNING_BOOTCAMP",

  //Reset
  RESET_STATE: "RESET_STATE",
  //ProgName
  REQ_GET_PROGNAME: "REQ_GET_PROGNAME",
  RES_GET_PROGNAME: "RES_GET_PROGNAME",

  //Trainer
  REQ_GET_TRAINER: "REQ_GET_TRAINER",
  RES_GET_TRAINER: "RES_GET_TRAINER",

  //trainee
  REQ_GET_TRAINEE_BY_ID: "REQ_GET_TRAINEE_BY_ID",
  RES_GET_TRAINEE_BY_ID: "RES_GET_TRAINEE_BY_ID",

  //Review
  REQ_EVALUATION_DETAIL: "REQ_EVALUATION_DETAIL",
  RES_EVALUATION_DETAIL: "RES_EVALUATION_DETAIL",
  REQ_EVALUATION_STATUS: "REQ_EVALUATION_STATUS",
  RES_EVALUATION_STATUS: "RES_EVALUATION_STATUS",

  //Cancidat
  REQ_GET_CANDIDAT_APPLY: "REQ_GET_CANDIDAT_APPLY",
  RES_GET_CANDIDAT_APPLY: "RES_GET_CANDIDAT_APPLY",
  REQ_UPDATE_CANDIDAT_APPLY: "REQ_UPDATE_CANDIDAT_APPLY",
  RES_UPDATE_CANDIDAT_APPLY: "RES_UPDATE_CANDIDAT_APPLY",
  REQ_GET_CANDIDAT_FILTERING: "REQ_GET_CANDIDAT_FILTERING",
  RES_GET_CANDIDAT_FILTERING: "RES_GET_CANDIDAT_FILTERING",
  REQ_UPDATE_CANDIDAT_FILTERING: "REQ_UPDATE_CANDIDAT_FILTERING",
  RES_UPDATE_CANDIDAT_FILTERING: "RES_UPDATE_CANDIDAT_FILTERING",
  REQ_GET_CANDIDAT_CONTRACT: "REQ_GET_CANDIDAT_CONTRACT",
  RES_GET_CANDIDAT_CONTRACT: "RES_GET_CANDIDAT_CONTRACT",
  REQ_UPDATE_CANDIDAT_CONTRACT: "REQ_UPDATE_CANDIDAT_CONTRACT",
  RES_UPDATE_CANDIDAT_CONTRACT: "RES_UPDATE_CANDIDAT_CONTRACT",
  REQ_GET_CANDIDAT_DISQUALIFIED: "REQ_GET_CANDIDAT_DISQUALIFIED",
  RES_GET_CANDIDAT_DISQUALIFIED: "RES_GET_CANDIDAT_DISQUALIFIED",
  REQ_UPDATE_CANDIDAT_DISQUALIFIED: "REQ_UPDATE_CANDIDAT_DISQUALIFIED",
  RES_UPDATE_CANDIDAT_DISQUALIFIED: "RES_UPDATE_CANDIDAT_DISQUALIFIED",
  REQ_GET_CANDIDAT_NOTRESPONDING: "REQ_GET_CANDIDAT_NOTRESPONDING",
  RES_GET_CANDIDAT_NOTRESPONDING: "RES_GET_CANDIDAT_NOTRESPONDING",
  REQ_UPDATE_CANDIDAT_NOTRESPONDING: "REQ_UPDATE_CANDIDAT_NOTRESPONDING",
  RES_UPDATE_CANDIDAT_NOTRESPONDING: "RES_UPDATE_CANDIDAT_NOTRESPONDING",

  //talent
  REQ_GET_TALENT: "REQ_GET_TALENT",
  RES_GET_TALENT: "RES_GET_TALENT",

  //orang
  REQ_GET_USER_APPLY_PROGRESS: "REQ_GET_USER_APPLY_PROGRESS",
  RES_GET_USER_APPLY_PROGRESS: "RES_GET_USER_APPLY_PROGRESS",
};

export default ActionType;
