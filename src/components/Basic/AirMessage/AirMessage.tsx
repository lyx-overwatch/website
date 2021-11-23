import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { planeSvg, rope } from './constant';
import './AirMessage.scss';

interface AirMessageProps {
  value: string;
  closeMessage: () => void;
}

const AirMessage = (props: AirMessageProps) => {
  const { value, closeMessage } = props;
  const airRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const [plane, setPlane] = useState<string>('');
  const _this = useRef<{ times: number, firstWait: boolean, shakeIndex: number; flyTimer: number; shakeTimer: NodeJS.Timeout; shakeArr: any[] }>
    ({
      times: 3, firstWait: false, shakeIndex: 0, flyTimer: 0, shakeTimer: setTimeout(() => { }, 0), shakeArr: []
    }).current;

  useEffect(() => {
    const svg = planeSvg();
    setPlane(svg);
    move();
  }, []);

  useEffect(() => {
    if (value) {
      reset();
    }
  }, [value]);

  // 向左的飞行动画
  const flyAnimate = (pos: number) => {
    const air = airRef && airRef.current;
    if (!air) return;
    const cur = pos - 1 / 4;
    _this.flyTimer = window.requestAnimationFrame(async () => {
      air.style.left = `${cur}%`;
      if (cur > 5) {
        flyAnimate(cur);
      } else if (cur > -100) {
        // 模拟暂停功能
        const wait = new Promise((resolve) => {
          const timerWait = setTimeout(() => {
            resolve(true);
            clearTimeout(timerWait);
          }, 1500);
        })
        if (!_this.firstWait) {
          _this.firstWait = true;
          await wait;
          flyAnimate(cur);
        } else {
          flyAnimate(cur);
        }
      } else if (cur <= -100) {
        if (_this.times > 0) {
          flyAnimate(100);
          _this.firstWait = false;
          _this.times -= 1;
        } else {
          closeMessage();
        }
      }
    })
  };

  // 上下摇摆动画
  const shakeAnimate = (arr: any[], index: number) => {
    const len = arr.length;
    if (!len) return;
    const cur = arr[index];
    const motion = 3;
    const topV = cur.dataset.top ? cur.dataset.top : motion;
    const newTopV = +topV === motion ? -motion : motion;
    cur.style.top = `${newTopV}px`;
    cur.dataset.top = newTopV;
    const newIndex = index < len - 1 ? index + 1 : 0;
    _this.shakeTimer = setTimeout(() => {
      shakeAnimate(arr, newIndex);
    }, 120);
  }

  const move = () => {
    flyAnimate(100);
    const header = headerRef && headerRef.current;
    const message = messageRef && messageRef.current;
    const ghost = ghostRef && ghostRef.current;
    const arr: any[] = [];
    if (header && message && ghost) {
      arr.push(header);
      arr.push(message);
      arr.push(ghost);
    };
    _this.shakeArr = arr;
    shakeAnimate(arr, _this.shakeIndex);
  };

  const reset = () => {
    const air = airRef && airRef.current;
    if (!air) return;
    air.style.left = '100%';
    window.cancelAnimationFrame(_this.flyTimer);
    clearTimeout(_this.shakeTimer);
    _this.firstWait = false;
    _this.shakeIndex = 0;
    setPlane('');
    window.requestAnimationFrame(() => {
      const svg = planeSvg();
      setPlane(svg);
      move();
    })
  };

  return ReactDOM.createPortal((
    <div className="air-message" ref={airRef}>
      <div className="air-header" ref={headerRef}>
        <div className="plane-container" >
          <div className="plane" dangerouslySetInnerHTML={{ __html: plane }}></div>
        </div>
        <div className="rope" dangerouslySetInnerHTML={{ __html: rope() }}></div>
      </div>
      <div className="message" ref={messageRef}>{value}</div>
      <div className="message_ghost" ref={ghostRef}></div>
    </div>
  ), document.body)
};

export default AirMessage;