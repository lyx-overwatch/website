import React from 'react';
import BaseLayout from "@/components/BaseLayout";
import CompCard from './components/comp-card';
import { compDatas } from './constant';
import pc from "prefix-classnames";
import './SelfComp.scss';

const px = pc('lyx-website-selfcomp');

const SelfComp = () => {
  return (
    <BaseLayout className={px('root')}>
      <h4>常用业务组件</h4>
      {
        compDatas.map((data, index) => {
          const { text, href } = data;
          return (
            <CompCard title={text} href={href} key={index}></CompCard>
          )
        })
      }
    </BaseLayout>
  )
};

export default SelfComp;