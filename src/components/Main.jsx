import React, { Component } from 'react';
import { Link } from "react-router-dom";

const Main = props => {
  return (
    <div className="meeting-room-create">
      <div className="rooms_title">
        <form>
          <label htmlFor="rooms_title">
            <h1>VideΩs. <Link className="navbar-item" to="/rooms">Room List</Link></h1>
            <input type="text" id="rooms_title" name="rooms_title" ref={props.inputRef} placeholder="안녕하세요!! 회의실을 생성해주세요." />
            <button name="rooms_title" onClick={props.saveFormData} >Create!</button>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Main;