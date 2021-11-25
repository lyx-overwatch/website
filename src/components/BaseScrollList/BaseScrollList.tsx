/**
 * @author liu yunxiang
 * @description 封装better-scroll，完成一个可以上拉加载和下拉刷新功能的组件
 * @better-scroll文档地址: https://better-scroll.github.io/docs/zh-CN/plugins/pulldown.html#%E7%A4%BA%E4%BE%8B
 */
import React, { useEffect, useState, useRef, ReactNode } from 'react';
import Bscroll from '@better-scroll/core';
import PullDown from '@better-scroll/pull-down';
import Pullup from '@better-scroll/pull-up';
import {
  BScrollProps,
  ScrollOptions,
  defaultWrapper,
  defaultPullDownProps,
  defaultPullUpProps,
  defaultAllWrapper,
} from './constant';
import pc from "prefix-classnames";
import './BaseScrollList.less';

const px = pc('lyx-website-basescroll')

// 混合类型
export type _Mixin<T, U> = {
  [p in keyof (T & U)]: (T & U)[p];
};

// 某些子组件可能用到的混合类型声明
export type MixProps<T> = _Mixin<T, { scroll?: BScrollProps | null }>;
export interface BaseScrollProps {
  className?: string; // 类名
  scrollId: string; // 组件id
  pullDown?: boolean; // 是否需要下拉刷新
  pullUp?: boolean; // 是否需要上拉加载
  data?: Array<any>; // 数据
  children: (data: any, index: number) => ReactNode; // children渲染函数
  onPullDown?: () => void; // 下拉刷新触发的方法
  onPullUp?: () => void; // 上拉加载触发的方法
  scrollOptions?: ScrollOptions | null; // 自定义bs options参数
  headerElement?: React.ReactElement | null; // 列表最上方dom结构(某些场景可能需要)
  end?: boolean; // 用于判断是否已经加载完数据
}

const defaultProps = {
  className: '',
  scrollId: 'wrapper',
  pullDown: false,
  pullUp: false,
  data: [],
  children: () => null,
  onPullDown: () => new Promise(() => { }),
  onPullUp: () => new Promise(() => { }),
  scrollOptions: null,
  headerElement: <div style={{ height: '1px' }} />, // 某些时候better-scroll高度计算导致minScrollY为负值，加个默认子元素
  end: false,
};

// 下拉刷新和上拉加载文字显示的控制参数
const initState = {
  beforePullDown: true, // 是否在下拉前
  couldRefresh: false, // 下拉的阈值能否刷新数据
  isPullingDown: false, // 是否正在刷新
  isPullUpLoad: false, // 是否正在上拉加载数据
};

