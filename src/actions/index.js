export const IS_LOGIN_USER = 'IS_LOGIN_USER';
export const GET_ERRORS = 'GET_ERRORS';
export const IS_LOGGED_IN_DATA = 'IS_LOGGED_IN_DATA';
export const IS_LOGOUT_DATA = 'IS_LOGOUT_DATA';
export const ROOMS_DATA = 'ROOMS_DATA';
export const RTC_SETTING = 'RTC_SETTING';
export const ADD_MEDIA = 'ADD_MEDIA';
export const REMOVE_VIDEO = 'REMOVE_VIDEO';
export const READY_TO_CALL = 'READY_TO_CALL';
export const LOCAL_VIDEO = 'LOCAL_VDIEO';
export const CONNECTED_LOCAL = 'CONNECTED_LOCAL';
export const DISCONNECTED_WEBCAM = 'DISCONNECTED_WEBCAM';
export const AUDIO_CHECK = 'AUDIO_CHECK';
export const ROOM_ADD = 'ROOM_ADD';
export const ROOM_REMOVE = 'ROOM_REMOVE';
export const CHANNEL_CHECK = 'CHANNEL_CHECK';
export const PASSWORD_CHECK = 'PASSWORD_CHECK';
export const POP_EVENT_CHECK = 'POP_EVENT_CHECK';
export const POP_ClOSE_CHECK = 'POP_ClOSE_CHECK';
export const ROOM_MAINTENANCE = 'ROOM_MAINTENANCE';
export const ROOM_TITLE_MATCH = 'ROOM_TITLE_MATCH';
export const FORMAT_ROOM_PASS = 'FORMAT_ROOM_PASS';
export const ALERT_MESSAGE_CHANGE = 'ALERT_MESSAGE_CHANGE';
export const SPINNER_ACTION = 'SPINNER_ACTION';
export const ALERT_WARNING = 'ALERT_WARNING';
export const LOGGIN_POP_OPEN = 'LOGGIN_POP_OPEN';
export const ROOM_REMOVE_POP = 'ROOM_REMOVE_POP';
export const IE_CHECK = 'IE_CHECK';
export const WARNING_CHECK = 'WARNING_CHECK';

export const isLogoutData = userRemove => ({
  type: IS_LOGOUT_DATA, userRemove
});

export const isLoggedInData = userData => ({
  type: IS_LOGGED_IN_DATA, userData
});

export const getErrors = error => ({
  type: GET_ERRORS, error
});

export const roomdData = roominfo => ({
  type: ROOMS_DATA, roominfo
});

export const isLoginUser = loginaction => ({
  type: IS_LOGIN_USER, loginaction
});

/* video RTC */
export const rtcSetting = rtc => ({
  type: RTC_SETTING, rtc
});

export const addMeida = remoteMedia => ({
  type: ADD_MEDIA, remoteMedia
});

export const removeVideo = peerOut => ({
  type: REMOVE_VIDEO, peerOut
});

export const readyToCall = getStart => ({
  type: READY_TO_CALL, getStart
});

export const localVideo = local => ({
  type: LOCAL_VIDEO, local
});

export const connectedLocal = connect => ({
  type: CONNECTED_LOCAL, connect
});

export const disconnectedWebcam = chatOut => ({
  type: DISCONNECTED_WEBCAM, chatOut
});

export const audioCheck = muteOn => ({
  type: AUDIO_CHECK, muteOn
});

export const roomAdd = addList => ({
  type: ROOM_ADD, addList
});

export const roomRemove = delData => ({
  type: ROOM_REMOVE, delData
});

export const channelCheck = check => ({
  type: CHANNEL_CHECK, check
});

export const passwordCheck = password => ({
  type: PASSWORD_CHECK, password
});

export const popEventCheck = popup => ({
  type: POP_EVENT_CHECK, popup
});

export const popCloseCheck = closeBtn => ({
  type: POP_ClOSE_CHECK, closeBtn
});

export const roomMaintenance = roomUsing => ({
  type: ROOM_MAINTENANCE, roomUsing
});

export const roomMatchTtile = roomMatch => ({
  type: ROOM_TITLE_MATCH, roomMatch
});

export const formatRoomPass = passDel => ({
  type: FORMAT_ROOM_PASS, passDel
});

export const alertMessageChange = alertMsg => ({
  type: ALERT_MESSAGE_CHANGE, alertMsg
});

export const spinnerAction = spinner => ({
  type: SPINNER_ACTION, spinner
});

export const alertWarning = warning => ({
  type: ALERT_WARNING, warning
});

export const loginPopOpen = loginMsg => ({
  type: LOGGIN_POP_OPEN, loginMsg
});

export const roomRemovePop = popDel => ({
  type: ROOM_REMOVE_POP, popDel
});

export const ieCheck = ieVer => ({
  type: IE_CHECK, ieVer
});

export const warningCheck = warningMsg => ({
  type: WARNING_CHECK, warningMsg
});