import React from "react";
import { cardLines } from "./constant";
import pc from "prefix-classnames";
import "./ProfileCard.scss";

const px = pc('lyx-website-profilecard');


const ProfileCard = (props: any) => {
  const { proFileSrc = '' } = props;
  return (
    <aside className={px('root')}>
      <header>
        <img src={proFileSrc} />
      </header>
      <div className={px('line')}>
        {cardLines.map((item, index) => {
          const { icon, text } = item;
          return (
            <div key={index} className={px('line-item')}>
              <div className={px('line-icons')}>
                <i className={`iconfont ${icon} ${px(icon === "icon-xueli" ? "line-icon-s" : "line-icon")}`}
                ></i>
              </div>
              <span className={px('line-text')}>{text}</span>
            </div>
          );
        })}
      </div>
    </aside >
  );
};

export default ProfileCard;
