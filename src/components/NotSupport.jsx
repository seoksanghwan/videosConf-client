import React, { Component } from 'react';
import { Link } from "react-router-dom";

const NotSupport = () => {
  return (
    <div className="NotSupport">
      <p>
        현재 이 서비스는 익스플로러를 지원 하지 않습니다.
        <br />크롬을 다운 후 실행시켜주세요.
        <a href="https://www.google.com/intl/ko_ALL/chrome/">CHROME 다운로드</a>
      </p>
      <p className="NotSupportText">Not Support</p>
    </div>
  );
};

export default NotSupport;
