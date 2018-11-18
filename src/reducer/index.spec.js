import deepFreeze from 'deep-freeze';
import _ from "lodash";
import reducer, { initialState } from './index';
import {
  isLogoutData,
  isLoggedInData,
  getErrors,
  roomdData,
  isLoginUser,
  rtcSetting,
  addMeida,
  removeVideo,
  readyToCall,
  localVideo,
  connectedLocal,
  disconnectedWebcam,
  audioCheck,
  roomAdd,
  roomRemove,
  channelCheck,
  passwordCheck,
  popEventCheck,
  popCloseCheck,
  roomMaintenance,
  roomMatchTtile,
  formatRoomPass,
  alertMessageChange,
  spinnerAction,
  alertWarning,
  loginPopOpen,
  roomRemovePop,
  ieChecker,
  warningCheck,
  isroomChecker
} from '../actions/index';

const setup = (setupBefore = {}, setupAfter = {}, action = {}) => {
  const defaultState = deepFreeze(_.cloneDeep(initialState));
  const stateBefore = { ...defaultState, ...setupBefore };
  const stateAfter = { ...defaultState, ...setupAfter };

  deepFreeze(stateBefore);
  deepFreeze(action);

  return {
    stateBefore,
    stateAfter,
    action
  };
};

describe('reducer', () => {
  it('should provide the initial state', () => {
    const { stateAfter } = setup();
    expect(reducer(undefined, {})).toEqual(stateAfter);
  });

  describe('isLogoutData action', () => {
    it('should handle IS_LOGOUT_DATA action', () => {
      const { stateBefore, stateAfter, action } = setup(
        {},
        {
          isLoggedIn: false,
          items: {}
        },
        isLogoutData({})
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('isLoginUser action', () => {
    it('should handle IS_LOGOUT_DATA action', () => {
      const userData = {
        email: "email",
        exp: 1541590554,
        iat: 1541586954,
        name: "userName",
        uid: "userUid",
        url: "userProfile"
      }
      const { stateBefore, stateAfter, action } = setup(
        {
          isLoggedIn: false,
          items:{}
        },
        {
          isLoggedIn: true,
          items: {
            email: "email",
            exp: 1541590554,
            iat: 1541586954,
            name: "userName",
            uid: "userUid",
            url: "userProfile"
          }
        },
        isLoginUser(userData, true)
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('isLoggedInData action', () => {
    it('should handle isLoggedInData action', () => {
      const userData = {
        email: "email",
        exp: 1541590554,
        iat: 1541586954,
        name: "userName",
        uid: "userUid",
        url: "userProfile"
      }
      const userUsingBoolean = true;
      const { stateBefore, stateAfter, action } = setup(
        {
          isLoggedIn: false,
          items: {}
        },
        {
          isLoggedIn: true,
          items: {
            email: "email",
            exp: 1541590554,
            iat: 1541586954,
            name: "userName",
            uid: "userUid",
            url: "userProfile"
          }
        },
        isLoggedInData(userData, userUsingBoolean)
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('getErrors action', () => {
    it('should handle GET_ERRORS action', () => {
      const { stateBefore, stateAfter, action } = setup(
        {},
        {
          isLoggedIn: false,
          items: {}
        },
        getErrors()
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('roomdData action', () => {
    it('should handle ROOMS_DATA action', () => {
      const { stateBefore, stateAfter, action } = setup(
        {
          isroom : []
        },
        {
          isroom: [{roomsdata : "data"}]
        },
        roomdData([{roomsdata : "data"}])
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('roomRemovePop action', () => {
    it('should handle ROOMS_REMOVE_POP action', () => {
      const { stateBefore, stateAfter, action } = setup(
        {},
        {},
        roomRemovePop('5be7e9a4668a75001539a0b7')
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });
  
  describe('roomRemove action', () => {
    it('should handle ROOMS_REMOVE action', () => {
      const { stateBefore, stateAfter, action } = setup(
        { deleteAelrt : false },
        { deleteAelrt : true },
        roomRemove(true)
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('roomAdd action', () => {
    it('should handle ROOM_ADD action', () => {
      const { stateBefore, stateAfter, action } = setup(
        { 
          isroom : [{}, {}] 
        },
        { 
          isroom : [{}, {}, {}] 
        },
        roomAdd({})
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('roomAdd action', () => {
    it('should handle ROOM_ADD action', () => {
      const { stateBefore, stateAfter, action } = setup(
        { 
          mute : false
        },
        { 
          mute : true
        },
        audioCheck()
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });
  
  describe('alertWarning action', () => {
    it('should handle ALERT_WARNING action', () => {
      const { stateBefore, stateAfter, action } = setup(
        {
          alertBoxBottom: '',
          alertColor: '#3c29aa',
          channelAlertMessage: false,
          pass : false
        },
        { 
          alertBoxBottom: 'string',
          alertColor: 'color',
          channelAlertMessage: true,
          pass : false
        },
        alertWarning('string','color',true, false)
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('alertMessageChange action', () => {
    it('should handle ALERT_MESSAGE_CHANGE action', () => {
      const { stateBefore, stateAfter, action } = setup(
        {
          alertMessage: '회의실 패스워드를 입력해주세요.'
        },
        { 
          alertMessage : 'string'
        },
        alertMessageChange('string')
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('rtcSetting action', () => {
    it('should handle RTC_SETTING action', () => {
      const rtcSet = {
        url: 'server',
        localVideoEl: '',
        dataOnly: false,
        debug: false,
        nick: 'email'
      }
      const { stateBefore, stateAfter, action } = setup(
        {
          webrtc: null,
        },
        { 
          webrtc: rtcSet,
        },
        rtcSetting(rtcSet)
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('localVideo action', () => {
    it('should handle LOCAL_VIDEO action', () => {
      const { stateBefore, stateAfter, action } = setup(
        {},
        {},
        localVideo('func')
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('addMedia action', () => {
    it('should handle ADD_MEDIA action', () => {
      const { stateBefore, stateAfter, action } = setup(
        {
          peers : []
        },
        {
          peers : [{peer : 'peerData'}]
        },
        addMeida({peer : 'peerData'})
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('removeVideo action', () => {
    it('should handle REMOVE_VIDEO action', () => {
      const { stateBefore, stateAfter, action } = setup(
        {
          peers : []
        },
        {
          peers : []
        },
        removeVideo('peerData')
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('readyToCall action', () => {
    it('should handle READY_TO_CALL action', () => {
      const { stateBefore, stateAfter, action } = setup(
        {},
        {},
        readyToCall('RTCfunc')
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('passwordCheck action', () => {
    it('should handle PASSWORD_CHECK action', () => {
      const { stateBefore, stateAfter, action } = setup(
        {
          pass : false,
          focustitle : '',
          spinner : false
        },
        {
          pass : true,
          focustitle : 'title',
          spinner : false
        },
        passwordCheck(true,'title')
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('popEventCheck action', () => {
    it('should handle POP_EVENT_CHECK action', () => {
      const { stateBefore, stateAfter, action } = setup(
        {
          popopen: false,
          focusid: '',
          aboutValueTitle: ''
        },
        {
          popopen: true,
          focusid: 'dataidORtitle',
          aboutValueTitle: 'dataidORtitle'
        },
        popEventCheck(true,'dataidORtitle','dataidORtitle')
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('popCloseCheck action', () => {
    it('should handle POP_ClOSE_CHECK action', () => {
      const { stateBefore, stateAfter, action } = setup(
        {
          popopen: false,
          loggedPopUp: false,
          deleteAelrt: false
        },
        {
          popopen: false,
          loggedPopUp: false,
          deleteAelrt: false
        },
        popCloseCheck(false,false,false)
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('roomMaintenance action', () => {
    it('should handle ROOM_MAINTENANCE action', () => {
      const { stateBefore, stateAfter, action } = setup(
        {
          pass: false,
          inroom: true
        },
        {
          pass:  false ? true : false,
          inroom: false ? true : false
        },
        roomMaintenance(false ? true : false,false ? true : false)
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('formatRoomPass action', () => {
    it('should handle FORMAT_ROOM_PASS action', () => {
      const { stateBefore, stateAfter, action } = setup(
        {},
        {
          pass:  true
        },
        formatRoomPass(null, true)
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('spinnerAction action', () => {
    it('should handle SPINNER_ACTION action', () => {
      const { stateBefore, stateAfter, action } = setup(
        {
          spinner: false
        },
        {
          spinner: true
        },
        spinnerAction(true)
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('loginPopOpen action', () => {
    it('should handle LOGGIN_POP_OPEN action', () => {
      const { stateBefore, stateAfter, action } = setup(
        {
          loggedPopUp: false
        },
        {
          loggedPopUp: true
        },
        loginPopOpen(true)
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('ieCehck action', () => {
    it('should handle IE_CHECK action', () => {
      const { stateBefore, stateAfter, action } = setup(
        {
          ieCehck: ''
        },
        {
          ieCehck: true || false
        },
        ieChecker(true || false)
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('warningCheck action', () => {
    it('should handle IE_CHECK action', () => {
      const { stateBefore, stateAfter, action } = setup(
        {
          pageReturn: false
        },
        {
          pageReturn: true
        },
        warningCheck(true)
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('isroomChecker action', () => {
    it('should handle ISROOM_CHECKER action', () => {
      const { stateBefore, stateAfter, action } = setup(
        {
          checker: true
        },
        {
          checker: false
        },
        isroomChecker(false)
      );
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });
});
