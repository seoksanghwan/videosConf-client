import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import { uniqWith, isEqual } from "lodash";

const Rooms = ({ roomDelete, roomData }) => {
  return (
    <div className="rooms-list">
      <dl>
        <dt>
          <h2 className="title">
            Enjoy Public Room
            <em>여기는 공개 회의실입니다.</em>
          </h2>
        </dt>
        {
          uniqWith(roomData, isEqual).map(data => {
            return (
              <dd key={data._id}>
                <Link to={`rooms/${data.title}`}>
                  {data.title}
                  <p>Organiser {data.userName}</p>
                </Link>
                <button onClick={roomDelete} data-mail={data.userMail} data-id={data._id} >Delete</button>
              </dd>
            );
          })
        }
      </dl>
    </div>
  );
};

export default Rooms;
