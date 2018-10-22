import LioWebRTC from 'liowebrtc';
import { combineReducers } from 'redux';
import {
	FETCH_PRODUCTS_BEGIN,
	IS_LOGIN_USER,
	IS_LOGGED_IN_DATA,
	IS_LOGOUT_DATA,
	GET_ERRORS,
	ROOMS_DATA,
	RTC_SETTING,
	CONNECTED_LOCAL,
	LOCAL_VIDEO,
	ADD_MEDIA,
	REMOVE_VIDEO,
	READY_TO_CALL,
	DISCONNECTED_WEBCAM,
	AUDIO_CHECK
} from '../actions';

const initialState = {
	items: {},
	isLoggedIn: false,
	error: null,
	isroom: [],
	peers: [],
	inroom: true,
	webrtc: null,
	roomname: '',
	mute: false
};

export default function productReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_PRODUCTS_BEGIN:
			return {
				...state,
				islogedin: false,
				items: {},
				isroom: [],
				inroom: false
			};

		case IS_LOGIN_USER:
			return {
				...state,
				isLoggedIn: true,
				items: action.data,
				inroom: false
			};

		case IS_LOGGED_IN_DATA:
			let user = Boolean(action.data) ? action.data : {};
			let loggedTrue = Boolean(action.data) ? true : false;
			return {
				...state,
				isLoggedIn: loggedTrue,
				items: user,
				inroom: false
			}

		case IS_LOGOUT_DATA:
			return {
				...state,
				isLoggedIn: false,
				items: {},
				isroom: [],
				inroom: false
			}

		case ROOMS_DATA:
			let roomCopy = [...action.data, ...state.isroom];
			return {
				...state,
				isroom: roomCopy,
				inroom: false
			}

		case RTC_SETTING:
			return {
				...state,
				webrtc: action.payload,
				inroom: true
			};

		case ADD_MEDIA:
			let peerCopy = [...state.peers, action.peer];
			return {
				...state,
				peers: peerCopy
			};

		case REMOVE_VIDEO:
			return {
				...state,
				peers: state.peers.filter(p => !p.closed)
			};

		case READY_TO_CALL:
			return {
				...state,
				inroom: true
			};

		case LOCAL_VIDEO:
			return {
				...state
			};

		case CONNECTED_LOCAL:
			return {
				...state
			};

		case DISCONNECTED_WEBCAM:
			return {
				...state
			};

		case AUDIO_CHECK:
			(state.mute) ? action.func.unmute() : action.func.mute();
			return {
				...state,
				mute: !state.mute
			};

		case GET_ERRORS:
			return action.payload;

		default:
			return state;
	}
}