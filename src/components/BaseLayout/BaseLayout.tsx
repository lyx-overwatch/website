import React from "react";
import MainMenu from "@/components/MainMenu";
import Icon from '@/components/Basic/Icon';
import { useHistory } from 'react-router-dom';
import pc from "prefix-classnames";
import './BaseLayout.scss';

const px = pc('lyx-website-baselayout')

const BaseLayout = (props: any) => {
  const { children, className = '', goBack = false } = props;

  const history = useHistory();

  return (
    <div className={`${px('root')} ${className}`}>
      {
        goBack &&
        <div className={px('root-back')}>
          <Icon name="icon-shangyibu" className="back-icon" onClick={() => history.goBack()}></Icon>
        </div>
      }
      {
        !goBack &&
        (<MainMenu></MainMenu>)
      }
      {children}
    </div>
  )
};

export default BaseLayout;