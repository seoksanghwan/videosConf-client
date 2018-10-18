import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LioWebRTC from 'liowebrtc';

class RoomsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peers: [],
      mutedPeerIds: [],
      inRoom: false,
      muted: false
    };
    this.remoteVideos = {};
    this.roonName = this.props.match.params.room_name;
    window.onpopstate = e => {
      this.webrtc.stopLocalVideo();
      this.webrtc.leaveRoom();
    }
  }

  componentDidMount() {
    this.webrtc = new LioWebRTC({
      url: 'https://sandbox.simplewebrtc.com:443/',
      localVideoEl: this.localVid,
      nick: `${this.props.email},${this.props.url}`,
      debug: true,
      dataOnly: false,
      network: {
        maxPeers: 2,
        minPeers: 4
      }
    });
    this.addListeners();
    this.webrtc.startLocalVideo();
  }

  addListeners = () => {
    this.vidset = this.props.vidset;
    this.webrtc.on('videoAdded', this.addVideo);
    this.webrtc.on('videoRemoved', this.removeVideo);
    this.webrtc.on('readyToCall', this.readyToCall);
  }

  addVideo = (stream, peer) => {
    this.setState({ peers: [...this.state.peers, peer] }, () => {
      this.webrtc.attachStream(stream, this.remoteVideos[peer.id]);
    });
    console.log(this.remoteVideos[peer.id])
  }

  removeVideo = (peer) => {
    this.setState({
      peers: this.state.peers.filter(p => !p.closed)
    });
  }

  readyToCall = () => {
    this.webrtc.joinRoom(this.roonName, (err, desc) => {
      this.setState({ inRoom: true });
    });
  }

  handleSelfMute = (e) => {
    const muted = this.state.muted;
    if (muted) {
      this.webrtc.unmute();
    } else {
      this.webrtc.mute();
    }
    this.setState({ muted: !muted });
  }

  disconnect = () => {
    this.props.history.push('/rooms');
    this.webrtc.stopLocalVideo();
    this.webrtc.leaveRoom();
    this.webrtc.disconnect();
  }

  render() {
    const { peers } = this.state;
    return (
      <div className="details-box">
        <div className="sidebar local">
          <h2>
            {this.roonName}
            <em><i className="far fa-user"></i> {peers.length + 1}</em>
          </h2>
          <div className="localBox">
            <video id = 'localVideo' autoPlay={true} ref={(vid) => this.localVid = vid} />
            <div className="nick">
              <p> {this.props.email} </p>
            </div>
          </div>
          <div className="buttons">
            <button onClick={this.handleSelfMute.bind(this)}>
              <i className="fas fa-volume-off"></i>
            </button>
            <button onClick={this.disconnect.bind(this)}>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
          <div className="remotePeerList">
            <h3>Member</h3>
            <ul>
              <li> <img src={this.props.url} alt=""/> <p>{this.props.email}</p></li>
              {
                peers.map( name => <li key={name.id}> <img src={name.nick.split(',')[1]} alt=""/> <p>{name.nick.split(',')[0]}</p></li> )
              }
            </ul>
          </div>
        </div>
        <div className="remotevideo">
         { 
           peers.map( data => (
            <div className="vidContainer" key={data.id} id={`${this.webrtc.getContainerId(data)}`}>
              <video id={this.webrtc.getId(data)} ref={(v) => this.remoteVideos[data.id] = v} playsInline />
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

export default RoomsDetails;
