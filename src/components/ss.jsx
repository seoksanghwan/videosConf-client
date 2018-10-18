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
    this.email = this.props.items;
    this.roonName = this.props.match.params.room_name;
  
    window.onpopstate = e => {
      this.webrtc.leaveRoom();
    }
  }

  componentDidMount() {
    this.webrtc = new LioWebRTC({
      url: 'https://sandbox.simplewebrtc.com:443/',
      localVideoEl: this.localVid,
      nick: this.email,
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
    /*this.webrtc.on('mute', this.handlePeerMute);
    this.webrtc.on('unmute', this.handlePeerUnmute);
    this.webrtc.on('receivedPeerData', this.handlePeerData);*/
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

  handlePeerData = (type, data, peer) => {
    switch (type) {
      case 'windowColor':
        //peer.bColor = `rgba(${data.r}, ${data.g}, ${data.b}, ${data.a})`;
        this.setState({ roomCount: this.webrtc.getPeers().length });
        break;
      default:
        break;
    }
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

  handlePeerMute = (data) => {
    if (!this.state.mutedPeerIds.includes(data.id)) {
      this.setState({ mutedPeerIds: [...this.state.mutedPeerIds, data.id] });
    }
  }

  handlePeerUnmute = (data) => {
    this.setState({ mutedPeerIds: this.state.mutedPeerIds.filter(id => id !== data.id) });
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
            <video id = 'localVideo' autoPlay={true} style={ { transform: 'scaleX(-1)' } } ref={(vid) => this.localVid = vid} />
            <div className="nick">
              <p>{this.email}</p>
            </div>
          </div>
          <div className="buttons">
            {/*onClick={this.handleSelfMute.bind(this)}*/}
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
              <li><p>{this.email}</p></li>
              {
                peers.map( name => <li key={name.id}><p>{name.nick}</p></li> )
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
                <p>{data.nick}</p>
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