import { useHistory } from 'react-router-dom';

type RouterProps = {
  push: (url:string) => void;
  goBack: () =>void;
}

// 这边获取的router也可以是next/router，主要是获取到真正做路由跳转的对象
export const GetRouter = () => {
  const router = useHistory();
  return router;
};

export interface RouterGuardProps {
  url: string;
  router: null | RouterProps;
  handler: null | ((url: string, next: () => void) => void);
  handlerExector: null | (() => void);
  initRouter: (router: any) => Promise<any>;
  push: (url: string) => any | Promise<any>;
  beforePushState: (hanlder: (url: string, next: () => void) => void) => void;
  removeHandler: () => void;
  addHandlerExector: (callback: () => void) => void;
  removeHandlerExextor: () => void;
  next: () => void;
}

class RouterGuard {
  constructor() {
    this.url = '';
    this.router = null;
    this.handler = null;
    this.handlerExector = null;

    this.initRouter = this.initRouter.bind(this);
    this.next = this.next.bind(this);
    this.push = this.push.bind(this);
    this.changeState = this.changeState.bind(this);
    this.beforePushState = this.beforePushState.bind(this);
    this.removeHandler = this.removeHandler.bind(this);
    this.addHandlerExector = this.addHandlerExector.bind(this);
    this.removeHandlerExextor = this.removeHandlerExextor.bind(this);
  }

  url: string;
  router: null | RouterProps;
  handler: null | ((url: string, next: () => void) => void);
  handlerExector: null | (() => void);

  initRouter(router: RouterProps) {
    this.router = router;
    return new Promise((resolve) => {
      resolve(this.router);
    })
  }

  // 用法类似vuex的导航守卫的next，表示将要进行路由跳转或者执行添加的handlerExector
  next() {
    if (!this) return;
    if (this.url && this.router) {
      this.router.push(this.url);
      this.url = '';
    }
    if (this.handlerExector) {
      this.handlerExector();
      // 执行完要立马清除掉，否则会对其他调用next的方法产生影响
      this.removeHandlerExextor();
    }
  }

  push(url: string) {
    if(!this) return;
    this.url = url;
    this.removeHandlerExextor(); // 路由的跳转不需要执行额外的handlerExextor
    return this.changeState(url);
  }

  changeState(url: string) {
    if (!this) return;
    if (!this.handler) {
      return this.router ? this.router.push(url): () => undefined;
    } else {
      this.handler(url, this.next);
    }
  }
  // 添加路由跳转前的执行的方法
  beforePushState(handler: (url: string, next: () => void) => void) {
    if (!this) return;
    this.handler = handler;
  }

  removeHandler() {
    if(!this) return;
    this.handler = null;
  }

  // 如果有需要在next方法触发后再执行的方法，在这里添加
  // 比如有一个注销的操作：在一个弹窗出现后，点击确认后再执行注销；点击确认会执行next方法
  // 但是next仅仅做路由跳转的话无法满足，我们还需要注销，在这里加一个方法提供额外需要执行的函数，传入注销这个函数，交给handler去执行
  addHandlerExector(callback: () => void) {
    if(!this) return;
    this.handlerExector = callback;
  }

  removeHandlerExextor() {
    if(!this) return;
    this.handlerExector = null;
  }
}

export default RouterGuard;
