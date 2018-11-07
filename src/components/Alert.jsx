import React, { Component } from 'react';
import { Link } from "react-router-dom";

const Alert = ({ gochnanelRoom, spinner, passCheckRef, passwordCheck, popClose, pass, focustitle, inputCancel, alertMessage, alertBoxBottom, alertColor }) => {
  return (
    <div className="AlertBox">
      <div className="loginContent">
        <div className="close-btn">
          <i className="fas fa-times" onClick={popClose}></i>
        </div>
        <form>
          <h3>{alertMessage}</h3>
          <label htmlFor="pass-check">
            <input type="password" name="pass-check" ref={passCheckRef} placeholder='패스워드' autoFocus />
            <button name="pass-check" onClick={passwordCheck} >
              check
              {
                spinner ?  <i className="fas fa-spinner"></i> : null
              }
            </button>
          </label>
        </form>
        <div className="pass-check">
          {
            pass ?
              <p className="sucess-password" onClick={gochnanelRoom}>패스워드가 일치합니다. 참여하실려면 클릭해주세요.</p> : <p style={{ color : alertColor }}>{alertBoxBottom}</p>
          }
        </div>
      </div>
    </div>
  );
};

export default Alert;