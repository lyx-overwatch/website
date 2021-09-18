import React from "react";
import "./FlashPoint.scss";

const prefix = "lyx-website-background";

const FlashPoint = () => {
  return (
    <div className={`${prefix}-root`}>
      {Array.from({ length: 15 }).map((_, index) => {
        return <div className={`${prefix}-firefly`} key={index}></div>;
      })}
    </div>
  );
};

export default FlashPoint;
