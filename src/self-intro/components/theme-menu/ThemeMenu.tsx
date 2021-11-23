import React, { useState, useContext } from 'react';
import RiseMenu from '@/components/Basic/RiseMenu';
import changeColors from '@/theme/css-variable';
import { Context } from '@/components/BaseLayout/context';
import './ThemeMenu.scss';

const ThemeMenu = () => {
  const { showMenus } = useContext(Context);

  const [menuItems] = useState([
    <div className="theme-card purple" onClick={() => changeColors('purple')}></div>,
    <div className="theme-card gray" onClick={() => changeColors('gray')}></div>,
    <div className="theme-card blue" onClick={() => changeColors('blue')}></div>,
  ]);

  return (
    <>
      <div style={{ visibility: showMenus ? 'visible' : 'hidden' }}>
        <RiseMenu menuItems={menuItems} className="theme-menu" position="left" menuIcon="icon-beijingyanse">
        </RiseMenu >
      </div>
    </>

  )
};

export default ThemeMenu;