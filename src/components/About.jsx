import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const About = props => {
	return (
		<div className="about">
			<div className="about-content">
				<div className="about-img">
					<img src="https://github.com/seoksanghwan/videosConf---client/blob/master/src/img/webcamconf.png?raw=true" alt="" />
				</div>
				<div className="about-info-text">
					<h2>Videos Conf</h2>
					<p>
						언제 어디서든 노트북만 있으면, 화상회의를 시작 하실 수 있습니다.
						지금 바로 시작해보세요.!!
					 </p>
					<div className="goingChannel">
						<label htmlFor="rooms_title">
							<input type="text" id="rooms_title" name="rooms_title" ref={props.goingRef} placeholder="참가 할 채널 제목을 입력해주세요!" />
							<button name="rooms_title" onClick={props.goingChannel} >Go!</button>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
