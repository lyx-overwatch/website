import React, { useState } from "react";
import Tab from "@/components/Tab";
import { Context } from './context';
import './BaseLayout.scss';

const BaseLayout = (props: any) => {
  const { children, className = '' } = props;
  const [showMenus, setShow] = useState(true);

  return (
    <Context.Provider value={{ showMenus, changeMenuShow: setShow }}>
      <div className={`base-layout ${className}`}>
        <Tab></Tab>
        {children}
      </div>
    </Context.Provider>
  )
};

export default BaseLayout;