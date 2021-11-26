import React from "react";
import pc from 'prefix-classnames';
import BaseLayout from "@/components/BaseLayout";
import Tab from "@/components/Basic/Tab";
import './CompTab.scss';

const px = pc('lyx-website-comptab');

const tabItems = [
  {
    text: 'tab1',
    content: (<div className={px('tab1')}>我是tab1的内容content1</div>)
  },
  {
    text: 'tab2',
    content: (<div className={px('tab2')}>我是tab2的内容content2</div>)
  },
]

const CompTab = () => {
  return (
    <BaseLayout className={px('root')} goBack>
      <Tab tabItems={tabItems} headerClass={px(('header'))} containClass={px('contain')}></Tab>
    </BaseLayout>
  )
};

export default CompTab;