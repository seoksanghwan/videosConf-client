import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const Detailexport = (props) => {
  const { webrtc, room_name, peers, email, url, disconnect, AddpeerVideo } = props;

  return (
    <div>
      <div className="sidebar local">
        <h2>
          {room_name}
          <em><i className="far fa-user"></i> {peers.length + 1}</em>
        </h2>
        <div className="localBox">
          <video id='localVideo' autoPlay={true} />
          <div className="nick">
            <p> {email} </p>
          </div>
        </div>
        <div className="buttons">
          <button >
            <i className="fas fa-volume-off"></i>
          </button>
          <button onClick={disconnect}>
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
        <div className="remotePeerList">
          <h3>Member</h3>
          <ul>
            <li> <img src={url} alt="" /> <p>{email}</p></li>
            {
              peers.length && peers.map(name => <li key={name.id}> <img src={name.nick.split(',')[1]} alt="" /> <p>{name.nick.split(',')[0]}</p></li>)
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Detailexport;