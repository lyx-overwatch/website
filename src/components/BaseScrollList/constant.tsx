export type ScrollOptions = {
  disableTouch: boolean;
  click: boolean;
  scrollX?: boolean;
  scrollY: boolean;
  useTransition?: boolean;
  stopPropagation?: boolean;
  mouseWheel?: unknown;
  pullDownRefresh?:
    | boolean
    | {
        threshold?: number;
        stop?: number;
      };
  pullUpLoad?:
    | boolean
    | {
        threshold?: number;
      };
};

export interface BScrollProps {
  el?: HTMLElement;
  options?: ScrollOptions;
  x: number;
  y: number;
  maxScrollX: number;
  maxScrollY: number;
  refresh: () => void;
  scrollTo: (x: number, y: number) => void;
  destroy: () => void;
  finishPullDown?: () => void;
  finishPullUp?: () => void;
  on: (event: string, handler: () => Promise<void> | void) => void;
}

// 具体配置参数可见 better-scroll github文档
export const defaultWrapper = {
  click: true,
  scrollY: true,
  disableTouch: false, // 防止第一次渲染无法滚动的问题,
};

export const defaultPullDownProps = {
  ...defaultWrapper,
  // 下拉刷新配置
  pullDownRefresh: {
    threshold: 60,
    stop: 40,
  },
};

export const defaultPullUpProps = {
  ...defaultWrapper,
  // 上拉加载配置
  pullUpLoad: {
    threshold: -20,
  },
};

export const defaultAllWrapper = {
  ...defaultWrapper,
  pullDownRefresh: {
    threshold: 60,
    stop: 40,
  },
  pullUpLoad: {
    threshold: -20,
  },
};
