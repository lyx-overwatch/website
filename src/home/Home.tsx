import React, { useEffect, useState, useRef } from 'react'
import pc from 'prefix-classnames'
import Heart from '../components/Heart'
import { hearts, start } from './constant'
import './Home.less'

const px = pc('lyx-website')

const Home = () => {
  const ref = useRef(null);
  const _this = useRef<{ startTimer: number, startDay: any }>({ startDay: null, startTimer: 0 }).current;
  const [rootHeight, setHetght] = useState<number>(0);
  const [rootWidth, setWidth] = useState<number>(0);
  const [day, setDay] = useState<number>(0);

  const getCurDay = () => {
    window.cancelAnimationFrame(_this.startTimer);
    _this.startTimer = window.requestAnimationFrame(() => {
      if (_this.startDay) {
        const cur = new Date();
        const len = cur.getTime() - _this.startDay.getTime();
        const added = Math.floor((len / (1000 * 3600 * 24)));
        if (day !== added) {
          setDay(added);
        }
      }
    });
  }

  useEffect(() => {
    if (ref && ref.current) {
      const { clientHeight, clientWidth } = ref.current;
      setHetght(clientHeight);
      setWidth(clientWidth);
    }

    const s = new Date();
    s.setFullYear(start[0]);
    s.setMonth(start[1] - 1);
    s.setDate(start[2]);
    _this.startDay = s;

    getCurDay();

    return () => {
      window.cancelAnimationFrame(_this.startTimer);
    }
  }, [])

  return (
    <div className={px('root')} ref={ref}>
      {hearts.map((_, index) => {
        const { length } = hearts;
        return (
          <Heart
            key={index}
            rootHeight={rootHeight}
            rootWidth={rootWidth}
            index={index + 1}
            length={length}
          ></Heart>
        )
      })}
      <div className={px('current')}>今天是刘先生和谢小姐在一起的第<span>{day}</span>天啦</div>
    </div>
  )
}

export default Home
