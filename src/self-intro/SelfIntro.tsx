import React, { useEffect, useState, useContext } from "react";
import FlashPoint from "@/components/BackGround/FlashPoint";
import Loading from '@/components/Basic/Loading';
import ProfileCard from './components/profile-card';
import IntroCard from "./components/intro-card";
import BaseLayout from "@/components/BaseLayout";
import ThemeMenu from "./components/theme-menu";
import BuuletChat from './components/buulet-chat';
import bg from '@/assets/images/bg.jpg'
import profile from "@/assets/images/profile.jpg";
import { Context } from '@/context';
import pc from "prefix-classnames";
import "./SelfIntro.scss";

const px = pc('lyx-website-selfintro');

const SelfIntro = () => {
  const { setImgLoad } = useContext(Context);
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
      setImgLoad(true);
    }
  }, [bgLoad, profileLoad])

  return (
    <BaseLayout className={px('root')}>
      <FlashPoint>
        {
          loaded &&
          <>
            <div className={px('background')}>
              <img src={bg}></img>
            </div>
            <ProfileCard proFileSrc={profile}></ProfileCard>
            <IntroCard></IntroCard>
            <ThemeMenu></ThemeMenu>
            <BuuletChat></BuuletChat>
          </>
        }
        {
          !loaded &&
          <Loading></Loading>
        }
      </FlashPoint>
    </BaseLayout>
  );
};

export default SelfIntro;
