import React from 'react';
import { skills, intro } from './constant';
import Icon from '@/components/Basic/Icon';
import pc from "prefix-classnames";
import './IntroCard.scss';

const px = pc('lyx-website-introcard');

const IntroCard = () => {
  return (
    <div className={px('root')}>
      <div className={px('skill')}>
        {skills.map((item, index) => {
          const { icon } = item
          return (
            <div key={index} className={px('skill-item')}>
              <div className={px('skill-icons')}>
                <Icon name={icon}></Icon>
              </div>
            </div>
          )
        })}
      </div>
      <div className={px('intro')} dangerouslySetInnerHTML={{ __html: intro }}>
      </div>
      <div className={px('github')}>
        <Icon name="icon-github" onClick={() => window.location.href = 'https://github.com/lyx-overwatch/website'}></Icon>
      </div>
    </div >
  )
}

export default IntroCard
