import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import axios from 'axios';
import Home from './Home.jsx';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.history = createHistory({ forceRefresh: true });
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
    const title = this.inputNode.value;
    const { isLoggedIn, items } = this.props;
    this.props.saveFormData(isLoggedIn, items, title);
  }

  roomDeletes(event) {
    event.preventDefault();
    const dataId = event.target.dataset.id;
    const dataMail = event.target.dataset.mail;
    const { items } = this.props;
    this.props.roomDelete(dataId, dataMail, items.email);
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
      mute } = this.props;
    return (
      <Router>
        <Route
          render={props => {
            return (
              (webrtc !== null) ?
                <Home
                  {...props}
                  isLoggedIn={isLoggedIn}
                  items={items}
                  isroom={isroom}
                  saveFormData={this.saveFormDatas.bind(this)}
                  roomDelete={this.roomDeletes.bind(this)}
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
                /> :
                null
            )
          }}
        />
      </Router>
    );
  };
};
