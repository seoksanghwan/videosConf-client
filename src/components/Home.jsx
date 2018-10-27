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
    window.onpopstate = e => {
      this.props.popClose();
    }
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
    this.props.webrtc.pause()
  }

  disconnect() {
    this.props.history.push('/rooms');
    this.props.alertMessageChange();
    this.props.popClose();
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
      inputCancel,
      alertMessage,
      spinner,
      alertBoxBottom,
      alertColor,
      channelAlertMessage,
      alertMessageFormat,
      onLogoutButtonClick,
      onLoginButtonClick,
      signAlert,
      loginpopEvent,
      loggedPopUp,
      deleteAelrt,
      roomDeletePop,
      gochnanelRoom } = this.props;
    return (
      <div id="app" className="container">
        <Navbar
          items={items}
          loginpopEvent={loginpopEvent}
          loggedPopUp={loggedPopUp}
          isLoggedIn={isLoggedIn}
          signAlert={signAlert}
          onLoginButtonClick={onLoginButtonClick}
          onLogoutButtonClick={onLogoutButtonClick}
          alertMessageFormat={alertMessageFormat}
          alertBoxBottom={alertBoxBottom}
          popEvent={popEvent}
          popClose={popClose}
          popopen={popopen}
        />
        <Switch>
          <Route exact path="/" render={props => {
            return (
              <Main
                {...props}
                spinner={spinner}
                isLoggedIn={isLoggedIn}
                saveFormData={saveFormData}
                inputRef={inputRef}
                passRef={passRef}
                pass={pass}
                popEvent={popEvent}
                popClose={popClose}
                popopen={popopen}
                passwordCheck={passwordCheck}
                passCheckRef={passCheckRef}
                focustitle={focustitle}
                alertMessage={alertMessage}
                alertBoxBottom={alertBoxBottom}
                alertColor={alertColor}
                channelAlertMessage={channelAlertMessage}
                gochnanelRoom={gochnanelRoom}
              />
            );
          }} />
          <Route exact path="/about" render={props => {
            return (
              <About
                {...props}
                spinner={spinner}
                goingRef={goingRef}
                goingChannel={goingChannel}
                pass={pass}
                channelAlertMessage={channelAlertMessage}
                popEvent={popEvent}
                popClose={popClose}
                popopen={popopen}
                passwordCheck={passwordCheck}
                passCheckRef={passCheckRef}
                focustitle={focustitle}
                inputCancel={inputCancel}
                alertMessage={alertMessage}
                alertBoxBottom={alertBoxBottom}
                alertColor={alertColor}
                gochnanelRoom={gochnanelRoom}
              />
            );
          }} />
          <Route exact path="/rooms" render={props => {
            if (isLoggedIn) {
              return (
                <Rooms
                  spinner={spinner}
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
                  alertMessage={alertMessage}
                  alertBoxBottom={alertBoxBottom}
                  alertColor={alertColor}
                  deleteAelrt={deleteAelrt}
                  roomDeletePop={roomDeletePop}
                  gochnanelRoom={gochnanelRoom}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }} />
          <Route exact path="/rooms/:room_name" render={props => {
            let email = items.name ? items.name : 'null';
            if (isLoggedIn && isroom) {
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
