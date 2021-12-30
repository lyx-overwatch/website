import React from "react";
import BaseLayout from "@/components/BaseLayout";
import pc from 'prefix-classnames';
import RollingText from "@/components/Basic/RollingText";
import { textData } from './constant';
import './CompRolling.scss';

const px = pc('lyx-website-comprolling');

const CompRolling = () => {
  return (
    <BaseLayout className={px('root')} goBack>
      <div className={px('body')}>
        <RollingText array={textData} behindfix="lyx-website-rolling" containerClass={px('contain')} textClass={px('text')}></RollingText>
      </div>
    </BaseLayout>
  )
};

export default CompRolling;