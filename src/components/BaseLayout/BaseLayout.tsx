import React, { useContext, useEffect } from "react";
import MainMenu from "@/components/MainMenu";
import Icon from '@/components/Basic/Icon';
import { useHistory } from 'react-router-dom';
import pc from "prefix-classnames";
import { Context } from "@/context";
import './BaseLayout.scss';

const px = pc('lyx-website-baselayout')

const BaseLayout = (props: any) => {
  const { children, className = '', goBack = false } = props;
  const { router } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    if(!router) return
    router.initRouter(history).then(() => {
      router.beforePushState((url, next) => {
        if(url === '/self-comp' ) {
          setTimeout(() => {
            next();
          }, 1000);
        } else {
          next();
        }
      });
    })
    return () => router?.removeHandler();
  }, [])


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