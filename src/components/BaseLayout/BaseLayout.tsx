import React, { useState } from "react";
import Tab from "@/components/Tab";
import { Context } from './context';
import './BaseLayout.scss';

const BaseLayout = (props: any) => {
  const { children } = props;
  const [showMenus, setShow] = useState(true);

  return (
    <Context.Provider value={{ showMenus, changeMenuShow: setShow }}>
      <Tab></Tab>
      {children}
    </Context.Provider>
  )
};

export default BaseLayout;