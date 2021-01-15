import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Route } from "react-router-dom";
import axios from 'axios';
import Home from './Home.jsx';
import { throws } from 'assert';
import NotSupport from './NotSupport.jsx'

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.usingUserData();
    this.props.channelData();
    this.props.init();
    this.props.getVersionOfIE();
  }

  saveFormDatas(event) {
    event.preventDefault();
    const { isLoggedIn, items, isroom } = this.props;
    this.props.saveFormData(isLoggedIn, items, this.inputNode, this.passNode, isroom, this.props.aboutPopEvent);
    this.props.MainAlertMessageChange();
  }

  roomDeletes(event) {
    event.preventDefault();
    const dataId = event.target.dataset.id;
    this.props.roomDelete(dataId);
  }

  goingChannel(event) {
    event.preventDefault();
    const { isLoggedIn, isroom } = this.props;
    const titleEqualCheck = isroom.filter(data => data.title === this.gochannel.value)[0]
    this.props.goingChannels(isLoggedIn, this.gochannel, isroom, titleEqualCheck, this.props.aboutPopEvent)
    this.props.aboutAlertMessageChange();
  }

  passwordCheck(event) {
    event.preventDefault();
    const dataTite = this.props.aboutValueTitle;
    const dataId = this.props.focusid;
    const passCheck = this.checkNode.value;
    const { isroom } = this.props;
    this.props.passpostCheck(passCheck, dataId, isroom, dataTite, event)
  }

  gochnanelRoom() {
    const { focustitle } = this.props;
    this.props.goMoveChannel(focustitle);
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
      alertHide,
      inputCancel,
      formatRoomPassword,
      alertMessage,
      loginUser,
      userlogout,
      aboutAlertMessageChange,
      spinner,
      alertBoxBottom,
      alertColor,
      channelAlertMessage,
      alertMessageFormat,
      loginpopEvent,
      loggedPopUp,
      deleteAelrt,
      roomDeletePop,
      gochnanelRoom,
      ieCehck,
      delPopClose,
      chatRoomUsing,
      pageGoback,
      pageReturn,
      checker } = this.props;
    return (
      <Fragment>
        <Route path="/"
          render={props => {
            if (ieCehck) {
              return (
                (webrtc !== null) ?
                  <Home
                    {...props}
                    isLoggedIn={isLoggedIn}
                    items={items}
                    isroom={isroom}
                    checker={checker}
                    channelcheck={channelcheck}
                    chatRoomUsing={chatRoomUsing}
                    alertMessageFormat={alertMessageFormat}
                    saveFormData={this.saveFormDatas.bind(this)}
                    roomDelete={this.roomDeletes.bind(this)}
                    roomDeletePop={roomDeletePop.bind(this)}
                    goingChannel={this.goingChannel.bind(this)}
                    passwordCheck={this.passwordCheck.bind(this)}
                    formatRoomPassword={formatRoomPassword}
                    handleSelfMute={handleSelfMute.bind(this)}
                    inputCancel={inputCancel.bind(this)}
                    passpostCheck={passpostCheck}
                    popEvent={popEvent.bind(this)}
                    delPopClose={delPopClose.bind(this)}
                    gochnanelRoom={this.gochnanelRoom.bind(this)}
                    loginpopEvent={loginpopEvent.bind(this)}
                    loggedPopUp={loggedPopUp}
                    pageGoback={pageGoback}
                    popClose={popClose}
                    focustitle={focustitle}
                    alertHide={alertHide}
                    alertColor={alertColor}
                    pageReturn={pageReturn}
                    alertBoxBottom={alertBoxBottom}
                    onLoginButtonClick={loginUser}
                    onLogoutButtonClick={userlogout}
                    signAlert={this.signAlertMessage}
                    alertMessageChange={aboutAlertMessageChange}
                    webrtc={webrtc}
                    peers={peers}
                    inroom={inroom}
                    pass={pass}
                    channelAlertMessage={channelAlertMessage}
                    startLoclaVideo={startLoclaVideo}
                    AddpeerVideo={AddpeerVideo}
                    mute={mute}
                    loginpopEvent={loginpopEvent}
                    popopen={popopen}
                    joinChat={joinChat}
                    alertMessage={alertMessage}
                    spinner={spinner}
                    deleteAelrt={deleteAelrt}
                    inputRef={value => this.inputNode = value}
                    goingRef={value => this.gochannel = value}
                    passRef={value => this.passNode = value}
                    passCheckRef={value => this.checkNode = value}
                  /> :
                  <div className="loadspin"></div>
              )
            } else {
              return <NotSupport />
            }
          }}
        />
      </Fragment>
    );
  };
};
