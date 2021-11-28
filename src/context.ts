import React from 'react';

export const Context = React.createContext({
  showMenus: true, // 弹幕输入框聚焦时隐藏菜单,设为false
  imgLoaded: false, // 主页图片未加载时，隐藏菜单
  changeMenuShow: (() => null) as any,
  setImgLoad: (() => null) as any,
})