import React from "react";
import FlashPoint from "@/components/BackGround/FlashPoint";
// import PorticlePoint from "@/components/BackGround/PorticlePoint";
import ProfileCard from './components/profile-card';
import IntroCard from "./components/intro-card";
import BaseLayout from "@/components/BaseLayout";
import ThemeMenu from "./components/theme-menu";
import BuuletChat from './components/buulet-chat';
import "./SelfIntro.scss";

const SelfIntro = () => {
  return (
    <BaseLayout>
      {/* <PorticlePoint></PorticlePoint> */}
      <FlashPoint>
        <ProfileCard></ProfileCard>
        <IntroCard></IntroCard>
        <ThemeMenu></ThemeMenu>
        <BuuletChat></BuuletChat>
      </FlashPoint>
    </BaseLayout>
  );
};

export default SelfIntro;
