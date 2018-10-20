import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Detailexport from './Detailexport.jsx';

class RoomsDetails extends Component {
  constructor(props) {
    super(props);
    this.remoteVideos = {};
    window.onpopstate = e => {
      this.webrtc.leaveRoom();
      this.webrtc.stopLocalVideo();
    }
  }

  componentDidMount() {
    this.webrtc = this.props.webrtc;
    //this.webrtc.config.localVideoEl = this.props.localRef.current;
    this.webrtc.startLocalVideo();
    //this.props.AddpeerVideo(this.remoteVideos);
    this.webrtc.on('readyToCall', this.readyToCall.bind(this));
  }

  readyToCall() {
    const room_name = this.props.match.params.room_name;
    if (room_name) { this.webrtc.joinRoom(room_name); }
  }

  disconnect() {
    this.props.history.push('/rooms');
    this.webrtc.stopLocalVideo();
    this.webrtc.leaveRoom();
    this.webrtc.disconnect();
  }

  render() {
    const { peers, email, url, localRef } = this.props;
    const { room_name } = this.props.match.params.room_name
    return (
      <div className="details-box">
        <Detailexport 
          room_name = { room_name }
          peers= { peers }
          email= { email }
          url= { url }
          localRef = { localRef }
          disconnect = { this.disconnect.bind(this) }
        />
        <div className="sidebar local">
          <h2>
            {}
            <em><i className="far fa-user"></i> {peers.length + 1}</em>
          </h2>
          <div className="localBox">
            <video id='localVideo' ref={localRef}/>
            <div className="nick">
              <p>{email}</p>
            </div>
          </div>
          <div className="buttons">
            {/*onClick={this.handleSelfMute.bind(this)}onClick={this.disconnect.bind(this)}*/}
            <button>
              <i className="fas fa-volume-off"></i>
            </button>
            <button onClick={this.disconnect.bind(this)}>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
          <div className="remotePeerList">
            <h3>Member</h3>
            <ul>
              <li>
                <img src={url} alt="" />
                <p>{email}</p>
              </li>
              {
                peers.map(name =>
                  <li key={name.id}>
                    <img src={name.nick.split(',')[1]} alt="" />
                    <p>{name.nick.split(',')[0]}</p>
                  </li>
                )
              }
            </ul>
          </div>
        </div>
        <div className="remotevideo" id="remotevideo">
          {
            /*peers.map(data => (
              <div className="vidContainer" key={data.id} id={`container_${this.webrtc.getContainerId(data)}`}>
                <video id={this.webrtc.getId(data)} ref={(v) => this.remoteVideos[data.id] = v} playsInline />
                <div className="nick">
                  <p>{data.nick.split(',')[0]}</p>
                </div>
              </div>
            ))*/
          }
        </div>

      </div>
    );
  };
};

export default RoomsDetails;