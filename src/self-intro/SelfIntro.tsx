import React from "react";
import FlashPoint from "@/components/BackGround/FlashPoint";
// import PorticlePoint from "@/components/BackGround/PorticlePoint";
import ProfileCard from './components/profile-card';
import "./SelfIntro.scss";

const SelfIntro = () => {
  return (
    <>
      {/* <PorticlePoint></PorticlePoint> */}
      <FlashPoint>
        <ProfileCard></ProfileCard>
      </FlashPoint>
    </>
  );
};

export default SelfIntro;
