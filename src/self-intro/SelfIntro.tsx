import React, { useEffect, useState } from "react";
import FlashPoint from "@/components/BackGround/FlashPoint";
// import PorticlePoint from "@/components/BackGround/PorticlePoint";
import ProfileCard from './components/profile-card';
import IntroCard from "./components/intro-card";
import BaseLayout from "@/components/BaseLayout";
import ThemeMenu from "./components/theme-menu";
import BuuletChat from './components/buulet-chat';
import bg from '@/assets/images/bg.jpg'
import profile from "@/assets/images/profile.jpg";
import "./SelfIntro.scss";

const SelfIntro = () => {
  const [loaded, setLoaded] = useState(false);
  const [bgLoad, setBgLoad] = useState(false);
  const [profileLoad, setProfileLoad] = useState(false);

  useEffect(() => {
    const bgImg = new Image();
    const profileImg = new Image();
    bgImg.src = bg;
    profileImg.src = profile;
    bgImg.onload = () => {
      setBgLoad(true);
    }
    profileImg.onload = () => {
      setProfileLoad(true);
    }
  }, []);

  useEffect(() => {
    if (bgLoad && profileLoad) {
      setLoaded(true);
    }
  }, [bgLoad, profileLoad])

  return (
    <BaseLayout className="self-intro">
      {/* <PorticlePoint></PorticlePoint> */}
      <FlashPoint>
        {
          loaded &&
          <>
            <div className="background">
              <img src={bg}></img>
            </div>
            <ProfileCard proFileSrc={profile}></ProfileCard>
            <IntroCard></IntroCard>
            <ThemeMenu></ThemeMenu>
            <BuuletChat></BuuletChat>
          </>
        }
      </FlashPoint>
    </BaseLayout>
  );
};

export default SelfIntro;
