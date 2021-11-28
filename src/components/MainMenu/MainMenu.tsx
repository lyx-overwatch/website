import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RiseMenu from '@/components/Basic/RiseMenu';
import Icon from '@/components/Basic/Icon';
import { Context } from '@/context';
import pc from "prefix-classnames";
import './MainMenu.scss';

const px = pc('lyx-website-mainmenu');

const MainMenu = () => {
  const histroy = useHistory();
  const { showMenus, imgLoaded } = useContext(Context);
  const [noImgLoad, setNoImg] = useState<boolean>(false);

  useEffect(() => {
    const { location } = histroy;
    const { pathname } = location;
    if (pathname !== '/') {
      setNoImg(true);
    }
  }, [])

  const [menuItems] = useState([
    <Icon name="icon-zhuye" onClick={() => histroy.push('/')}></Icon>,
    <Icon className={px('heart')} name="icon-icon2" onClick={() => histroy.push('/heart')}></Icon>,
    <Icon name="icon-cangku" onClick={() => histroy.push('/self-comp')}></Icon>
  ]);

  return (
    <div style={{ visibility: showMenus ? 'visible' : 'hidden' }}>
      {
        (imgLoaded || noImgLoad)
          ?
          (<RiseMenu menuItems={menuItems}>
          </RiseMenu>)
          : null
      }
    </div >
  )
};

export default MainMenu;