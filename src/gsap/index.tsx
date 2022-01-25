import React, { useEffect, useRef } from "react";
import { TweenMax } from "gsap";
import "./index.less";

const GsapComp = () => {
  const ref = useRef(null);

  useEffect(() => {
    new TweenMax(ref.current, 2, {
      x: 300,
      // repeat: -1,
    });
  }, []);

  return (
    <div className="root">
      <div className="box underline " ref={ref}>
        hello world
      </div>
    </div>
  );
};

export default GsapComp;
