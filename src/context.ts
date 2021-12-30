import React, { Dispatch, SetStateAction } from 'react';
import type { RouterGuardProps } from './utils/routerGuard';

type ContextProps = {
  showMenus: boolean, 
  imgLoaded: boolean, 
  changeMenuShow: Dispatch<SetStateAction<boolean>> | (() => void);
  setImgLoad: Dispatch<SetStateAction<boolean>> | (() => void);
  router: null | RouterGuardProps;
}

export const Context = React.createContext<ContextProps>({
  showMenus: true, // 弹幕输入框聚焦时隐藏菜单,设为false
  imgLoaded: false, // 主页图片未加载时，隐藏菜单
  changeMenuShow: (() => null) as any,
  setImgLoad: (() => null) as any,
  router: null,
})