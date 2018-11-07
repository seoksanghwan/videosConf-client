import deepFreeze from 'deep-freeze'
import _ from "lodash";
import reducer, { initialState } from './index'
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
  ieCheck,
  warningCheck,
  roomput
} from '../actions/index'

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
        isLogoutData()
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

});
