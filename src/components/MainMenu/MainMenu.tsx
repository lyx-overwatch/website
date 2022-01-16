import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from '@/components/Basic/Loading';
import RiseMenu from '@/components/Basic/RiseMenu';
import Icon from '@/components/Basic/Icon';
import { Context } from '@/context';
import pc from "prefix-classnames";
import './MainMenu.scss';

const px = pc('lyx-website-mainmenu');

const MainMenu = () => {
  const histroy = useHistory();
  const { router, showMenus, imgLoaded } = useContext(Context);
  const [noImgLoad, setNoImg] = useState<boolean>(false);
  const [toYso, setToYso] = useState(false);

  useEffect(() => {
    const { location } = histroy;
    const { pathname } = location;
    if (pathname !== '/') {
      setNoImg(true);
    }
  }, [])

  const [menuItems] = useState([
    <Icon name="icon-zhuye" onClick={() => router?.push('/')}></Icon>,
    <Icon className={px('heart')} name="icon-icon2" onClick={() => router?.push('/heart')}></Icon>,
    <Icon name="icon-cangku" onClick={() => {
      setToYso(true);
      window.location.href = "http://182.254.152.221/";
    }}></Icon>
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
      {
        toYso &&
        <div className={px('to-yso')}>
          <div className={px('text')}>
            <span>正在前往ysol组件库</span>
          </div>
          <Loading></Loading>
        </div>
      }
    </div >
  )
};

export default MainMenu;