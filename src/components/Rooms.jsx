import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import { uniqWith, isEqual } from "lodash";
import Alert from './Alert.jsx';

const Rooms = ({ deleteAelrt, spinner, roomDelete, roomData, passCheckRef, passwordCheck, items, popopen, popEvent, popClose, roomDeletePop, pass, focustitle, inputCancel, alertMessage, alertBoxBottom, alertColor }) => {
  return (
    <div className="rooms-list">
      <dl>
        <dt>
          <h2 className="title">
            Enjoy Channel!!
            <em>안녕하세요 채널 리스트입니다.</em>
          </h2>
        </dt>
        { 
          (roomData.length) ?
          uniqWith(roomData, isEqual).map(data => {
            return (
              <dd key={data._id}>
                <h3>
                  {data.title}
                  <p> Organiser {data.userName}</p>
                </h3>
                <div className="del-enter">
                  <button onClick={popEvent} data-id={data._id}>
                    <i className="fas fa-sign-in-alt" data-id={data._id}></i>
                  </button>
                  {
                    (data.userName === items.name) ?
                      <button onClick={roomDelete} data-mail={data.userMail} data-id={data._id} >
                        <i className="fas fa-trash" data-mail={data.userMail} data-id={data._id} ></i>
                      </button> : null
                  }
                </div>
              </dd>
            );
          }) :
          <dd className="no-channel">현재 채널이 없습니다. 생성해주세요. 🧐</dd>
        }
      </dl>
      {
        (popopen) ?
          <Alert alertColor={alertColor} alertBoxBottom={alertBoxBottom} spinner={spinner} alertMessage={alertMessage} passCheckRef={passCheckRef} passwordCheck={passwordCheck} popClose={popClose} pass={pass} focustitle={focustitle} inputCancel={inputCancel} /> :
          null
      }
      {
        (deleteAelrt) ?
          <div className="removeAlertBox">
            <div className="loginContent">
              <div className="close-btn">
                <i className="fas fa-times" onClick={roomDeletePop}></i>
              </div>
              <h2>채널이 삭제 되었습니다.</h2>
            </div>
          </div> :
          null
      }
    </div>
  );
};

export default Rooms;
