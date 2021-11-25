import React, { useState } from "react";
import Tab from "@/components/MainMenu";
import Icon from '@/components/Basic/Icon';
import { Context } from './context';
import { useHistory } from 'react-router-dom';
import pc from "prefix-classnames";
import './BaseLayout.scss';

const px = pc('lyx-website-baselayout')

const BaseLayout = (props: any) => {
  const { children, className = '', goBack = false } = props;
  const [showMenus, setShow] = useState(true);
  const history = useHistory();

  return (
    <Context.Provider value={{ showMenus, changeMenuShow: setShow }}>
      <div className={`${px('root')} ${className}`}>
        {
          goBack &&
          <div className="base-layout-back">
            <Icon name="icon-shangyibu" className="back-icon" onClick={() => history.goBack()}></Icon>
          </div>
        }
        {
          !goBack &&
          <Tab></Tab>
        }
        {children}
      </div>
    </Context.Provider>
  )
};

export default BaseLayout;