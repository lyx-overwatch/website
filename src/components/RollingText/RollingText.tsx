import React, { useImperativeHandle, useRef, useState, useEffect } from "react";
import pc from 'prefix-classnames';
import { useMount } from "ahooks";
import "./RollingText.scss";

const px = pc('lyx-website-rollingtext');

export interface RollingTextProps extends React.HTMLAttributes<HTMLDivElement> {
  array: Array<string>; // 跑马灯数据源
  waitSecond?: number; // 文字不够长不滚动时，切换下一条的等待时间
  waitNextSecond?: number; // 滚动完成时，切换下一条的等待时间
  rolling?: boolean; // 是否滚动
  speedTimes?: number; // 滚动速度
  behindfix: string; // 添加后缀保证唯一性
  containerClass?: string
  textClass?: string
}

const relationObj: Record<string, any> = {};

const RollingText: React.FC<RollingTextProps> = React.forwardRef(
  (props, pRef) => {
    const {
      array,
      waitSecond = 10,
      waitNextSecond = 2,
      rolling = true,
      speedTimes = 1,
      behindfix,
      containerClass = '',
      textClass = '',
      ...otherProps
    } = props;
    const ref = useRef<HTMLDivElement>(null);
    const sRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(pRef, () => ref.current);

    const [curText, setText] = useState(array[0]);
    const [index, setIndex] = useState(array[0]);

    useMount(() => {
      relationObj[`${behindfix}`] = {};
      relationObj[`${behindfix}`].index = 0;
      relationObj[`${behindfix}`].timer = null;
    });

    useEffect(() => {
      startMove(sRef);
      return () => clearInterval(relationObj[`${behindfix}`].timer);
    }, [curText, array, index]);

    const startMove = (rollingText: any) => {
      if (!rolling) return;
      if (ref && ref.current && rollingText && rollingText.current && curText) {
        const { clientWidth } = ref.current;
        const span = rollingText.current;
        const { offsetWidth } = span;
        const rollingDistance = offsetWidth - clientWidth;

        span.style.transform = `translateX(-${0}px)`;

        const animationName = `rolling${behindfix + new Date().getTime().toString()
          }`;
        const animationTime =
          rollingDistance > 0
            ? Math.ceil(rollingDistance / (30 * speedTimes))
            : waitSecond - waitNextSecond;

        // css3 动画规则
        const rollingTextAnimation = `@keyframes ${animationName} {
            0% {
              transform: translateX(0);
              -webkit-transform: translateX(0);
            }
            100% {
              transform: translateX(-${rollingDistance}px);
              -webkit-transform: translateX(-${rollingDistance}px);
            }
          }`;

        const { length } = document.styleSheets[0].cssRules;

        if (!relationObj[`${behindfix}`].cssRulerIndex) {
          relationObj[`${behindfix}`].cssRulerIndex = length;
          document.styleSheets[0].insertRule(
            rollingTextAnimation,
            relationObj[`${behindfix}`].cssRulerIndex
          );
        } else {
          // 添加新规则前，删除原来的规则
          document.styleSheets[0].deleteRule(
            relationObj[`${behindfix}`].cssRulerIndex
          );
          document.styleSheets[0].insertRule(
            rollingTextAnimation,
            relationObj[`${behindfix}`].cssRulerIndex
          );
        }

        span.style.animation = `${animationName} ${animationTime === waitSecond ? 0 : animationTime
          }s linear`;

        if (rollingDistance > 0)
          span.style.transform = `translateX(-${rollingDistance}px)`;

        relationObj[`${behindfix}`].timer = setInterval(() => {
          relationObj[`${behindfix}`].index += 1;
          setText(array[relationObj[`${behindfix}`].index % array.length]);
          // 针对只有一条数据的情况，特殊处理
          if (array.length === 1) {
            setIndex(relationObj[`${behindfix}`].index);
          }
        }, animationTime * 1000 + waitNextSecond * 1000);
      } else {
        relationObj[`${behindfix}`].timer = setInterval(() => {
          setText(array[relationObj[`${behindfix}`].index % array.length]);
        }, 0);
      }
    };

    return (
      <div className={`${px('root')} ${containerClass}`} ref={ref} {...otherProps}>
        <span className={`${px('text')} ${textClass}`} ref={sRef}>
          {curText}
        </span>
      </div>
    );
  }
);

export default RollingText;
