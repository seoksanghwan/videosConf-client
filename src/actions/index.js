export const IS_LOGOUT_DATA = 'IS_LOGOUT_DATA';
export const IS_LOGIN_USER = 'IS_LOGIN_USER';
export const IS_LOGGED_IN_DATA = 'IS_LOGGED_IN_DATA';
export const GET_ERRORS = 'GET_ERRORS';
export const ROOMS_DATA = 'ROOMS_DATA';
export const RTC_SETTING = 'RTC_SETTING';
export const ADD_MEDIA = 'ADD_MEDIA';
export const REMOVE_VIDEO = 'REMOVE_VIDEO';
export const READY_TO_CALL = 'READY_TO_CALL';
export const LOCAL_VIDEO = 'LOCAL_VDIEO';
export const AUDIO_CHECK = 'AUDIO_CHECK';
export const ROOM_ADD = 'ROOM_ADD';
export const ROOM_REMOVE = 'ROOM_REMOVE';
export const PASSWORD_CHECK = 'PASSWORD_CHECK';
export const POP_EVENT_CHECK = 'POP_EVENT_CHECK';
export const POP_ClOSE_CHECK = 'POP_ClOSE_CHECK';
export const ROOM_MAINTENANCE = 'ROOM_MAINTENANCE';
export const FORMAT_ROOM_PASS = 'FORMAT_ROOM_PASS';
export const ALERT_MESSAGE_CHANGE = 'ALERT_MESSAGE_CHANGE';
export const SPINNER_ACTION = 'SPINNER_ACTION';
export const ALERT_WARNING = 'ALERT_WARNING';
export const LOGGIN_POP_OPEN = 'LOGGIN_POP_OPEN';
export const ROOM_REMOVE_POP = 'ROOM_REMOVE_POP';
export const IE_CHECK = 'IE_CHECK';
export const WARNING_CHECK = 'WARNING_CHECK';
export const ISROOM_CHECKER = 'ISROOM_CHECKER';

export const isLogoutData = userRemove => ({
  type: IS_LOGOUT_DATA, userRemove
});

export const isLoginUser = (loginAction, userBoolean) => ({
  type: IS_LOGIN_USER, loginAction, userBoolean
});

export const isLoggedInData = (userData, userBoolean) => ({
  type: IS_LOGGED_IN_DATA, userData, userBoolean
});

export const getErrors = (error, itemsFormat, loginFail) => ({
  type: GET_ERRORS, error, itemsFormat, loginFail
});

export const roomdData = roominfo => ({
  type: ROOMS_DATA, roominfo
});

/* video RTC */
export const rtcSetting = payload => ({
  type: RTC_SETTING, payload
});

export const addMeida = peer => ({
  type: ADD_MEDIA, peer
});

export const removeVideo = peer => ({
  type: REMOVE_VIDEO, peer
});

export const readyToCall = getStart => ({
  type: READY_TO_CALL, getStart
});

export const localVideo = local => ({
  type: LOCAL_VIDEO, local
});

export const audioCheck = () => ({
  type: AUDIO_CHECK
});

export const roomAdd = addList => ({
  type: ROOM_ADD, addList
});

export const roomRemove = delData => ({
  type: ROOM_REMOVE, delData
});

export const passwordCheck = (result, title) => ({
  type: PASSWORD_CHECK, result, title
});

export const popEventCheck = (shouldPop, title) => ({
  type: POP_EVENT_CHECK, shouldPop, title
});

export const popCloseCheck = (booelan, popBoolean, deleteMsg) => ({
  type: POP_ClOSE_CHECK, booelan, popBoolean, deleteMsg
});

export const roomMaintenance = (booelan, data) => ({
  type: ROOM_MAINTENANCE, booelan, data
});

export const formatRoomPass = (data, pass) => ({
  type: FORMAT_ROOM_PASS, data, pass
});

export const alertMessageChange = message => ({
  type: ALERT_MESSAGE_CHANGE, message
});

export const spinnerAction = check => ({
  type: SPINNER_ACTION, check
});

export const alertWarning = (alert, color, resultBoolean, passBoolaen) => ({
  type: ALERT_WARNING, alert, color, resultBoolean, passBoolaen
});

export const loginPopOpen = popBoolean => ({
  type: LOGGIN_POP_OPEN, popBoolean
});

export const roomRemovePop = roomId => ({
  type: ROOM_REMOVE_POP, roomId
});

export const ieChecker = ieBoolean => ({
  type: IE_CHECK, ieBoolean
});

export const warningCheck = warningSould => ({
  type: WARNING_CHECK, warningSould
});

export const isroomChecker = checkLength => ({
  type: ISROOM_CHECKER, checkLength
});
