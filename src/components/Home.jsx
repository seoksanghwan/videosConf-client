import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Redirect } from "react-router-dom";
import Main from './Main.jsx';
import Navbar from './Navbar.jsx';
import Rooms from './Rooms.jsx';
import RoomsDetails from './RoomsDetails.jsx';
import axios from 'axios';

const localHostIp = 'http://localhost:8000/';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  
  saveFormData(event) {
    event.preventDefault();
    const { isLoggedIn, items } = this.props;
    const rgExp = /[^A-Za-z]/;
    const rgExp02 = /[A-Za-z]/;
    const title = this.inputNode.value;
    if (isLoggedIn) {
      if (title.length > 1 && title.length < 11) {
        axios.post(`${localHostIp}rooms`, {
          title,
          userName: items.name,
          userMail: items.email
        });
        this.props.history.push(`/rooms/${title}`);
      } else {
        alert('회의방 제목은 2글자 이상 10글자 미만이에요.\n다시 한번 작성해주세요');
        this.inputNode.value = '';
      }
    } else {
      this.signAlertMessage();
      this.inputNode.value = '';
    }
  }

  render() {
    const { isLoggedIn, items, isroom, webrtc, peers, inroom } = this.props;
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
                saveFormData={this.saveFormData.bind(this)}
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
                  email={email}
                  url={items.url}
                  webrtc={webrtc}
                  peers={peers} 
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
