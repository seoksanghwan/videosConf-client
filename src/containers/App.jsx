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
  FORMAT_ROOM_PASS
} from '../actions';
import App from "../components/App.jsx";
import createHistory from 'history/createBrowserHistory';

//https://videos-conf-service.herokuapp.com/
//http://localhost:8080/
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
  aboutValueTitle: state.aboutValueTitle
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
        })
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
        history.push('/');
        dispatch({
          type: IS_LOGOUT_DATA,
          data: userRemove
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
          type: ROOM_REMOVE,
          data
        });
      });
    },
    saveFormData: (logedin, items, title, roomPassword, isroom) => {
      console.log()
      let titleOverLap = Boolean(isroom.every(roommData => roommData.title !== title));
      if (logedin) {
        if (title.length > 1 && title.length < 11 && roomPassword.length > 1 && roomPassword.length < 11) {
          let data = {
            title,
            roomPassword,
            userName: items.name,
            userMail: items.email
          };
          if (titleOverLap || isroom === []) {
            socket.emit('addItem', data);
            history.push(`/rooms/${title}`);
          } else {
            alert('중복된 회의실이 있습니다.');
          }
        } else {
          alert('회의방 제목 및 패스워드는 2글자 이상 10글자 미만이에요.\n다시 한번 작성해주세요');
        }
      } else {
        alert('로그인을 해주세요');
      }
    },
    roomDelete: (id, dataMail, itemsMail) => {
      if (dataMail === itemsMail) {
        socket.emit('removeItem', id);
        dispatch({
          type: ROOM_REMOVE
        });
        alert('회의실이 삭제되었습니다.');
      } else {
        alert('회의실 삭제 권한은 주최자에게만 있어요.');
      }
    },
    init: (localele) => {
      let user = JSON.parse(localStorage.getItem('user'));
      let email = (user !== null) ? `${user.email},${user.url}` : 'Not user';
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
    joinChat: (roomname) => {
      // /history.go(0);
      rtc.on('readyToCall', () => {
        if (roomname !== undefined) {
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
                } else {
                  localStorage.setItem('roomPassResults', JSON.stringify(roomObj));
                }
              })
              .catch(error => {
                dispatch({ type: GET_ERRORS, error });
              });
          }
        }
      })
    },
    chatRoomUsing: () => {
      let roomData = JSON.parse(localStorage.getItem('roomPassResults'));
      let roomTitle = history.location.pathname.split('/rooms/')[1];
      if (roomTitle !== undefined && roomData !== null) {
        if (history.location.pathname.split('/rooms/')[1] && roomData !== null) {
          if (roomTitle === roomData.item.title && roomData.shouldCheck) {
            dispatch({
              type: ROOM_MAINTENANCE,
              data: roomData.shouldCheck
            })
          } else {
            dispatch({
              type: ROOM_MAINTENANCE,
              data: false
            })
          }
        }
      }
    },
    popEvent: (event) => {
      const dataId = event.target.dataset.id;
      dispatch({
        type: POP_EVENT_CHECK,
        booelan: true,
        dataId
      })
    },
    aboutPopEvent: (targetTitle) => {
      dispatch({
        type: POP_EVENT_CHECK,
        booelan: true,
        targetTitle
      })
    },
    popClose: () => {
      let roomDataRmove = localStorage.removeItem('roomPassResults');
      let roomNull = roomDataRmove === null ? false : null
      dispatch({
        type: POP_ClOSE_CHECK,
        booelan: false
      })
      dispatch({
        type: ROOM_MAINTENANCE,
        data: roomNull
      })
    },
    inputCancel: () => {
      dispatch({
        type: POP_ClOSE_CHECK,
        booelan: false
      })
    },
    formatRoomPassword: () => {
      let roomDataRmove = localStorage.removeItem('roomPassResults');
      if (history.location.pathname.split('/rooms/')[1]) {
        dispatch({
          type: FORMAT_ROOM_PASS,
          data: null,
          pass: true
        })
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
          })
        } else {
          dispatch({
            type: ROOM_TITLE_MATCH,
            roomBoolean: false
          })
        }
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withref: true })(App);


