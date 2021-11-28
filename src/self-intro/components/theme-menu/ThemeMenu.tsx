import React, { useState, useContext } from 'react';
import RiseMenu from '@/components/Basic/RiseMenu';
import changeColors from '@/theme/css-variable';
import { Context } from '@/context';
import pc from "prefix-classnames";
import './ThemeMenu.scss';

const px = pc('lyx-website-thememenu');

const ThemeMenu = () => {
  const { showMenus } = useContext(Context);

  const [menuItems] = useState([
    <div className={`${px('root-card')} ${px('root-purple')}`} onClick={() => changeColors('purple')}></div>,
    <div className={`${px('root-card')} ${px('root-gray')}`} onClick={() => changeColors('gray')}></div >,
    <div className={`${px('root-card')} ${px('root-blue')}`} onClick={() => changeColors('blue')}></div >,
  ]);

  return (
    <>
      <div style={{ visibility: showMenus ? 'visible' : 'hidden' }}>
        <RiseMenu menuItems={menuItems} className={px('root')} position="left" menuIcon="icon-beijingyanse">
        </RiseMenu >
      </div>
    </>

  )
};

export default ThemeMenu;