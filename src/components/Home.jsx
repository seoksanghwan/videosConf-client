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
      console.log('연결해제')
      this.props.webrtc.connection.disconnect();
      this.props.webrtc.stopLocalVideo();
      this.props.webrtc.leaveRoom();
    }
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
      mute } = this.props;
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
              />
            );
          }} />
          <Route exact path="/about" render={props => {
            return (
              <About
                {...props}
              />
            );
          }} />
          <Route exact path="/rooms" render={props => {
            if (isLoggedIn) {
              return (
                <Rooms
                  roomData={isroom}
                  roomDelete={this.props.roomDelete}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }} />
          <Route exact path="/rooms/:room_name" render={props => {
            var title_len = props.match.params.room_name;
            var isRoomValid = isroom.some(item => item.title === title_len);
            var email = items.email ? items.email : 'null';
            if (isLoggedIn) {
              return (
                <RoomsDetails
                  {...props}
                  init={init}
                  email={email}
                  url={items.url}
                  peers={peers}
                  webrtc={webrtc}
                  inroom={inroom}
                  startLoclaVideo={startLoclaVideo}
                  AddpeerVideo={AddpeerVideo}
                  joinChat={joinChat}
                  mute={mute}
                  connectVideo={this.connectVideo.bind(this)}
                  disconnect={this.disconnect.bind(this)}
                  handleSelfMute={handleSelfMute}
                  localref={(vid) => this.localVideo = vid}
                />
              );
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
