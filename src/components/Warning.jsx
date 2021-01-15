import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from "react-router-dom";

export default class Warning extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.pageGoback();
    this.props.popClose();
  }

  render() {
    const { pageReturn } = this.props;
    return (
      <div className="warning-page">
        <div>
          <p>잘못된 접근입니다.<br />잠시만 기다려주세요 채널리스트로 돌아가겠습니다.</p>
          <p className="import">주최자가 채널을 삭제 할 경우 자동으로 통신이 끊어 집니다.</p>
        </div>
        <div className="loadspin">
          <div className="three-cogs fa-3x">
            <i className="fa fa-cog fa-spin fa-2x fa-fw"></i>
            <i className="fa fa-cog fa-spin fa-1x fa-fw"></i>
            <i className="fa fa-cog fa-spin fa-1x fa-fw"></i>
          </div>
        </div>
        {
          (pageReturn) ? <Redirect to="/rooms" /> : null
        }
      </div>
    );
  }
};