import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';
import Home from './Home.jsx';
import { throws } from 'assert';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.usingUserData();
    this.props.channelData();
    this.props.init();
    this.props.chatRoomUsing();
    this.props.alertMessageChange();
  }

  signAlertMessage() {
    alert('로그인을 해주세요');
  }

  saveFormDatas(event) {
    event.preventDefault();
    const { isLoggedIn, items, isroom } = this.props;
    const channelTitle = this.inputNode.value
    const channelPassword = this.passNode.value
    this.props.saveFormData(isLoggedIn, items, channelTitle, channelPassword, isroom, this.props.aboutPopEvent);
    this.props.alertMessageChange();
    this.inputNode.value = '';
    this.passNode.value = '';
  }

  roomDeletes(event) {
    event.preventDefault();
    const dataId = event.target.dataset.id;
    const dataMail = event.target.dataset.mail;
    const { items } = this.props;
    this.props.roomDelete(dataId, dataMail, items.email);
  }

  goingChannel(event) {
    event.preventDefault();
    const channelTitle = this.gochannel.value;
    const { isroom } = this.props;
    const titleEqualCheck = isroom.filter(data => data.title === channelTitle)[0]
    if (channelTitle.length > 1 && channelTitle.length < 11) {
      if (titleEqualCheck !== undefined) {
        if (titleEqualCheck.title === channelTitle) {
          this.props.aboutPopEvent(channelTitle);
        }
      } else {
        alert('채널 목록에 없는 채널입니다.');
        this.gochannel.value = '';
      }
    } else {
      alert('채널 제목은 2글자 미만이거나, 11글자 이상 일 수 없습니다.');
      this.gochannel.value = '';
    }
  }

  passwordCheck(event) {
    event.preventDefault();
    const dataTite = this.props.aboutValueTitle;
    const dataId = this.props.focusid;
    const passCheck = this.checkNode.value;
    const { isroom } = this.props;
    this.props.passpostCheck(passCheck, dataId, isroom, dataTite, event)
  }

  render() {
    const {
      isLoggedIn,
      items,
      isroom,
      peers,
      inroom,
      webrtc,
      joinChat,
      AddpeerVideo,
      startLoclaVideo,
      handleSelfMute,
      mute,
      pass,
      history,
      popopen,
      channelcheck,
      popEvent,
      popClose,
      passpostCheck,
      focustitle,
      roomMatch,
      alertHide,
      inputCancel,
      formatRoomPassword,
      alertMessage,
      loginUser,
      userlogout,
      alertMessageChange } = this.props;
    return (
      <Router>
        <Route
          render={props => {
            if (isroom) {
              return (
                (webrtc !== null) ?
                  <Home
                    {...props}
                    isLoggedIn={isLoggedIn}
                    items={items}
                    isroom={isroom}
                    channelcheck={channelcheck}
                    saveFormData={this.saveFormDatas.bind(this)}
                    roomDelete={this.roomDeletes.bind(this)}
                    goingChannel={this.goingChannel.bind(this)}
                    passwordCheck={this.passwordCheck.bind(this)}
                    formatRoomPassword={formatRoomPassword}
                    handleSelfMute={handleSelfMute.bind(this)}
                    inputCancel={inputCancel.bind(this)}
                    passpostCheck={passpostCheck}
                    popEvent={popEvent.bind(this)}
                    popClose={popClose}
                    focustitle={focustitle}
                    alertHide={alertHide}
                    onLoginButtonClick={loginUser}
                    onLogoutButtonClick={userlogout}
                    signAlert={this.signAlertMessage}
                    alertMessageChange={alertMessageChange}
                    webrtc={webrtc}
                    peers={peers}
                    inroom={inroom}
                    pass={pass}
                    roomMatch={roomMatch}
                    startLoclaVideo={startLoclaVideo}
                    AddpeerVideo={AddpeerVideo}
                    mute={mute}
                    popopen={popopen}
                    joinChat={joinChat}
                    alertMessage={alertMessage}
                    inputRef={value => this.inputNode = value}
                    goingRef={value => this.gochannel = value}
                    passRef={value => this.passNode = value}
                    passCheckRef={value => this.checkNode = value}
                  /> :
                  null
              )
            }
          }}
        />
      </Router>
    );
  };
};
