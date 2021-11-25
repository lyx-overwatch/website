import React from "react";
import pc from "prefix-classnames";
import "./FlashPoint.scss";

const prefix = "lyx-website-background";
const px = pc(prefix);


const FlashPoint = (props: any) => {
  const { children } = props;
  return (
    <div className={px('root')}>
      {Array.from({ length: 20 }).map((_, index) => {
        return <div className={px('firefly')} key={index}></div>;
      })}
      {
        children
      }
    </div>
  );
};

export default FlashPoint;
