import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';
import Home from './Home.jsx';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.usingUserData();
    this.props.channelData();
    this.props.init();
  }

  signAlertMessage() {
    alert('로그인을 해주세요');
  }

  saveFormDatas(event) {
    event.preventDefault();
    const { isLoggedIn, items, isroom } = this.props;
    this.props.saveFormData(isLoggedIn, items, this.inputNode.value, isroom);
    this.inputNode.value = '';
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
    this.props.history.push(`/rooms/${channelTitle}`);
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
      history,
      channelcheck } = this.props;
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
                    onLoginButtonClick={this.props.loginUser}
                    onLogoutButtonClick={this.props.userlogout}
                    signAlert={this.signAlertMessage}
                    webrtc={webrtc}
                    peers={peers}
                    inroom={inroom}
                    startLoclaVideo={startLoclaVideo}
                    AddpeerVideo={AddpeerVideo}
                    mute={mute}
                    handleSelfMute={handleSelfMute.bind(this)}
                    joinChat={joinChat}
                    inputRef={value => this.inputNode = value}
                    goingRef={value => this.gochannel = value}
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
