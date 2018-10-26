import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Redirect } from "react-router-dom";
import Main from './Main.jsx';
import Navbar from './Navbar.jsx';
import About from './About.jsx';
import Rooms from './Rooms.jsx';
import RoomsDetails from './RoomsDetails.jsx';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (!this.props.location.pathname.split('/rooms/')[1]) {
      this.disconnectSet();
    }
    this.props.roomMatch(this.props.isroom);
  }

  disconnectSet() {
    this.props.webrtc.connection.disconnect();
    this.props.webrtc.stopLocalVideo();
    this.props.webrtc.leaveRoom();
  }

  connectVideo() {
    this.props.history.go(0);
  }

  disconnect() {
    this.props.history.push('/rooms');
  }

  render() {
    const {
      isLoggedIn,
      inputRef,
      goingRef,
      items,
      isroom,
      init,
      peers,
      inroom,
      webrtc,
      saveFormData,
      AddpeerVideo,
      joinChat,
      startLoclaVideo,
      handleSelfMute,
      goingChannel,
      passRef,
      passCheckRef,
      passwordCheck,
      pass,
      mute,
      popopen,
      popEvent,
      popClose,
      focustitle,
      inputCancel } = this.props;
    return (
      <div id="app" className="container">
        <Navbar
          items={items}
          isLoggedIn={isLoggedIn}
          signAlert={this.props.signAlert}
          onLoginButtonClick={this.props.onLoginButtonClick}
          onLogoutButtonClick={this.props.onLogoutButtonClick}
        />
        <Switch>
          <Route exact path="/" render={props => {
            return (
              <Main
                {...props}
                isLoggedIn={isLoggedIn}
                saveFormData={saveFormData}
                inputRef={inputRef}
                passRef={passRef}
              />
            );
          }} />
          <Route exact path="/about" render={props => {
            return (
              <About
                {...props}
                goingRef={goingRef}
                goingChannel={goingChannel}
                pass={pass}
                popEvent={popEvent}
                popClose={popClose}
                popopen={popopen}
                passwordCheck={passwordCheck}
                passCheckRef={passCheckRef}
                focustitle={focustitle}
                inputCancel={inputCancel}
              />
            );
          }} />
          <Route exact path="/rooms" render={props => {
            if (isLoggedIn) {
              return (
                <Rooms
                  popClose={popClose}
                  popopen={popopen}
                  pass={pass}
                  items={items}
                  roomData={isroom}
                  roomDelete={this.props.roomDelete}
                  passCheckRef={passCheckRef}
                  passwordCheck={passwordCheck}
                  popEvent={popEvent}
                  focustitle={focustitle}
                  inputCancel={inputCancel}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }} />
          <Route exact path="/rooms/:room_name" render={props => {
            let email = items.email ? items.email : 'null';
            if (isLoggedIn && isroom ) {
              if (pass) {
                return (
                  <RoomsDetails
                    {...props}
                    init={init}
                    email={email}
                    url={items.url}
                    peers={peers}
                    webrtc={webrtc}
                    inroom={inroom}
                    isroom={isroom}
                    startLoclaVideo={startLoclaVideo}
                    AddpeerVideo={AddpeerVideo}
                    joinChat={joinChat}
                    mute={mute}
                    pass={pass}
                    connectVideo={this.connectVideo.bind(this)}
                    disconnect={this.disconnect.bind(this)}
                    handleSelfMute={handleSelfMute}
                    localref={(vid) => this.localVideo = vid}
                  />
                );
              } else {
                alert('잘못된 접근입니다.');
                return <Redirect to="/rooms" />;
              }
            } else {
              return <span>Loading...</span>;
            }
          }} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    );
  };
};
