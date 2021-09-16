import React, { useEffect, useState, useRef } from "react";
import pc from "prefix-classnames";
import Heart from "../components/Heart";
import "./Home.less";

const px = pc("lyx-website");

const Home = () => {
  const ref = useRef(null);
  const [rootHeight, setHetght] = useState<number>(0);
  const [rootWidth, setWidth] = useState<number>(0);

  useEffect(() => {
    if (ref && ref.current) {
      const { clientHeight, clientWidth } = ref.current;
      setHetght(clientHeight);
      setWidth(clientWidth);
    }
  }, []);

  return (
    <div className={px("root")} ref={ref}>
      <Heart rootHeight={rootHeight} rootWidth={rootWidth}></Heart>
    </div>
  );
};

export default Home;
