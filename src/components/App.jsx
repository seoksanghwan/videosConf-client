import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import axios from 'axios';
import Home from './Home.jsx';
const localHostIp = 'http://videos.ap-northeast-2.elasticbeanstalk.com/';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.history = createHistory();
  }

  componentDidMount() {
    this.props.usingUserData();
    this.props.channelData();
    this.props.init();
  }

  signAlertMessage() {
    alert('로그인을 해주세요');
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
        this.history.push(`/rooms/${title}`);
      } else {
        alert('회의방 제목은 2글자 이상 10글자 미만이에요.\n다시 한번 작성해주세요');
        this.inputNode.value = '';
      }
    } else {
      this.signAlertMessage();
      this.inputNode.value = '';
    }
  }

  roomDelete(ev) {
    const dataId = ev.target.dataset.id;
    const dataMail = ev.target.dataset.mail;
    const { items } = this.props;
    if (dataMail === items.email) {
      axios.delete(`${localHostIp}rooms/dataId`, { data: { id: dataId } });
    } else {
      alert('회의실 삭제 권한은 주최자에게만 있어요.');
    }
  }

  render() {
    const { isLoggedIn, items, isroom, init, peers, inroom, webrtc, saveFormData, store } = this.props;
    return (
      <Router>
        <Route
          render={props => {
            return (<Home
              {...props}
              isLoggedIn={isLoggedIn}
              items={items}
              isroom={isroom}
              saveFormData = {this.saveFormData.bind(this)}
              roomDelete={this.roomDelete.bind(this)}
              onLoginButtonClick={this.props.loginUser}
              onLogoutButtonClick={this.props.userlogout}
              signAlert={this.signAlertMessage}
              webrtc={webrtc}
              peers={peers}
              inroom={inroom}
              store={store}
            />)
          }}
        />
      </Router>
    );
  };
};
