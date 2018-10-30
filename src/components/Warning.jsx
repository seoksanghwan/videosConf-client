import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from "react-router-dom";

export default class Warning extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
   this.props.pageGoback();
   this.props.popClose();
  }

  render () {
    const {pageReturn} = this.props;
    return (
      <div className="warning-page">
        <div>
          <p>잘못된 접근입니다.<br />잠시만 기다려주세요 채널리스트로 돌아가겠습니다.</p>
          <p className="import">회의 중 갑자기 통신이 끊어지게되는 것은<br />주최지가 채널을 삭제해서입니다.</p>
        </div>
        <div className="loadspin"></div>
        {
          (pageReturn) ? <Redirect to="/rooms" /> : null
        }
      </div>
    );
  }
};