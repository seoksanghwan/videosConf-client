import LioWebRTC from 'liowebrtc';
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
  type: IS_LOGIN_USER,
  payload: { products }
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