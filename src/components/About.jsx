import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Alert from './Alert.jsx';

const About = ({goingRef, goingChannel, passCheckRef, passwordCheck, popClose, pass, focustitle, popopen, inputCancel, alertMessage})=> {
	return (
		<div className="about">
			<div className="about-content">
				<div className="about-img">
					<img src="https://github.com/seoksanghwan/videosConf---client/blob/master/src/img/webcamconf.png?raw=true" alt="" />
				</div>
				<div className="about-info-text">
					<h2>Videos Conf</h2>
					<p>
						언제 어디서든 노트북만 있으면, 화상회의를<br/>시작 하실 수 있습니다.
						지금 바로 시작해보세요.!!
					 </p>
					<div className="goingChannel">
						<label htmlFor="going_channel">
							<input type="text" id="going_channel" name="going_channel" ref={goingRef} placeholder="채널 제목을 입력해주세요!" />
							<button name="going_channel" onClick={goingChannel} >Go!</button>
						</label>
					</div>
				</div>
			</div>
			{
        (popopen) ?
          <Alert alertMessage={alertMessage} passCheckRef={passCheckRef} passwordCheck={passwordCheck} popClose={popClose} pass={pass} focustitle={focustitle} inputCancel={inputCancel} /> :
          null
      }
		</div>
	);
};

export default About;
