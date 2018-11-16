import { connect } from "react-redux";
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { debounce } from "lodash";
import * as firebase from 'firebase';
import LioWebRTC from 'liowebrtc';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import App from "../components/App.jsx";
import {
  isLoginUser,
  isLoggedInData,
  isLogoutData,
  getErrors,
  roomdData,
  localVideo,
  rtcSetting,
  addMeida,
  removeVideo,
  readyToCall,
  audioCheck,
  roomAdd,
  roomRemove,
  passwordCheck,
  popEventCheck,
  popCloseCheck,
  roomMaintenance,
  formatRoomPass,
  alertMessageChange,
  spinnerAction,
  alertWarning,
  loginPopOpen,
  roomRemovePop,
  ieChecker,
  warningCheck
} from '../actions';

import createHistory from 'history/createBrowserHistory';
let rtc;
let message;
const simpLioRTC = 'https://sm1.lio.app:443/';
const localHostIp = 'https://videos-conf-service.herokuapp.com/';
const localHostIpApi = `${localHostIp}api/auth/`;
const provider = new firebase.auth.GoogleAuthProvider();
const history = createHistory({ forceRefresh: true });
const socket = io(localHostIp);
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  }
  else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

const get_version_of_IE = () => {
  var word;
  var agent = navigator.userAgent.toLowerCase();
  if (navigator.appName == "Microsoft Internet Explorer") {
    word = "msie ";
  } else if (agent.search("trident") > -1) {
    word = "trident/.*rv:";
  } else if (agent.search("edge/") > -1) {
    word = "edge/";
  } else {
    return -1;
  }
  var reg = new RegExp(word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})");
  if (reg.exec(agent) != null) return parseFloat(RegExp.$1 + RegExp.$2);
  return -1;
}

const removeData = (dispatch) => {
  let roomDataRmove = localStorage.removeItem('roomPassResults');
  let roomNull = roomDataRmove === null ? false : null
  dispatch(roomMaintenance(roomNull));
}

