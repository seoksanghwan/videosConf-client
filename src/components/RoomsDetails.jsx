import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { uniqWith, isEqual } from "lodash";

export default class RoomsDetails extends Component {
  constructor(props) {
    super(props);
    this.remoteVideos = {};
  }

  componentDidUpdate() {

    this.pass = this.props.pass
  }

  componentDidMount() {
    const { inroom, isroom, pass } = this.props;
    const { room_name } = this.props.match.params;
    this.webrtc = this.props.webrtc;
    this.props.startLoclaVideo(this.localVideo);
    this.props.AddpeerVideo(this.remoteVideos);
    this.props.joinChat(room_name, isroom);
  }

  render() {
    const { peers, email, url, AddpeerVideo, webrtc, disconnect, handleSelfMute, mute } = this.props;
    const { room_name } = this.props.match.params;
    return (
      <div className="details-box">
        <div className="sidebar local">
          <h2>
            {room_name}
          </h2>
          <div className="localBox">
            <video id='localVideo' autoPlay={true} ref={(vid) => this.localVideo = vid} />
            <div className="nick">
              <p> {email} </p>
            </div>
          </div>
          <div className="buttons">
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
          </div>
          <div className="remotePeerList">
            <h3><em><i className="far fa-user"></i>{peers.length + 1}</em>Member</h3>
            <ul>
              <li> <img src={url} alt="" /> <p>{email}</p></li>
              {
                peers.map(name => <li key={name.id}> <img src={name.nick.split(',')[1]} alt="" /> <p>{name.nick.split(',')[0]}</p></li>)
              }
            </ul>
          </div>
        </div>
        <div className="remotevideo" >
          <div className="remoteList">
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
      </div>
    );
  };
};
