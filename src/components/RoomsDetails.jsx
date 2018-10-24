import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { uniqWith, isEqual } from "lodash";

export default class RoomsDetails extends Component {
  constructor(props) {
    super(props);
    this.remoteVideos = {};
  }

  componentDidMount() {
    const { room_name } = this.props.match.params;
    this.webrtc = this.props.webrtc;
    this.props.startLoclaVideo(this.localVideo);
    this.props.AddpeerVideo(this.remoteVideos);
    this.props.joinChat(room_name);
  }

  render() {
    const { peers, email, url, AddpeerVideo, webrtc, disconnect, handleSelfMute, mute, connectVideo } = this.props;
    const { room_name } = this.props.match.params;
    return (
      <div className="details-box">
        <div className="sidebar local">
          <h2>
            {room_name}
            <em><i className="far fa-user"></i> {peers.length + 1}</em>
          </h2>
          <div className="localBox">
            <video id='localVideo' autoPlay={true} ref={(vid) => this.localVideo = vid} />
            <div className="nick">
              <p> {email} </p>
            </div>
          </div>
          <div className="buttons">
            <button onClick={connectVideo}>
              <i className="fas fa-video"></i>
            </button>
            <button onClick={handleSelfMute}>
              {
                (mute) ?
                  <i className="fas fa-volume-up"></i> :
                  <i className="fas fa-volume-mute"></i>
              }
            </button>
            <button onClick={disconnect}>
              <i className="fas fa-sign-out-alt"></i>
            </button>
            <p>통화버튼을 눌러주세요.</p>
          </div>
          <div className="remotePeerList">
            <h3>Member</h3>
            <ul>
              <li> <img src={url} alt="" /> <p>{email}</p></li>
              {
                peers.map(name => <li key={name.id}> <img src={name.nick.split(',')[1]} alt="" /> <p>{name.nick.split(',')[0]}</p></li>)
              }
            </ul>
          </div>
        </div>
        <div className="remotevideo" >
          {
            uniqWith(peers, isEqual).map(data => (
              <div className="vidContainer" key={data.id} id={`${webrtc.getContainerId(data)}`} >
                <video id={webrtc.getId(data)} autoPlay={true} ref={(vid) => this.remoteVideos[data.id] = vid} playsInline />
                <div className="nick">
                  <p>{data.nick.split(',')[0]}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  };
};
