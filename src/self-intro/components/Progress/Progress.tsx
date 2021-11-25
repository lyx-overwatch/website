import React from 'react';
import pc from "prefix-classnames";
import './Progress.scss';

const px = pc('lyx-website-progress');

const Progress = () => {
  return (
    <div className={px('root')}>
      <div className={px('color')}></div>
    </div>
  )
};

export default Progress;