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
  ROOM_REMOVE
} from '../actions';
import App from "../components/App.jsx";
import createHistory from 'history/createBrowserHistory';
//

let rtc;
const simpLioRTC = 'https://sm1.lio.app:443/';
const localHostIp = 'https://videos.ap-northeast-2.elasticbeanstalk.com/';
const localHostIpApi = `${localHostIp}api/auth/`;
const provider = new firebase.auth.GoogleAuthProvider();
const history = createHistory();
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
  isroom: state.isroom,
  peers: state.peers,
  webrtc: state.webrtc,
  mute: state.mute
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
      socket.on('initialList',(data)=>{
        console.log(data)
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
    saveFormData: (logedin, items, title, isroom) => {
      let titleOverLap = Boolean(isroom.every( roommData => roommData.title !== title));
      let come;
      if (logedin) {
        if (title.length > 1 && title.length < 11) {
          let data = {
            title,
            userName: items.name,
            userMail: items.email
          };
          if ( titleOverLap || isroom === [] ) {
            socket.emit('addItem', data);
            come = true;
            if (come === true) {
              history.push(`/rooms/${title}`);
            }
          } else {
            alert('중복된 회의실이 있습니다.');
            come = false;
          } 
        } else {
          alert('회의방 제목은 2글자 이상 10글자 미만이에요.\n다시 한번 작성해주세요');
        }
      } else {
        alert('로그인을 해주세요');
      } 
    },
    roomDelete: (id, dataMail, itemsMail) => {
      if (dataMail === itemsMail) {
        socket.emit('removeItem' , id);
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
          maxPeers: 8,
          minPeers: 4
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
        rtc.config.localVideoEl = '';
      }
    },
    AddpeerVideo: (targetremote) => {
      rtc.on('videoAdded', (stream, peer) => {
        if (targetremote) {
          dispatch({
            type: ADD_MEDIA,
            peer
          });
          rtc.attachStream(stream, targetremote[peer.id], { autoplay: true });
        }
      })
    },
    joinChat: (roomname) => {
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withref: true })(App);


