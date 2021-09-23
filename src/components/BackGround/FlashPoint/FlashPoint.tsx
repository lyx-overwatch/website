import React from "react";
import "./FlashPoint.scss";

const prefix = "lyx-website-background";

const FlashPoint = (props: any) => {
  const { children } = props;
  return (
    <div className={`${prefix}-root`}>
      {Array.from({ length: 20 }).map((_, index) => {
        return <div className={`${prefix}-firefly`} key={index}></div>;
      })}
      {
        children
      }
    </div>
  );
};

export default FlashPoint;
