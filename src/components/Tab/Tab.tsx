import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RiseMenu from '@/components/Basic/RiseMenu';
import Icon from '@/components/Basic/Icon';
import { Context } from '@/components/BaseLayout/context';
import './Tab.scss';

const Tab = () => {
  const histroy = useHistory();
  const { showMenus } = useContext(Context);


  const [menuItems] = useState([
    <Icon name="icon-zhuye" onClick={() => histroy.push('/self')}></Icon>,
    <Icon className="heart" name="icon-icon2" onClick={() => histroy.push('/heart')}></Icon>,
    <Icon name="icon-github" onClick={() => window.location.href = 'https://github.com/lyx-overwatch/website'}></Icon>
  ]);

  return (
    <>
      <div style={{ visibility: showMenus ? 'visible' : 'hidden' }}>
        <RiseMenu menuItems={menuItems} className="tab-menu">
        </RiseMenu >
      </div>
    </>
  )
};

export default Tab;