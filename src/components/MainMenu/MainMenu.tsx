import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RiseMenu from '@/components/Basic/RiseMenu';
import Icon from '@/components/Basic/Icon';
import { Context } from '@/components/BaseLayout/context';
import pc from "prefix-classnames";
import './MainMenu.scss';

const px = pc('lyx-website-mainmenu');

const Tab = () => {
  const histroy = useHistory();
  const { showMenus } = useContext(Context);


  const [menuItems] = useState([
    <Icon name="icon-zhuye" onClick={() => histroy.push('/self')}></Icon>,
    <Icon className={px('heart')} name="icon-icon2" onClick={() => histroy.push('/heart')}></Icon>,
    <Icon name="icon-cangku" onClick={() => histroy.push('/self-comp')}></Icon>
  ]);

  return (
    <div style={{ visibility: showMenus ? 'visible' : 'hidden' }}>
      <RiseMenu menuItems={menuItems}>
      </RiseMenu >
    </div>
  )
};

export default Tab;