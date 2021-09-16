/**
 * @author liu yunxiang
 * @description 心形组件
 */
import React, { useState, useEffect, useRef } from "react";
import pc from "prefix-classnames";
import "./Heart.less";

const px = pc("lyx-website-comp-heart");
interface HeartProps {
  rootHeight: number;
  rootWidth: number;
}

const Heart = (props: HeartProps) => {
  const { rootHeight, rootWidth } = props;
  const [offsetY, setOffsetY] = useState<number>(0);
  const _this = useRef<{ timer: number }>({ timer: 0 }).current;

  useEffect(() => {
    const xTranslation = 100 * Math.random();
  }, []);

  const startMove = (offsetY: number) => {
    window.cancelAnimationFrame(_this.timer);
    _this.timer = window.requestAnimationFrame(() => {
      setOffsetY(offsetY + 1);
      if (rootHeight && offsetY <= rootHeight) startMove(offsetY + 1);
    });
  };

  useEffect(() => {
    if (rootHeight > 0 && rootWidth > 0) {
      startMove(offsetY);
    }
  }, [rootHeight, rootWidth]);

  return (
    <div
      className={px("root")}
      style={{ position: "absolute", transform: `translate(0, ${offsetY}px)` }}
    >
      <div className={px("heart")}></div>
    </div>
  );
};

export default Heart;
