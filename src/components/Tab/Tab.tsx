import React from 'react';
import { useHistory } from 'react-router-dom';
import './Tab.scss';

const Tab = () => {
  const histroy = useHistory();

  return (
    <div className="wrapper">
      <div className="circle">
        <i className="iconfont icon-caidanguanli plus-icon"></i>
        <i className="iconfont icon-zhuye social" onClick={() => histroy.push('/self')}></i>
        <i className="iconfont icon-icon2 social heart" onClick={() => histroy.push('/heart')}></i>
        <i className="iconfont icon-github social" onClick={() => window.location.href = 'https://github.com/lyx-overwatch/website'}></i>
      </div>
    </div>

  )
};

export default Tab;