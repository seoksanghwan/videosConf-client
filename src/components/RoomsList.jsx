import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";

const RoomsList = ({ checker, isroom, items, popEvent, roomDelete }) => {
	return (
		<Fragment>
			{
				(isroom.length) ?
					isroom.map(data => {
						return (
							<dd key={data._id}>
								<h3>
									{data.title}
									<p> Organiser {data.userName}</p>
								</h3>
								<div className="del-enter">
									<button className="channelEnter" onClick={popEvent} data-id={data._id}>
										<i className="fas fa-sign-in-alt" data-id={data._id}></i>
									</button>
									{
										(data.userName === items.name) ?
											<button className="channelRemove" onClick={roomDelete} data-mail={data.userMail} data-id={data._id} >
												<i className="fas fa-trash" onClick={roomDelete} data-mail={data.userMail} data-id={data._id} ></i>
											</button> : null
									}
								</div>
							</dd>
						);
					}) :
					(checker) ?
						<dd className="roomsList-loader">
							<p>채널 리스트를 가져오는 중입니다.</p>
							<div className="three-cogs fa-3x">
								<i className="fa fa-cog fa-spin fa-2x fa-fw"></i>
								<i className="fa fa-cog fa-spin fa-1x fa-fw"></i>
								<i className="fa fa-cog fa-spin fa-1x fa-fw"></i>
							</div>
						</dd> : 
						<dd className="no-channel">현재 생성된 채널이 없습니다.</dd>
			}
		</Fragment>
	);
};

export default RoomsList;
