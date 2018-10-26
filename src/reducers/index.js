import LioWebRTC from 'liowebrtc';
import { combineReducers } from 'redux';
import createHistory from 'history/createBrowserHistory';
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
	AUDIO_CHECK,
	ROOM_ADD,
	ROOM_REMOVE,
	CHANNEL_CHECK,
	PASSWORD_CHECK,
	POP_EVENT_CHECK,
	POP_ClOSE_CHECK,
	ROOM_MAINTENANCE,
	ROOM_TITLE_MATCH,
	FORMAT_ROOM_PASS,
	ALERT_MESSAGE_CHANGE,
	SPINNER_ACTION,
	ALERT_WARNING
} from '../actions';

const initialState = {
	items: {},
	isLoggedIn: false,
	error: null,
	isroom: [],
	peers: [],
	inroom: false,
	webrtc: null,
	roomname: '',
	mute: false,
	length: 0,
	pass: false,
	popopen: false,
	focusid: '',
	focustitle: '',
	aboutValueTitle: '',
	alertMessage: '회의실 패스워드를 입력해주세요.',
	spinner: false,
	alertBoxBottom : '패스워드를 입력해주세요.',
	alertColor : '#3c29aa'
};
const history = createHistory({ forceRefresh: true });

export default function productReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_PRODUCTS_BEGIN:
			return {
				...state,
				islogedin: false,
				items: {},
				isroom: []
			};

		case IS_LOGIN_USER:
			return {
				...state,
				isLoggedIn: true,
				items: action.data
			};

		case IS_LOGGED_IN_DATA:
			let user = Boolean(action.data) ? action.data : {};
			let loggedTrue = Boolean(action.data) ? true : false;
			return {
				...state,
				isLoggedIn: loggedTrue,
				items: user
			}

		case IS_LOGOUT_DATA:
			return {
				...state,
				isLoggedIn: false,
				items: {},
				isroom: []
			}

		case ROOMS_DATA:
			let roomCopy = [...action.data, ...state.isroom];
			return {
				...state,
				isroom: roomCopy
			}

		case ROOM_ADD:
			const dataroom = [...state.isroom, action.data];
			return {
				...state,
				isroom: dataroom
			}

		case ROOM_REMOVE:
			const removeRoom = state.isroom;
			const roomId = action.data;
			const removeUpdate = removeRoom.filter((data) => roomId !== data._id);
			return {
				...state,
				isroom: removeUpdate
			}

		case RTC_SETTING:
			return {
				...state,
				webrtc: action.payload
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
				...state
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

		case CHANNEL_CHECK:
			return {
				...state
			}

		case PASSWORD_CHECK:
			if (action.result) {
				state.inroom = true
			} else {
				state.inroom = false
			}
			return {
				...state,
				pass: action.result,
				focustitle: action.title,
				spinner:false
			}

		case POP_EVENT_CHECK:
			return {
				...state,
				popopen: action.booelan,
				focusid: action.dataId,
				aboutValueTitle: action.targetTitle
			}

		case FORMAT_ROOM_PASS:
			return {
				...state,
				pass : action.pass
			}

		case POP_ClOSE_CHECK:
			return {
				...state,
				popopen: action.booelan
			}

		case ROOM_MAINTENANCE:
			return {
				...state,
				popopen: action.booelan,
				pass: action.data
			}

		case ROOM_TITLE_MATCH:
			return {
				...state,
				inroom : action.roomBoolean
			}

		case ALERT_MESSAGE_CHANGE:
			return {
				...state,
				alertMessage: action.message
			}
		
		case SPINNER_ACTION:
			return {
				...state,
				spinner:action.check
			}
		
		case ALERT_WARNING:
			return {
				...state,
				alertBoxBottom : action.alert,
				alertColor : action.color
			}

		case GET_ERRORS:
			return action.payload;

		default:
			return state;
	}
}