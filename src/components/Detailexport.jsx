import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { refAs, refWith } from 'react-ref-helper';

class Detailexport extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    this.props.webrtc.on('videoAdded', (stream,peer) => {
      console.log(this.props.remoteVideos[peer.id])
      return this.props.webrtc.attachStream(stream, this.props.remoteVideos[peer.id])
    })
  }
  
  render() {
    const { peers, email, url, room_name, localref, remoteVideos, disconnect, webrtc } = this.props;
    return (
      <div>
        <div className="sidebar local">
          <h2>
            {room_name}
            <em><i className="far fa-user"></i> {peers.length + 1}</em>
          </h2>
          <div className="localBox">
            <video id='localVideo' autoPlay={true} ref={localref} />
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
              <li> <img src={this.props.url} alt="" /> <p>{this.props.email}</p></li>
              {
                peers.map(name => <li key={name.id}> <img src={name.nick.split(',')[1]} alt="" /> <p>{name.nick.split(',')[0]}</p></li>)
              }
            </ul>
          </div>
        </div>
        <div className="remotevideo" >
          {
            peers.length&&peers.map(data => (
              <div className="vidContainer" key={data.id} id={`${webrtc.getContainerId(data)}`} >
                <video id={webrtc.getId(data)} autoPlay={true}  ref={ el => this.remote = el } playsInline />
                <div className="nick">
                  <p>{data.nick.split(',')[0]}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Detailexport;