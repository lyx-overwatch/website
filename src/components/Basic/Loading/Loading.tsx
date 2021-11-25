import React from "react";
import pc from "prefix-classnames";
import "./Loading.scss";

const px = pc('lyx-website-loading');

const Loading = () => {
  return (
    <div id="loading-container">
      <p className={px('text')}>
        <span className={px('letter')}>L</span>
        <span className={px('letter')}>o</span>
        <span className={px('letter')}>a</span>
        <span className={px('letter')}>d</span>
        <span className={px('letter')}>i</span>
        <span className={px('letter')}>n</span>
        <span className={px('letter')}>g</span>
      </p>
    </div >
  );
};

export default Loading;
