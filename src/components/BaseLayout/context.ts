import React from 'react';

export const Context = React.createContext({
  showMenus: true,
  changeMenuShow: (() => null) as any,
})