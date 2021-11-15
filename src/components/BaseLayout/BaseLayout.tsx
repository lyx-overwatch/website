import React from "react";
import Tab from "@/components/Tab";
import './BaseLayout.scss';

const BaseLayout = (props: any) => {
  const { children } = props;
  return (
    <>
      <Tab></Tab>
      {children}
    </>
  )
};

export default BaseLayout;