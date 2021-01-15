import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import Alert from './Alert.jsx';
import RoomsList from './RoomsList.jsx';

const Rooms = ({ checker, delPopClose, gochnanelRoom, deleteAelrt, spinner, roomDelete, isroom, passCheckRef, passwordCheck, items, popopen, popEvent, popClose, roomDeletePop, pass, focustitle, inputCancel, alertMessage, alertBoxBottom, alertColor }) => {
  return (
    <div className="rooms-list">
      <dl>
        <dt>
          <h2 className="title">
            Enjoy Channel
            <em>여기는 채널 리스트입니다.</em>
          </h2>
        </dt>
        <RoomsList checker={checker} isroom={isroom} items={items} popEvent={popEvent} roomDelete={roomDelete} />
      </dl>
      {
        (popopen) ?
          <Alert gochnanelRoom={gochnanelRoom} alertColor={alertColor} alertBoxBottom={alertBoxBottom} spinner={spinner} alertMessage={alertMessage} passCheckRef={passCheckRef} passwordCheck={passwordCheck} popClose={popClose} pass={pass} focustitle={focustitle} inputCancel={inputCancel} /> :
          null
      }
      {
        (deleteAelrt) ?
          <div className="removeAlertBox">
            <div className="loginContent">
              <div className="close-btn">
                <i className="fas fa-times" onClick={delPopClose} > </i>
              </div>
              <h2>채널을 삭제 하시겠습니까?</h2>
              <ul className="delbutton">
                <li><button className="yesButton" onClick={roomDeletePop}>예</button></li>
                <li><button className="noButton" onClick={delPopClose}>아니요</button></li>
              </ul>
            </div>
          </div> :
          null
      }
    </div>
  );
};

export default Rooms;
