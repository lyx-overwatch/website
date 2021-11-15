import React from "react";
import FlashPoint from "@/components/BackGround/FlashPoint";
// import PorticlePoint from "@/components/BackGround/PorticlePoint";
import ProfileCard from './components/profile-card';
import BaseLayout from "@/components/BaseLayout";
import { skills } from './constant';
import "./SelfIntro.scss";

const SelfIntro = () => {
  return (
    <BaseLayout>
      {/* <PorticlePoint></PorticlePoint> */}
      <FlashPoint>
        <ProfileCard></ProfileCard>
        <div className='skill'>
          {skills.map((item, index) => {
            const { icon } = item;
            return (
              <div key={index} className="skill-item">
                <div className="skill-icons">
                  <i className={`iconfont ${icon}`}></i>
                </div>
              </div>
            );
          })}
        </div>
      </FlashPoint>
    </BaseLayout>
  );
};

export default SelfIntro;
