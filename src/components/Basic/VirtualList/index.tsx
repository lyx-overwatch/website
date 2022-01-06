import React, { useEffect, useState, useRef } from "react";
import styles from "./VirtualList.module.scss";

interface VritualListProps {
  children: (item: any) => React.ReactNode;
  data: Array<any>;
  itemSize: number;
  itemHeight?: number;
}

const VritualList = (props: VritualListProps) => {
  const {
    children = () => null,
    data = [],
    itemSize = 20,
    itemHeight = 40,
  } = props;

  const scrollRef = useRef<HTMLDivElement>(null);
  const vritualContaninerRef = useRef<HTMLDivElement>(null);
  const _this = useRef<{ timer: number }>({ timer: 0 }).current;

  const [currentData, setData] = useState(data.slice(0, itemSize));
  const [startIndex, setIndex] = useState(0);

  useEffect(() => {
    setData(data.slice(0, itemSize));
    const scroll = initSoroll();
    if (scroll) {
      return () => scroll();
    }
  }, [data]);

  const initSoroll = () => {
    const el = scrollRef.current;
    const container = vritualContaninerRef.current;
    if (!el || !container) return;
    container.style.height = `${data.length * itemHeight}px`;

    const handleScroll = (e: any) => {
      if (_this.timer) window.cancelAnimationFrame(_this.timer);
      _this.timer = window.requestAnimationFrame(() => {
        const { target } = e;
        // 获取滚动距离
        const { scrollTop } = target;
        // 获取当前显示的第一个元素索引
        const number = Math.floor(scrollTop / itemHeight);
        const curRenderData = data.slice(number, number + itemSize);
        setData(curRenderData);
        setIndex(number);
      });
    };

    el.addEventListener("scroll", handleScroll, false);

    return () => el.removeEventListener("scroll", handleScroll, false);
  };

  return (
    <div ref={scrollRef} className={styles.Root}>
      <div
        className={styles.Container}
        style={{ transform: `translate3d(0 ,${startIndex * itemHeight}px, 0)` }}
      >
        {currentData.map(children)}
      </div>
      <div ref={vritualContaninerRef} className={styles.VirtualBody}></div>
    </div>
  );
};

export default VritualList;
