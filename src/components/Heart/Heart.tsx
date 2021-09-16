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
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const _this = useRef<{ timer: number }>({ timer: 0 }).current;

  const startMove = (
    offsetX: number,
    offsetY: number,
    friction: number, // x方向的摩擦力
    MaxY: number
  ) => {
    window.cancelAnimationFrame(_this.timer);
    _this.timer = window.requestAnimationFrame(() => {
      const X = friction * (offsetX + 1);
      setOffsetX(X);
      setOffsetY(offsetY + 1);
      if (offsetY <= MaxY) startMove(offsetX + 1, offsetY + 1, friction, MaxY);
    });
  };

  useEffect(() => {
    if (rootHeight > 0 && rootWidth > 0) {
      const frictionX = Math.random();
      startMove(offsetX, offsetY, frictionX, rootHeight);
    }
  }, [rootHeight, rootWidth]);

  return (
    <div
      className={px("root")}
      style={{
        position: "absolute",
        transform: `translate(${offsetX}px, ${offsetY}px)`,
      }}
    >
      <div className={px("heart")}></div>
    </div>
  );
};

export default Heart;
