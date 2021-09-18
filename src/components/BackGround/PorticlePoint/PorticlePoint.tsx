import React from "react";
import "./PorticlePoint.scss";

const PorticlePoint = () => {
  return (
    <div className="root">
      <>
        <div className="page-bg"></div>

        <div className="animation-wrapper">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
        </div>

        <div className="page-wrapper"></div>
      </>
    </div>
  );
};

export default PorticlePoint;
