import React from "react";
import { cardLines } from "./constant";
import "./ProfileCard.scss";

const ProfileCard = (props: any) => {
  const { proFileSrc = '' } = props;
  return (
    <aside className="profile-card">
      <header>
        <img src={proFileSrc} />
      </header>
      <div className="profile-line">
        {cardLines.map((item, index) => {
          const { icon, text } = item;
          return (
            <div key={index} className="profile-item">
              <div className="profile-icons">
                <i
                  className={`iconfont ${icon} ${icon === "icon-xueli" ? "profile-icon-s" : "profile-icon"
                    }`}
                ></i>
              </div>
              <span className="profile-text">{text}</span>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default ProfileCard;
