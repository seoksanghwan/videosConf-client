import React, { Component } from 'react';
import { Link } from "react-router-dom";

const Alert = ({ passCheckRef, passwordCheck, popClose, pass, focustitle, inputCancel }) => {
  return (
    <div className="AlertBox">
      <div className="loginContent">
        <div className="close-btn">
          <i className="fas fa-times" onClick={popClose}></i>
        </div>
        <form>
          <h3>회의실 패스워드를 입력해주세요.</h3>
          <label htmlFor="pass_check">
            <input type="password" name="pass_check" ref={passCheckRef} placeholder='패스워드' />
            <button name="pass_check" onClick={passwordCheck} type="button"> check </button>
          </label>
        </form>
        <div className="pass-check">
          {
            pass ?
              <Link to={`rooms/${focustitle}`}  >패스워드가 일치합니다. 참여하실려면 클릭해주세요.</Link> : <p>패스워드를 입력해주세요.</p>
          }
        </div>
      </div>
    </div>
  );
};

export default Alert;