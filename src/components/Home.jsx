import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Redirect } from "react-router-dom";
import Main from './Main.jsx';
import Navbar from './Navbar.jsx';
import Rooms from './Rooms.jsx';
import RoomsDetails from './RoomsDetails.jsx';
import axios from 'axios';

const localHostIp = 'http://videos.ap-northeast-2.elasticbeanstalk.com/';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    const { isLoggedIn, items, isroom, init, peers, inroom, webrtc, saveFormData, store } = this.props;
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
                inputRef={value => this.inputNode = value}
              />
            );
          }} />
          <Route exact path="/rooms" render={props => {
            return (
              <Rooms
                roomData={isroom}
                roomDelete={this.props.roomDelete}
              />
            );
          }} />
          <Route exact path="/rooms/:room_name" render={props => {
            var title_len = props.match.params.room_name;
            var isLanguageValid = (isroom) ? isroom.some(item => item.title === title_len) : console.log('no');
            var email = items.email ? items.email : 'not';
            return (
              (items.email)
                ?
                <RoomsDetails
                  {...props}
                  store={store}
                  init={init}
                  email={email}
                  url={items.url}
                  peers={peers} 
                  webrtc={webrtc}
                  inroom={inroom} />
                : null
            );
          }} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    );
  };
};