const mapStateToProps = state => ({
  items: state.items,
  isLoggedIn: state.isLoggedIn,
  error: state.error,
  isroom: state.isroom,
  inroom: state.inroom,
  peers: state.peers,
  webrtc: state.webrtc,
  mute: state.mute,
  length: state.length,
  popopen: state.popopen,
  focusid: state.focusid,
  pass: state.pass,
  focustitle: state.focustitle,
  aboutValueTitle: state.aboutValueTitle,
  alertMessage: state.alertMessage,
  spinner: state.spinner,
  alertBoxBottom: state.alertBoxBottom,
  alertColor: state.alertColor,
  channelAlertMessage: state.channelAlertMessage,
  loggedPopUp: state.loggedPopUp,
  deleteAelrt: state.deleteAelrt,
  ieCehck: state.ieCehck,
  pageReturn: state.pageReturn,
  fail : state.fail
});

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => {
      firebase.auth().signInWithPopup(provider).then(result => {
        let token = result.credential.accessToken;
        let users = result.user;
        let loginUser = {
          uid: users.uid,
          name: users.displayName,
          url: users.photoURL,
          email: users.email
        }
        axios.post(`${localHostIpApi}login`, loginUser).then(res => {
          const { token } = res.data;
          setAuthToken(token);
          const decoded = jwt_decode(token);
          dispatch(isLoginUser(decoded, true));
          localStorage.setItem('user', JSON.stringify(decoded));
        });
        dispatch(alertWarning('패스워드를 입력해주세요.', '#3f46ad', false));
      }).catch(error => {
        dispatch(getErrors(error, {}, false));
      });
    },
    usingUserData: () => {
      let user = JSON.parse(localStorage.getItem('user'));
      let loggedTrue = user !== null ? true : false;
      dispatch(isLoggedInData(user, loggedTrue));
    },
    userlogout: () => {
      let userRemove = localStorage.removeItem('user');
      firebase.auth().signOut().then(() => {
        message = '패스워드를 입력해주세요.';
        removeData(dispatch)
        dispatch(isLogoutData(userRemove));
        dispatch(alertWarning(message, '#3f46ad', false));
      }).catch(error => {
        dispatch(getErrors(error, {}, false));
      });
    },
    channelData: () => {
      socket.on('initialList', (data) => {
        dispatch(roomdData(data));
      });
      socket.on('itemAdded', (data) => {
        dispatch(roomAdd(data));
      });
      socket.on('itemRemove', (data) => {
        dispatch(roomRemovePop(data));
      });
    },
    saveFormData: (logedin, items, titleRef, roomPasswordRef, isroom, callback) => {
      removeData(dispatch)
      const title = titleRef.value
      const roomPassword = roomPasswordRef.value
      const passRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}$/;
      const titleBlank = title.replace(/\s|　/gi, '');
      let titleOverLap = Boolean(isroom.every(roommData => roommData.title !== title));
      if (logedin) {
        if (title.length > 1 && title.length < 11) {
          let data = {
            title,
            roomPassword,
            userName: items.name,
            userMail: items.email
          };
          if (titleOverLap || isroom === []) {
            if (!passRegex.test(roomPassword)) {
              roomPasswordRef.value = '';
              message = '패스워드는 숫자, 문자, 특수문자 조합으로 6글자 이상 입력해주세요.';
              dispatch(alertWarning(message, '#e30641', true));
            } else if (titleBlank === '') {
              titleRef.value = '';
              message = '공백만으로는 제목을 작성 할 수 없습니다.';
              dispatch(alertWarning(message, '#e30641', true));
            } else {
              socket.emit('addItem', data);
              callback(title);
              dispatch(popEventCheck(true, title));
              dispatch(alertWarning('', '#e30641', false));
              roomPasswordRef.value = '';
              titleRef.value = '';
            }
          } else {
            titleRef.value = '';
            message = '중복된 채널이 있습니다.';
            dispatch(alertWarning(message, '#e30641', true));
          }
        } else {
          titleRef.value = '';
          message = '제목은 2글자 이상 11글자 미만이에요.';
          dispatch(alertWarning(message, '#e30641', true));
        }
      } else {
        roomPasswordRef.value = '';
        titleRef.value = '';
        message = '로그인을 해주셔야, 채널을 생성 하실 수 있습니다.';
        dispatch(alertWarning(message, '#e30641', true));
      }
    },
    goingChannels: (isLoggedIn, channelTitleRef, isroom, titleEqualCheck, callback) => {
      const channelTitle = channelTitleRef.value;
      removeData(dispatch)
      if (isLoggedIn) {
        if (channelTitle.length > 1 && channelTitle.length < 11) {
          if (titleEqualCheck !== undefined) {
            if (titleEqualCheck.title === channelTitle) {
              callback(channelTitle);
              message = '패스워드를 입력해주세요.';
              dispatch(alertWarning(message, '#3f46ad', false));
            }
          } else {
            message = '채널 목록에 없는 채널입니다.';
            dispatch(alertWarning(message, '#e30641', true));
          }
        } else {
          message = '채널 제목은 2글자 미만이거나, 11글자 이상 일 수 없습니다.';
          dispatch(alertWarning(message, '#e30641', true));
        }
      } else {
        message = '로그인을 해주셔야, 채널에 입장 하실 수 있습니다.';
        dispatch(alertWarning(message, '#e30641', true));
      }
      channelTitleRef.value = '';
    },
    goMoveChannel: (channelName) => {
      history.push(`/rooms/${channelName}`)
    },
    roomDelete: (id) => {
      localStorage.setItem('roomObjId', JSON.stringify(id));
      dispatch(roomRemove(true));
    },
    roomDeletePop: () => {
      const id = JSON.parse(localStorage.getItem('roomObjId'));
      dispatch(roomRemove(false));
      socket.emit('removeItem', id);
    },
    init: () => {
      let user = JSON.parse(localStorage.getItem('user'));
      let email = (user !== null) ? `${user.name},${user.url}` : 'Not user';
      rtc = new LioWebRTC({
        url: simpLioRTC,
        localVideoEl: '',
        dataOnly: false,
        debug: false,
        nick: email
      });
      rtc.on('videoRemoved', (peer) => {
        dispatch(removeVideo(peer));
      });
      dispatch(rtcSetting(rtc));
    },
    startLoclaVideo: (localvideo) => {
      dispatch(localVideo(rtc.startLocalVideo()));
      if (localvideo) {
        rtc.config.localVideoEl = localvideo;
      } else {
        rtc.config.localVideoEl = localvideo;
      }
    },
    AddpeerVideo: (targetremote) => {
      rtc.on('videoAdded', (stream, peer) => {
        if (targetremote) {
          dispatch(addMeida(peer));
          rtc.attachStream(stream, targetremote[peer.id], { autoplay: true });
        }
      })
    },
    joinChat: (roomname, inroom) => {
      rtc.on('readyToCall', () => {
        if (roomname !== undefined && inroom) {
          dispatch(readyToCall(rtc.joinRoom(roomname)));
        }
      });
    },
    handleSelfMute: (e) => {
      dispatch(audioCheck());
    },
    passpostCheck: (password, roomid, isroom, dataTite, event) => {
      event.preventDefault();
      dispatch(spinnerAction(true));
      isroom.filter(item => {
        if (item._id === roomid || item.title === dataTite) {
          if (password.length >= 1) {
            const inputdata = {
              password,
              roomid: item._id
            }
            axios.post(`${localHostIp}passcheck`, inputdata)
              .then(data => {
                const shouldCheck = data.data.message;
                let result = shouldCheck;
                const title = item.title;
                dispatch(passwordCheck(result, title));
                const roomObj = {
                  item,
                  shouldCheck
                }
                if (shouldCheck === true) {
                  localStorage.setItem('roomPassResults', JSON.stringify(roomObj));
                  message = '패스워드를 입력해주세요.';
                  dispatch(alertWarning(message, '#3f46ad', false));
                  dispatch(spinnerAction(false));
                } else {
                  localStorage.setItem('roomPassResults', JSON.stringify(roomObj));
                  message = '패스워드를 잘못 입력하셨습니다.';
                  dispatch(alertWarning(message, '#e30641', true));
                  dispatch(spinnerAction(false));
                }
              })
              .catch(error => {
                dispatch(getErrors(error, {}, false));
              });
          } else {
            dispatch(spinnerAction(false));
            message = '패스워드가 입력되지 않았습니다.';
            dispatch(alertWarning(message, '#e30641', true));
          }
        }
      });
    },
    chatRoomUsing: (isroomdata, inroom, peers) => {
      let roomData = JSON.parse(localStorage.getItem('roomPassResults'));
      let roomTitle = history.location.pathname.split('/rooms/')[1];
      if (roomTitle) {
        if (isroomdata.length) {
          let title = isroomdata.map(data => data.title);
          let isRoomValid = title.some(item => item === roomTitle);
          if (isRoomValid && roomData !== null) {
            if (roomTitle === roomData.item.title && roomData.shouldCheck && isRoomValid) {
              dispatch(roomMaintenance(roomData.shouldCheck, true));
            } else {
              dispatch(roomMaintenance(false, false));
            }
          } else {
            dispatch(roomMaintenance(false, false));
            if (isroomdata.length === 0) {
              dispatch(roomMaintenance(false, false));
            }
          }
        } else {
          dispatch(roomMaintenance(false, false));
        }
      } else {
        dispatch(roomMaintenance(false, false));
      }
    },
    popEvent: (event) => {
      const dataId = event.target.dataset.id;
      message = '채널 패스워드를 입력해주세요.';
      dispatch(popEventCheck(true, dataId));
      dispatch(alertMessageChange('채널 패스워드를 입력해주세요.'));
      dispatch(alertWarning(message, '#3f46ad', false));
    },
    aboutPopEvent: (targetTitle) => {
      dispatch(popEventCheck(true, targetTitle));
    },
    popClose: () => {
      removeData(dispatch)
      dispatch(popCloseCheck(false, false, false));
      message = '';
      dispatch(alertWarning(message, '#3f46ad', false));
      dispatch(spinnerAction(false));
    },
    delPopClose: () => {
      removeData(dispatch)
      dispatch(popCloseCheck(false, false, false));
    },
    inputCancel: () => {
      dispatch(popCloseCheck(false, false, false));
    },
    formatRoomPassword: () => {
      let roomDataRmove = localStorage.removeItem('roomPassResults');
      if (history.location.pathname.split('/rooms/')[1]) {
        dispatch(formatRoomPass(null, true));
      }
    },
    MainAlertMessageChange: () => {
      dispatch(alertMessageChange('채널이 생성되었습니다.\n지금 바로 입장하실려면 패스워드를 입력해주세요.'));
    },
    aboutAlertMessageChange: () => {
      dispatch(alertMessageChange('채널 패스워드를 입력해주세요.'));
    },
    alertMessageFormat: () => {
      message = '패스워드가 입력되지 않았습니다.';
      dispatch(alertWarning(message, '#3f46ad', false));
    },
    loginpopEvent: () => {
      dispatch(loginPopOpen(true));
    },
    getVersionOfIE: () => {
      let checkVer = get_version_of_IE();
      if (checkVer == -1) {
        dispatch(ieChecker(true));
      }
      else {
        dispatch(ieChecker(false));
      }
    },
    pageGoback: debounce(() => {
      dispatch(warningCheck(true));
    }, 3000)
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withref: true })(App);