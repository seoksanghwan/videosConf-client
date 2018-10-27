import React from 'react';
import { Link } from 'react-router-dom';
import LoginAlert from './LoginAlert.jsx';

const Navbar = ({ loggedPopUp, popopen, popClose, loginpopEvent, isLoggedIn, alertMessageFormat, signAlert, onLoginButtonClick, onLogoutButtonClick, items}) => {
  return (
    <div className="container">
      <div className="navbar-start">
        <div className="nav-content">
          <div className="nav-menu">
            <dl>
              <dt><Link onClick={alertMessageFormat} to="/"><img src="https://github.com/seoksanghwan/videosConf---client/blob/master/src/img/logo.png?raw=true" alt=""/></Link></dt>
              <dd>
                <Link onClick={alertMessageFormat} to="/about">About</Link>
              </dd>
              <dd>
                {
                  (isLoggedIn) ?
                    <Link onClick={alertMessageFormat} to="/rooms">Channel List</Link> :
                    <p onClick={loginpopEvent}>Channel List</p>
                }
              </dd>
              <dd>
                {
                  (isLoggedIn) ?
                    <p onClick={onLogoutButtonClick}>Sign Out</p> :
                    <p onClick={onLoginButtonClick}>Sign In</p>
                }
              </dd>
            </dl>
          </div>
          <div className="user-info-nav">
            {
              (isLoggedIn) ?
                <p className="userIn"><img src={items.url} /> <strong>{items.name}</strong>님 안녕하세요.</p> :
                <p>로그인을 해주세요.</p>
            }
          </div>
        </div>
      </div>
      {
        (loggedPopUp) ?
          <LoginAlert popClose={popClose} /> :
          null
      }
    </div>
  );
};

export default Navbar;