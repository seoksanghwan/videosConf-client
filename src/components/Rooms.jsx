import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import { uniqWith, isEqual } from "lodash";
import Alert from './Alert.jsx';

const Rooms = ({ spinner, roomDelete, roomData, passCheckRef, passwordCheck, items, popopen, popEvent, popClose, pass, focustitle, inputCancel, alertMessage, alertBoxBottom, alertColor }) => {
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
          })
        }
      </dl>
      {
        (popopen) ?
          <Alert alertColor={alertColor} alertBoxBottom={alertBoxBottom} spinner={spinner} alertMessage={alertMessage} passCheckRef={passCheckRef} passwordCheck={passwordCheck} popClose={popClose} pass={pass} focustitle={focustitle} inputCancel={inputCancel} /> :
          null
      }
    </div>
  );
};

export default Rooms;
