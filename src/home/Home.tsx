import React from "react";
import pc from "prefix-classnames";
import "./Home.less";

const px = pc("lyx-website");

const Home = () => {
  return (
    <div className={px("root")}>
      <div className={px("header")}>home</div>
    </div>
  );
};

export default Home;
