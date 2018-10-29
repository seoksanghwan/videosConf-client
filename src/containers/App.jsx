import { connect } from "react-redux";
import io from 'socket.io-client';
import { bindActionCreators } from 'redux'
import React, { Component } from 'react';
import { debounce } from "lodash";
import * as firebase from 'firebase';
import LioWebRTC from 'liowebrtc';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import {
  IS_LOGIN_USER,
  IS_LOGGED_IN_DATA,
  IS_LOGOUT_DATA,
  GET_ERRORS,
  ROOMS_DATA,
  CONNECTED_LOCAL,
  LOCAL_VIDEO,
  RTC_SETTING,
  ADD_MEDIA,
  REMOVE_VIDEO,
  READY_TO_CALL,
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
  ALERT_WARNING,
  LOGGIN_POP_OPEN,
  ROOM_REMOVE_POP,
  IE_CHECK,
  WARNING_CHECK
} from '../actions';
import App from "../components/App.jsx";
import createHistory from 'history/createBrowserHistory';

let rtc;
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
  dispatch({
    type: ROOM_MAINTENANCE,
    data: roomNull
  });
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
  pageReturn: state.pageReturn
});

const mapDispatchToProps = (dispatch, ownProps) => {
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
          dispatch({
            type: IS_LOGIN_USER,
            data: decoded
          });
          localStorage.setItem('user', JSON.stringify(decoded));
        });
        dispatch({
          type: ALERT_WARNING,
          alert: '패스워드를 입력해주세요.',
          color: '#3f46ad',
          resultBoolean: false
        });
      }).catch(error => {
        dispatch({ type: GET_ERRORS, error });
      });
    },
    usingUserData: () => {
      let user = JSON.parse(localStorage.getItem('user'));
      dispatch({
        type: IS_LOGGED_IN_DATA,
        data: user
      });
    },
    userlogout: () => {
      let userRemove = localStorage.removeItem('user');
      firebase.auth().signOut().then(() => {
        dispatch({
          type: IS_LOGOUT_DATA,
          data: userRemove
        });
        dispatch({
          type: ALERT_WARNING,
          alert: '패스워드를 입력해주세요.',
          color: '#3f46ad',
          resultBoolean: false
        });
      }).catch(error => {
        dispatch({ type: GET_ERRORS, error });
      });
    },
    channelData: () => {
      socket.on('initialList', (data) => {
        dispatch({
          type: ROOMS_DATA,
          data
        });
      });
      socket.on('itemAdded', (data) => {
        dispatch({
          type: ROOM_ADD,
          data
        });
      });
      socket.on('itemRemove', (data) => {
        dispatch({
          type: ROOM_REMOVE_POP,
          data
        });
      });
    },
    saveFormData: (logedin, items, title, roomPassword, isroom, callback) => {
      removeData(dispatch)
      let titleOverLap = Boolean(isroom.every(roommData => roommData.title !== title));
      if (logedin) {
        if (title.length > 1 && title.length < 11 && roomPassword.length > 1 && roomPassword.length < 11) {
          let data = {
            title,
            roomPassword,
            userName: items.name,
            userMail: items.email
          };
          dispatch({
            type: ALERT_WARNING,
            alert: '패스워드를 입력해주세요.',
            color: '#3f46ad',
            resultBoolean: false
          });
          if (titleOverLap || isroom === []) {
            socket.emit('addItem', data);
            dispatch({
              type: POP_EVENT_CHECK,
              booelan: true,
              title
            })
            callback(title)
          } else {
            dispatch({
              type: ALERT_WARNING,
              alert: '중복된 채널이 있습니다.',
              color: '#e30641',
              resultBoolean: true
            });
          }
        } else {
          dispatch({
            type: ALERT_WARNING,
            alert: '채널 제목 및 패스워드는 2글자 이상 11글자 미만이에요.\n다시 한번 작성해주세요',
            color: '#e30641',
            resultBoolean: true
          });
        }
      } else {
        dispatch({
          type: ALERT_WARNING,
          alert: '로그인을 해주셔야, 채널을 생성 하실 수 있습니다.',
          color: '#e30641',
          resultBoolean: true
        });
      }
    },
    goingChannels: (isLoggedIn, channelTitle, isroom, titleEqualCheck, callback) => {
      removeData(dispatch)
      if (isLoggedIn) {
        if (channelTitle.length > 1 && channelTitle.length < 11) {
          if (titleEqualCheck !== undefined) {
            if (titleEqualCheck.title === channelTitle) {
              callback(channelTitle);
              dispatch({
                type: ALERT_WARNING,
                alert: '패스워드를 입력해주세요.',
                color: '#3f46ad',
                resultBoolean: false
              });
            }
          } else {
            dispatch({
              type: ALERT_WARNING,
              alert: '채널 목록에 없는 채널입니다.',
              color: '#e30641',
              resultBoolean: true
            });
          }
        } else {
          dispatch({
            type: ALERT_WARNING,
            alert: '채널 제목은 2글자 미만이거나, 11글자 이상 일 수 없습니다.',
            color: '#e30641',
            resultBoolean: true
          });
        }
      } else {
        dispatch({
          type: ALERT_WARNING,
          alert: '로그인을 해주셔야, 채널에 입장 하실 수 있습니다.',
          color: '#e30641',
          resultBoolean: true
        });
      }
    },
    goMoveChannel: (channelName) => {
      history.push(`/rooms/${channelName}`)
    },
    roomDelete: (id) => {
      localStorage.setItem('roomObjId', JSON.stringify(id));
      dispatch({
        type: ROOM_REMOVE,
        deleteMsg: true
      });
    },
    roomDeletePop: () => {
      const id = JSON.parse(localStorage.getItem('roomObjId'));
      dispatch({
        type: ROOM_REMOVE_POP,
        deleteMsg: false
      });
      socket.emit('removeItem', id);
    },
    init: (localele) => {
      let user = JSON.parse(localStorage.getItem('user'));
      let email = (user !== null) ? `${user.name},${user.url}` : 'Not user';
      rtc = new LioWebRTC({
        url: simpLioRTC,
        localVideoEl: '',
        dataOnly: false,
        network: {
          maxPeers: 2,
          minPeers: 1
        },
        debug: false,
        nick: email
      });
      rtc
        .on('connectionReady', (sessionId) => {
          dispatch({
            type: CONNECTED_LOCAL,
            sessionId
          });
        })
        .on('videoRemoved', (peer) => {
          dispatch({
            type: REMOVE_VIDEO,
            peer
          });
        });
      dispatch({ type: RTC_SETTING, payload: rtc });
    },
    startLoclaVideo: (localvideo) => {
      dispatch({ type: LOCAL_VIDEO, start: rtc.startLocalVideo() });
      if (localvideo) {
        rtc.config.localVideoEl = localvideo;
      } else {
        rtc.config.localVideoEl = localvideo;
      }
    },
    AddpeerVideo: (targetremote) => {
      rtc.on('videoAdded', (stream, peer) => {
        if (targetremote) {
          dispatch({
            type: ADD_MEDIA,
            peer,
            rtc
          });
          rtc.attachStream(stream, targetremote[peer.id], { autoplay: true });
        }
      })
    },
    joinChat: (roomname, inroom) => {
      rtc.on('readyToCall', () => {
        if (roomname !== undefined && inroom) {
          dispatch({
            type: READY_TO_CALL,
            joinroom: rtc.joinRoom(roomname)
          });
        }
      });
    },
    handleSelfMute: (e) => {
      dispatch({
        type: AUDIO_CHECK,
        func: rtc
      });
    },
    passpostCheck: (password, roomid, isroom, dataTite, event) => {
      event.preventDefault();
      dispatch({
        type: SPINNER_ACTION,
        check: true
      });
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
                dispatch({
                  type: PASSWORD_CHECK,
                  result: shouldCheck,
                  title: item.title
                })
                const roomObj = {
                  item,
                  shouldCheck
                }
                if (shouldCheck === true) {
                  localStorage.setItem('roomPassResults', JSON.stringify(roomObj));
                  dispatch({
                    type: ALERT_WARNING,
                    alert: '패스워드를 입력해주세요.',
                    color: '#3f46ad'
                  });
                } else {
                  localStorage.setItem('roomPassResults', JSON.stringify(roomObj));
                  dispatch({
                    type: SPINNER_ACTION,
                    check: false
                  });
                  dispatch({
                    type: ALERT_WARNING,
                    alert: '패스워드를 잘못 입력하셨습니다.',
                    color: '#e30641'
                  });
                }
              })
              .catch(error => {
                dispatch({ type: GET_ERRORS, error });
              });
          } else {
            dispatch({
              type: SPINNER_ACTION,
              check: false
            });
            dispatch({
              type: ALERT_WARNING,
              alert: '패스워드가 입력되지 않았습니다.',
              color: '#e30641'
            });
          }
        }
      });
    },
    chatRoomUsing: (isroomdata, inroom) => {
      let roomData = JSON.parse(localStorage.getItem('roomPassResults'));
      let roomTitle = history.location.pathname.split('/rooms/')[1];
      if (roomTitle) {
        if (isroomdata.length) {
          let title = isroomdata.map(data => data.title);
          let isRoomValid = title.some(item => item === roomTitle);
          if (isRoomValid && roomData !== null) {
            if (roomTitle === roomData.item.title && roomData.shouldCheck && isRoomValid) {
              dispatch({
                type: ROOM_MAINTENANCE,
                data: roomData.shouldCheck,
                roomBoolean: true
              });
            } else {
              dispatch({
                type: ROOM_MAINTENANCE,
                data: false,
                roomBoolean: false
              });
            }
          } else {
            dispatch({
              type: ROOM_MAINTENANCE,
              data: false,
              roomBoolean: false
            });
            if (isroomdata.length === 0) {
              dispatch({
                type: ROOM_MAINTENANCE,
                data: false,
                roomBoolean: false
              });
            }
          }
        } else {
          dispatch({
            type: ROOM_MAINTENANCE,
            data: false,
            roomBoolean: false
          });  
        }
      } else {
        dispatch({
          type: ROOM_MAINTENANCE,
          data: false,
          roomBoolean: false
        });
      }
    },
    popEvent: (event) => {
      const dataId = event.target.dataset.id;
      dispatch({
        type: POP_EVENT_CHECK,
        booelan: true,
        dataId
      });
      dispatch({
        type: ALERT_MESSAGE_CHANGE,
        message: `채널 패스워드를 입력해주세요.`
      });
      dispatch({
        type: ALERT_WARNING,
        alert: '채널 패스워드를 입력해주세요.',
        color: '#3f46ad'
      });
    },
    aboutPopEvent: (targetTitle) => {
      dispatch({
        type: POP_EVENT_CHECK,
        booelan: true,
        targetTitle
      });
    },
    popClose: () => {
      removeData(dispatch)
      dispatch({
        type: POP_ClOSE_CHECK,
        booelan: false,
        popBoolean: false,
        deleteMsg: false
      });
      dispatch({
        type: ALERT_WARNING,
        alert: '패스워드를 입력해주세요.',
        color: '#3f46ad',
        resultBoolean: false
      });
    },
    delPopClose: () => {
      removeData(dispatch)
      dispatch({
        type: POP_ClOSE_CHECK,
        deleteMsg: false
      });
    },
    inputCancel: () => {
      dispatch({
        type: POP_ClOSE_CHECK,
        booelan: false
      });
    },
    formatRoomPassword: () => {
      let roomDataRmove = localStorage.removeItem('roomPassResults');
      if (history.location.pathname.split('/rooms/')[1]) {
        dispatch({
          type: FORMAT_ROOM_PASS,
          data: null,
          pass: true
        });
      }
    },
    roomMatch: (isroomdata) => {
      let roomTitleUrl = history.location.pathname.split('/rooms/')[1];
      if (history.location.pathname.split('/rooms/')[1]) {
        let title = isroomdata.map(data => data.title);
        let isRoomValid = title.some(item => item === roomTitleUrl);
        if (isRoomValid) {
          dispatch({
            type: ROOM_TITLE_MATCH,
            roomBoolean: true
          });
        } else {
          dispatch({
            type: ROOM_TITLE_MATCH,
            roomBoolean: false
          });
        }
      }
    },
    MainAlertMessageChange: () => {
      dispatch({
        type: ALERT_MESSAGE_CHANGE,
        message: '채널이 생성되었습니다.\n지금 바로 입장하실려면 패스워드를 입력해주세요.'
      });
    },
    aboutAlertMessageChange: () => {
      dispatch({
        type: ALERT_MESSAGE_CHANGE,
        message: `채널 패스워드를 입력해주세요.`
      });
    },
    alertMessageFormat: () => {
      dispatch({
        type: ALERT_WARNING,
        alert: '패스워드를 입력해주세요.',
        color: '#3f46ad',
        resultBoolean: false
      });
    },
    loginpopEvent: () => {
      dispatch({
        type: LOGGIN_POP_OPEN,
        popBoolean: true
      })
    },
    getVersionOfIE: () => {
      let checkVer = get_version_of_IE();
      if (checkVer == -1) {
        dispatch({
          type: IE_CHECK,
          ieBoolean: true
        })
      }
      else {
        dispatch({
          type: IE_CHECK,
          ieBoolean: false
        })
      }
    },
    pageGoback: debounce(() => {
      dispatch({
        type: WARNING_CHECK,
        warningSould: true
      })
    }, 3000)
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withref: true })(App);
