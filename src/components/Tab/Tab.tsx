import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import RiseMenu from '@/components/Basic/RiseMenu';
import Icon from '@/components/Basic/Icon';
import './Tab.scss';



const Tab = () => {
  const histroy = useHistory();

  const [menuItems] = useState([
    <Icon name="icon-zhuye" onClick={() => histroy.push('/self')}></Icon>,
    <Icon className="heart" name="icon-icon2" onClick={() => histroy.push('/heart')}></Icon>,
    <Icon name="icon-github" onClick={() => window.location.href = 'https://github.com/lyx-overwatch/website'}></Icon>
  ]);

  return (
    <RiseMenu menuItems={menuItems} className="tab-menu">
    </RiseMenu >
  )
};

export default Tab;