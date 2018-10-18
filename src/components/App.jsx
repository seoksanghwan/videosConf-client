import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';
import Home from './Home.jsx';

const localHostIp = 'http://videos.ap-northeast-2.elasticbeanstalk.com/';

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

  roomDelete(ev) {
    const dataId = ev.target.dataset.id;
    const dataMail = ev.target.dataset.mail;
    const { items } = this.props;
    if (dataMail === items.email) {
      axios.delete(`${localHostIp}rooms/dataId`, {
        data: { id: dataId }
      });
    } else {
      alert('회의실 삭제 권한은 주최자에게만 있어요.');
    }
  }

  render() {
    const { isLoggedIn, items, isroom, webrtc, peers, inroom } = this.props;
    return (
      <Router>
        <Route
          render={props => {
            let connet = Boolean(props.location.pathname.split('/rooms')[1]);
            if (connet === false && webrtc !== null) {
              webrtc.leaveRoom();
            }
            return (<Home
              {...props}
              isLoggedIn={isLoggedIn}
              items={items}
              isroom={isroom}
              roomDelete={this.roomDelete.bind(this)}
              onLoginButtonClick={this.props.loginUser}
              onLogoutButtonClick={this.props.userlogout}
              signAlert={this.signAlertMessage}
              webrtc={webrtc}
              peers={peers}
              inroom={inroom}
            />)
          }}
        />
      </Router>
    );
  };
};
