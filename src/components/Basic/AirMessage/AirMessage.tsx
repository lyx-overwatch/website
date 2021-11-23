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
  const [WIDTH] = useState(document.body.clientWidth);
  const [left, setLeft] = useState(WIDTH);
  const [plane, setPlane] = useState<string>('');
  const _this = useRef<{ times: number, firstWait: boolean, shakeIndex: number; flyTimer: number; shakeTimer: NodeJS.Timeout; shakeArr: any[] }>
    ({
      times: 3, firstWait: false, shakeIndex: 0, flyTimer: 0, shakeTimer: setTimeout(() => { }, 0), shakeArr: []
    }).current;

  useEffect(() => {
    if (value) {
      reset();
    }
  }, [value]);

  // 向左的飞行动画
  const flyAnimate = (pos: number) => {
    const cur = pos - 1;
    setLeft(cur);
    _this.flyTimer = window.requestAnimationFrame(async () => {
      if (cur > 20) {
        flyAnimate(cur);
      } else if (cur > -WIDTH) {
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
          flyAnimate(WIDTH);
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
    const air = airRef && airRef.current;
    if (!air) return;
    flyAnimate(WIDTH);
    const header = headerRef && headerRef.current;
    const message = messageRef && messageRef.current;
    const ghost = ghostRef && ghostRef.current;
    const arr: any[] = [];
    header && arr.push(header);
    message && arr.push(message);
    ghost && arr.push(ghost);
    if (!arr.length) return;
    _this.shakeArr = arr;
    shakeAnimate(arr, _this.shakeIndex);
  };

  const reset = () => {
    const air = airRef && airRef.current;
    if (!air) return;
    const body = document.body;
    setLeft(body.clientWidth);
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
    // <div className="air-message" ref={airRef} style={{ position: 'absolute', left: `${left}%` }}>
    <div className="air-message" ref={airRef} style={{ position: 'absolute', transform: `translateX(${left}px) translateZ(0)` }}>
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