const BaseScrollList: React.FC<BaseScrollProps> = (props: BaseScrollProps) => {
  const {
    className,
    scrollId,
    children,
    data = [],
    scrollOptions,
    pullDown,
    pullUp,
    onPullDown,
    onPullUp,
    headerElement,
    end,
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const pullUpRef = useRef<HTMLDivElement>(null);

  const _this = useRef<{
    _scroll: BScrollProps | null; // 保存scroll对象
    _end: boolean;
  }>({
    _scroll: null,
    _end: false,
  }).current;
  const [scroll, setScroll] = useState<BScrollProps>();
  const [state, setState] = useState(initState);
  const [listEnd, setEnd] = useState<boolean>();
  const [showPullUp, setShowPullup] = useState<boolean>(false);

  useEffect(() => {
    setEnd(end);
    if (end) {
      _this._end = true;
    } else {
      _this._end = false;
    }
  }, [end]);

  useEffect(() => {
    if (pullDown) Bscroll.use(PullDown);
    if (pullUp) Bscroll.use(Pullup);
  }, [pullDown, pullUp]);

  // 刷新bs
  const refreshScroll = () => {
    const timer = window.requestAnimationFrame(() => {
      _this._scroll?.refresh();
      window.cancelAnimationFrame(timer);
    });
  };

  // 根据元素高度，判断是否展示上拉加载
  const jugeShow = () => {
    if (wrapperRef.current && pullUpRef.current) {
      const { clientHeight } = wrapperRef.current;
      const { offsetTop } = pullUpRef.current;
      if (clientHeight > offsetTop) {
        setShowPullup(false);
      } else {
        setShowPullup(true);
      }
    }
  };

  // 处理下拉事件
  const pullingDownHandler = async () => {
    setState({
      beforePullDown: false,
      couldRefresh: false,
      isPullingDown: true,
      isPullUpLoad: false,
    });
    // 模拟接口请求;
    const p = new Promise((resolve) => {
      const timer = setTimeout(() => {
        if (onPullDown) onPullDown();
        resolve(true);
        clearTimeout(timer);
      }, 1000);
    });
    await p;
    setState({
      beforePullDown: false,
      couldRefresh: false,
      isPullingDown: false,
      isPullUpLoad: false,
    });
    const timer = setTimeout(() => {
      if (_this._scroll?.finishPullDown) {
        _this._scroll.finishPullDown();
        const timerInit = setTimeout(() => {
          setState(initState);
          clearTimeout(timerInit);
        }, 500);
      }
      clearTimeout(timer);
    }, 800);
  };

  // 处理上拉事件
  const pullingUpHandler = async () => {
    setState({
      ...state,
      isPullUpLoad: true,
    });
    setShowPullup(true);
    if (_this._end) {
      setTimeout(() => {
        if (_this._scroll?.finishPullUp) {
          _this._scroll.finishPullUp();
          refreshScroll();
        }
        setState(initState);
        jugeShow();
      }, 1000);
      return;
    }
    // 模拟接口请求;
    const p = new Promise((resolve) => {
      const timer = setTimeout(() => {
        if (onPullUp) onPullUp();
        resolve(true);
        clearTimeout(timer);
      }, 1000);
    });
    await p;
    jugeShow();
    if (_this._scroll?.finishPullUp) {
      refreshScroll();
      _this._scroll.finishPullUp();
    }
    setTimeout(() => {
      setState(initState);
    }, 1200);
  };

  /**
   * 初始化 better-scroll 方法
   * */
  const initScroll = () => {
    const wrapper = document.getElementById(scrollId);
    // better-scroll基本配置
    let wrapperProps = defaultWrapper;
    if (pullDown && pullUp) {
      wrapperProps = defaultAllWrapper;
    }
    if (!pullUp && pullDown) {
      wrapperProps = defaultPullDownProps;
    }
    if (pullUp && !pullDown) {
      wrapperProps = defaultPullUpProps;
    }
    if (scrollOptions) {
      wrapperProps = scrollOptions;
    }
    if (wrapper) {
      const s = new Bscroll(wrapper, wrapperProps);
      _this._scroll = s;
      setScroll(s);
      // 滚动前重新计算bs高度
      _this._scroll.on('beforeScrollStart', () => {
        refreshScroll();
      });
      if (pullDown) {
        // 监听下拉事件
        _this._scroll.on('pullingDown', pullingDownHandler);
        // 当 bs 滚动到 pulldown 的 threshold 阈值区域之外时触发该事件
        _this._scroll.on('leaveThreshold', () => {
          setState({
            ...state,
            couldRefresh: true,
          });
        });
      }
      // 监听上拉事件
      if (pullUp) _this._scroll.on('pullingUp', pullingUpHandler);
      refreshScroll();
    }
  };

  // 销毁之前的bs实例
  const destroyScroll = () => {
    if (_this._scroll) {
      _this._scroll.destroy();
      _this._scroll = null;
    }
  };

  // 克隆函数,将每个子元素的props都赋予bs实例,这样子组件dom变化时可以控制bs的重新渲染
  const clone = () => {
    const res = React.Children.map(
      data.map(children) as React.ReactElement<MixProps<BScrollProps>>[],
      (ele: React.ReactElement<MixProps<BScrollProps>>) =>
        React.cloneElement(ele, {
          scroll,
        }),
    );
    const empty = <div className={px('empty')}>暂无数据</div>;
    return data.length > 0 ? res : empty;
  };

  useEffect(() => {
    if (pullDown) Bscroll.use(PullDown);
    if (pullUp) Bscroll.use(Pullup);
    initScroll();
    return () => {
      destroyScroll();
    };
  }, []);

  useEffect(() => {
    jugeShow();
    refreshScroll();
  }, [data]);

  return (
    <div id={scrollId} className={`${px('root')} ${className}`} ref={wrapperRef}>
      <div>
        {/* 下拉刷新的dom*/}
        <div className={px('pulldown-wrapper')} style={{ display: pullDown ? '' : 'none' }}>
          <div style={{ display: state.beforePullDown ? '' : 'none' }}>
            {!state.couldRefresh ? <span>下拉可以刷新</span> : <span>松开立即刷新</span>}
          </div>
          <div style={{ display: !state.beforePullDown ? '' : 'none' }}>
            <div style={{ display: state.isPullingDown ? '' : 'none' }}>
              <span>正在刷新...</span>
            </div>
            <div style={{ display: !state.isPullingDown ? '' : 'none' }}>
              <span>刷新成功</span>
            </div>
          </div>
        </div>
        {/* 列表头部元素(如果需要的话)*/}
        {headerElement}
        {/* 主体列表 */}
        {clone()}
        {/* 上拉加载的dom */}
        <div
          className={`${px('pullup-wrapper')}`}
          style={{
            display: pullUp ? '' : 'none',
            opacity: showPullUp && data.length > 0 ? '1' : '0',
          }}
          ref={pullUpRef}
        >
          <div style={{ display: !state.isPullUpLoad ? '' : 'none' }}>
            <span className="pullup-txt">上拉加载</span>
          </div>
          <div style={{ display: state.isPullUpLoad && !listEnd ? '' : 'none' }}>
            <span className="pullup-txt">正在加载...</span>
          </div>
          <div style={{ display: state.isPullUpLoad && listEnd ? '' : 'none' }}>
            <span className="pullup-txt">已经到底啦</span>
          </div>
        </div>
      </div>
    </div>
  );
};

BaseScrollList.defaultProps = defaultProps;

export default BaseScrollList;
