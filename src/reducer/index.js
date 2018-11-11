import { combineReducers } from 'redux';
import {
	IS_LOGIN_USER,
	IS_LOGGED_IN_DATA,
	IS_LOGOUT_DATA,
	GET_ERRORS,
	ROOMS_DATA,
	RTC_SETTING,
	LOCAL_VIDEO,
	ADD_MEDIA,
	REMOVE_VIDEO,
	READY_TO_CALL,
	AUDIO_CHECK,
	ROOM_ADD,
	ROOM_REMOVE,
	PASSWORD_CHECK,
	POP_EVENT_CHECK,
	POP_ClOSE_CHECK,
	ROOM_MAINTENANCE,
	FORMAT_ROOM_PASS,
	ALERT_MESSAGE_CHANGE,
	SPINNER_ACTION,
	ALERT_WARNING,
	LOGGIN_POP_OPEN,
	ROOM_REMOVE_POP,
	IE_CHECK,
	WARNING_CHECK
} from '../actions';

export const initialState = {
	items: {},
	isLoggedIn: false,
	error: null,
	isroom: [],
	peers: [],
	inroom: true,
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
	alertBoxBottom: '',
	alertColor: '#3c29aa',
	channelAlertMessage: false,
	loggedPopUp: false,
	deleteAelrt: false,
	ieCehck: '',
	pageReturn: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {

		case IS_LOGIN_USER:
			return {
				...state,
				isLoggedIn: true,
				items: action.loginAction
			};

		case IS_LOGGED_IN_DATA:
			let user = Boolean(action.userData) ? action.userData : {};
			let loggedTrue = Boolean(action.userBoolean) ? true : false;
			return {
				...state,
				isLoggedIn: loggedTrue,
				items: user
			}

		case IS_LOGOUT_DATA:
			return {
				...state,
				isLoggedIn: false,
				items: action.userRemove
			}

		case ROOMS_DATA:
			return {
				...state,
				isroom: action.roominfo
			}

		case ROOM_ADD:
			const dataroom = [...state.isroom, action.addList];
			return {
				...state,
				isroom: dataroom
			}

		case ROOM_REMOVE_POP:
			const removeRoom = state.isroom;
			const roomId = action.roomId;
			const removeUpdate = removeRoom.filter((data) => roomId !== data._id);
			return {
				...state,
				isroom: removeUpdate
			}

		case ROOM_REMOVE:
			return {
				...state,
				deleteAelrt: action.delData
			}

		case RTC_SETTING:
			return {
				...state,
				webrtc: action.rtc
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

		case AUDIO_CHECK:
			return {
				...state,
				mute: !state.mute
			};

		case PASSWORD_CHECK:
			return {
				...state,
				pass: action.result,
				focustitle: action.title,
				spinner: false
			}

		case POP_EVENT_CHECK:
			return {
				...state,
				popopen: action.shouldPop,
				focusid: action.title
			}

		case FORMAT_ROOM_PASS:
			return {
				...state,
				pass: action.pass
			}

		case POP_ClOSE_CHECK:
			return {
				...state,
				popopen: action.closeBtn,
				loggedPopUp: action.popBoolean,
				deleteAelrt: action.deleteMsg
			}

		case ROOM_MAINTENANCE:
			return {
				...state,
				pass: action.data,
				inroom: action.roomBoolean
			}

		case ALERT_MESSAGE_CHANGE:
			return {
				...state,
				alertMessage: action.message
			}

		case SPINNER_ACTION:
			return {
				...state,
				spinner: action.check
			}

		case ALERT_WARNING:
			return {
				...state,
				alertBoxBottom: action.alert,
				alertColor: action.color,
				channelAlertMessage: action.resultBoolean
			}

		case LOGGIN_POP_OPEN:
			return {
				...state,
				loggedPopUp: action.popBoolean
			}

		case IE_CHECK:
			return {
				...state,
				ieCehck: action.ieBoolean
			}

		case WARNING_CHECK:
			return {
				...state,
				pageReturn: action.warningSould
			}

		case GET_ERRORS:
			return {
				...state,
				items: {},
				isLoggedIn: false
			}

		default:
			return state;
	}
}

export default reducer;