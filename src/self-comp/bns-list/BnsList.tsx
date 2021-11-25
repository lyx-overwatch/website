import React from "react";
import BaseLayout from "@/components/BaseLayout";
import ScrollList from "@/components/ScrollList";
import { listData } from './constant'
import pc from "prefix-classnames";
import './BnsList.less';

const px = pc('lyx-website-bnslist');

const BnsList = () => {

  const queryData = () => {
    const data = {
      list: listData
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    })
  };

  return (
    <BaseLayout goBack className={px('root')}>
      <div className={px('scroll-wrapper')}>
        <ScrollList
          pullUp
          pullDown
          scrollId="bnsScroll"
          asyncFunction={queryData}>
          {
            data => {
              const { value } = data;
              return (
                <div className={px('scroll-card')}>{value}</div>
              )
            }
          }
        </ScrollList>
      </div >
    </BaseLayout >
  )
};

export default BnsList;