import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Alert from './Alert.jsx';

const Main = ({ gochnanelRoom, channelAlertMessage, saveFormData, inputRef, passRef, passCheckRef, passwordCheck, popClose, pass, focustitle, inputCancel, popopen, alertMessage, spinner, alertBoxBottom, alertColor }) => {
  return (
    <div className="meeting-room-create">
      <div className="rooms_title">
        <form>
          <label htmlFor="rooms_title">
            <h1>
              <img src="https://github.com/seoksanghwan/videosConf---client/blob/master/src/img/logo.png?raw=true" alt="" />
            </h1>
            <div className="inputbox">
              <input type="text" id="rooms_title" name="rooms_title" ref={inputRef} placeholder="안녕하세요. 채널을 생성해주세요." />
              <input type="password" id="rooms_password" name="rooms_title" ref={passRef} placeholder="패스워드도 설정해봐요." />
            </div>
            <button name="rooms_title" onClick={saveFormData} >Create!</button>
            {
              channelAlertMessage ?
                <p className="goingChannel-Check-Message" style={{ color: alertColor }}>{alertBoxBottom}</p> :
                null
            }
          </label>
        </form>
      </div>
      {
        (popopen) ?
          <Alert gochnanelRoom={gochnanelRoom} alertColor={alertColor} alertBoxBottom={alertBoxBottom} spinner={spinner} alertMessage={alertMessage} passCheckRef={passCheckRef} passwordCheck={passwordCheck} popClose={popClose} pass={pass} focustitle={focustitle} inputCancel={inputCancel} /> :
          null
      }
    </div>
  );
};

export default Main;
