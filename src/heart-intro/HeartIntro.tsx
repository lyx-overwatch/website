import React, { useEffect, useState, useRef } from "react";
import pc from "prefix-classnames";
import Heart from "../components/Heart";
import {
  hearts,
  start,
  dynamicPreTexts,
  dynamicNextTexts,
  WRITER_CONFIG,
} from "./constant";
import { requestAnimationFrame, cancelAnimationFrame } from "@/utils";
import "./HeartIntro.less";

const px = pc("lyx-website");

const HeartIntro = () => {
  const ref = useRef(null);
  const _this = useRef<{
    startTimer: number;
    delayTimer: NodeJS.Timeout | number | undefined;
    startDay: any;
  }>({ startDay: null, delayTimer: 0, startTimer: 0 }).current;
  const [rootHeight, setHetght] = useState<number>(0);
  const [rootWidth, setWidth] = useState<number>(0);
  const [day, setDay] = useState<number>(0);
  const [showDayText, setShow] = useState<boolean>(false);

  const getCurDay = () => {
    _this.startTimer = requestAnimationFrame(() => {
      cancelAnimationFrame(_this.startTimer);
      if (_this.startDay) {
        const cur = new Date();
        const len = cur.getTime() - _this.startDay.getTime();
        const added = Math.floor(len / (1000 * 3600 * 24));
        if (day !== added) {
          setDay(added);
        }
      }
    });
  };

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
      cancelAnimationFrame(_this.startTimer);
      clearTimeout(_this.delayTimer as number);
    };
  }, []);

  const generateAnimation = async (list: Array<any>) => {
    for (const write of list) {
      await write.animateCharacter();
    }
    return true;
  };

  const showDay = () => {
    new Promise((resolve) => {
      _this.delayTimer = setTimeout(() => {
        clearTimeout(_this.delayTimer as number);
        setShow(true);
        resolve(true);
      }, 500);
    });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  };

  const createText = async () => {
    const preList: any[] = [];
    const nextList: any[] = [];
    dynamicPreTexts.forEach((item) => {
      const { id, text } = item;
      preList.push(window.HanziWriter.create(id, text, WRITER_CONFIG));
    });
    dynamicNextTexts.forEach((item) => {
      const { id, text } = item;
      nextList.push(window.HanziWriter.create(id, text, WRITER_CONFIG));
    });
    await generateAnimation(preList);
    await showDay();
    await generateAnimation(nextList);
  };

  useEffect(() => {
    if (day && window.HanziWriter) {
      createText();
    }
  }, [day]);

  return (
    <div className={px("root")} ref={ref}>
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
        );
      })}
      <div className={px("current")}>
        <div className={px("text")}>
          {dynamicPreTexts.map((item) => {
            const { id } = item;
            return <span id={id} key={id}></span>;
          })}
          <div id="day" style={{ opacity: showDayText ? "1" : "0" }}>
            {day}
          </div>
          {dynamicNextTexts.map((item) => {
            const { id } = item;
            return <span id={id} key={id}></span>;
          })}
        </div>
      </div>
    </div>
  );
};

export default HeartIntro;
