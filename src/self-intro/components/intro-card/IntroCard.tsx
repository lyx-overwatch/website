import React from 'react';
import { skills, intro } from './constant';
import './IntroCard.scss';

const IntroCard = () => {
  return (
    <div className='intro-card'>
      <div className='skill'>
        {skills.map((item, index) => {
          const { icon } = item
          return (
            <div key={index} className='skill-item'>
              <div className='skill-icons'>
                <i className={`iconfont ${icon}`}></i>
              </div>
            </div>
          )
        })}
      </div>
      <div className="intro" dangerouslySetInnerHTML={{ __html: intro }}>
      </div>
    </div >
  )
}

export default IntroCard
