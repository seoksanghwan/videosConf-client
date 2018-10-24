import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {
  return (
    <div className="container">
      <div className="navbar-start">
        <div className="nav-content">
          <div className="nav-menu">
            <dl>
              <dt><Link to="/"><img src="https://github.com/seoksanghwan/videosConf---client/blob/master/src/img/logo.png?raw=true" alt=""/></Link></dt>
              <dd>
                <Link to="/about">About</Link>
              </dd>
              <dd>
                {
                  (props.isLoggedIn) ?
                    <Link to="/rooms">Public Channel</Link> :
                    <Link onClick={props.signAlert} to="/">Public Channel</Link>
                }
              </dd>
              <dd>
                {
                  (props.isLoggedIn) ?
                    <p onClick={props.onLogoutButtonClick}>Sign Out</p> :
                    <p onClick={props.onLoginButtonClick}>Sign In</p>
                }
              </dd>
            </dl>
          </div>
          <div className="user-info-nav">
            {
              (props.isLoggedIn) ?
                <p><img src={props.items.url} /> <strong>{props.items.name}</strong>님 안녕하세요.!!</p> :
                <p>로그인해주세요.</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;