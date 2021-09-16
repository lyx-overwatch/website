/**
 * @author liu yunxiang
 * @description 心形组件
 */
import React, { useState, useEffect, useRef } from "react";
import pc from "prefix-classnames";
import { getRandomVars } from './constant';
import { hearts } from '../../home/constant';
import "./Heart.less";

const px = pc("lyx-website-comp-heart");
interface HeartProps {
  rootHeight: number;
  rootWidth: number;
  index: number;
  length: number;
}

const Heart = (props: HeartProps) => {
  const { rootHeight, rootWidth, index, length } = props;
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [text, setText] = useState<string>('');

  const _this = useRef<{ timer: number, height: number, rootWidth: number}>(
    { timer: 0, height: 0, rootWidth: 0 }).current;
  const ref = useRef(null);

  useEffect(() => {
    if (ref && ref.current) {
      const { clientHeight } = ref.current;
      setOffsetY(-clientHeight);
      _this.height = clientHeight;
    }

    return () => {
      window.cancelAnimationFrame(_this.timer);
    }
  }, [])

  const startMove = (
    offsetX: number,
    offsetY: number,
    MaxY: number,
    speed: number, // 速度
    friction: number, // x方向的摩擦力,用来控制x方向的速度
    isPositive: boolean // 方向
  ) => {
    window.cancelAnimationFrame(_this.timer);
    _this.timer = window.requestAnimationFrame(() => {
      const curXDis = friction * speed * 1;
      const X = isPositive ? offsetX + curXDis : offsetX - curXDis;
      const Y = offsetY + 1 * speed;
      setOffsetX(X);
      setOffsetY(Y);
      if (offsetY <= MaxY) {
        startMove(X, Y, MaxY, speed, friction, isPositive);
      } else {
        window.cancelAnimationFrame(_this.timer);
        const { frictionX: curFriction, isPositive: curIsPosition, speed: curSpeed, curOffsetX: curOriginX } = getRandomVars(_this.rootWidth, length, index);
        startMove(curOriginX, -_this.height, MaxY, curSpeed, curFriction, curIsPosition);
        setText('');
      }
    })
  }

  useEffect(() => {
    if (rootHeight > 0 && rootWidth > 0) {
      const { frictionX, isPositive, speed, curOffsetX } = getRandomVars(rootWidth, length, index);
      _this.rootWidth = rootWidth;
      setOffsetX(curOffsetX);
      startMove(curOffsetX, offsetY, rootHeight, speed, frictionX, isPositive);
    }
  }, [rootHeight, rootWidth]);

  const showText = () => {
    const { curTextIndex } = getRandomVars(rootWidth, length, index);
    const curText = hearts[curTextIndex].text;
    setText(curText);
  }

  const hideText = () => {
    setText('');
  }

  return (
    <div
      className={px('root')}
      style={{
        position: 'absolute',
        transform: `translate(${offsetX}px, ${offsetY}px)`,
      }}
      ref={ref}
    >
      <div style={{ display: !text ? '' : 'none' }} className={px('heart')} onClick={() => showText()}></div>
      <div style={{ display: text ? '' : 'none' }} className={px('text')} onClick={() => hideText()}>{text}</div>
    </div>
  )
};

export default Heart;
