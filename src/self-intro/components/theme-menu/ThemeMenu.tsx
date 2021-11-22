import React, { useState } from 'react';
import RiseMenu from '@/components/Basic/RiseMenu';
import changeColors from '@/theme/css-variable';
import './ThemeMenu.scss';

const ThemeMenu = () => {

  const [menuItems] = useState([
    <div className="theme-card purple" onClick={() => changeColors('purple')}></div>,
    <div className="theme-card gray" onClick={() => changeColors('gray')}></div>,
    <div className="theme-card blue" onClick={() => changeColors('blue')}></div>,
  ]);

  return (
    <RiseMenu menuItems={menuItems} className="theme-menu" position="left" menuIcon="icon-beijingyanse">
    </RiseMenu >
  )
};

export default ThemeMenu;