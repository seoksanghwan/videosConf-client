import React, { Component } from 'react';
import { Link } from "react-router-dom";

const Main = props => {
  return (
    <div className="meeting-room-create">
      <div className="rooms_title">
        <form>
          <label htmlFor="rooms_title">
            <h1>
              <img src="https://github.com/seoksanghwan/videosConf---client/blob/master/src/img/logo.png?raw=true" alt="" />
              <Link className="navbar-item" to="/rooms">Channel List</Link>
            </h1>
            <div className="inputbox">
              <input type="text" id="rooms_title" name="rooms_title" ref={props.inputRef} placeholder="안녕하세요!! 회의실을 생성해주세요." />
              <input type="password" id="rooms_password" name="rooms_title" ref={props.passRef} placeholder="비밀번호도 설정해봐요." />
            </div>
            <button name="rooms_title" onClick={props.saveFormData} >Create!</button>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Main;
