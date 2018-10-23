import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class About extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="about">
				<div className="about-content">
					<div className="about-img">
						<img src="https://github.com/seoksanghwan/videosConf---client/blob/master/src/img/video-conf.jpg?raw=true" alt="" />
					</div>
					<div className="about-info-text">
						<h2>VideΩs Conf</h2>
						<p>
							When your team needs to kick off a project,
							hire a new employee, deploy some code, review a sales contract,
							finalize next year's budget, measure an A/B test,
							plan your next office opening, and more, Videos has you covered.
					 </p>
					</div>
				</div>
			</div>
		);
	};
};
