import React from 'react';
import { Link } from 'react-router-dom';

const LoginAlert = ({ popClose }) => {
  return (
    <div className="AlertBox">
      <div className="loginContent">
        <div className="close-btn">
          <i className="fas fa-times" onClick={popClose}></i>
        </div>
        <h2>로그인을 해주세요.</h2>
      </div>
    </div>
  );
};

export default LoginAlert;