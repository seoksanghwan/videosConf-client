export const IS_LOGIN_USER = 'IS_LOGIN_USER';
export const FETCH_PRODUCTS_BEGIN = 'FETCH_PRODUCTS_BEGIN';
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

export const isLogoutData = () => ({
	type: IS_LOGOUT_DATA
});

export const isLoggedInData = () => ({
	type: IS_LOGGED_IN_DATA
});  

export const fetchProductsBegin = () => ({
	type: FETCH_PRODUCTS_BEGIN
});  

export const getErrors = () => ({
	type: GET_ERRORS
});  

export const roomdData = () => ({
	type: ROOMS_DATA
});

export const isLoginUser = products => ({
  type: IS_LOGIN_USER
});

/* video RTC */
export const rtcSetting = products => ({
  type: RTC_SETTING
});

export const addMeida = products => ({
  type: ADD_MEDIA
});

export const removeVideo = products => ({
  type: REMOVE_VIDEO
});

export const readyToCall = products => ({
  type: READY_TO_CALL
});

export const localVideo = products => ({
  type: LOCAL_VIDEO
});

export const connectedLocal = products => ({
  type: CONNECTED_LOCAL
});

export const disconnectedWebcam = products => ({
  type: DISCONNECTED_WEBCAM
});

export const audioCheck = products => ({
  type: AUDIO_CHECK
});

export const roomAdd = products => ({
  type: ROOM_ADD
});

export const roomRemove = products => ({
  type: ROOM_REMOVE
});

export const channelCheck = products => ({
  type: CHANNEL_CHECK
});

export const passwordCheck = products => ({
  type: PASSWORD_CHECK
});

export const popEventCheck = products => ({
  type: POP_EVENT_CHECK
});

export const popCloseCheck = products => ({
  type: POP_ClOSE_CHECK
});

export const roomMaintenance = products => ({
  type: ROOM_MAINTENANCE
});

export const roomMatchTtile = products => ({
  type: ROOM_TITLE_MATCH
});

export const formatRoomPass = products => ({
  type: FORMAT_ROOM_PASS
});

