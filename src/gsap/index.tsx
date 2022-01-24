import React, { useEffect } from "react";
import { TweenMax } from "gsap";
import "./index.less";

const GsapComp = () => {
  useEffect(() => {
    new TweenMax(".box", 2, {
      x: 300,
    });
  }, []);

  return (
    <div className="root">
      <div className="box underline p-1"> hello world</div>
    </div>
  );
};

export default GsapComp;
