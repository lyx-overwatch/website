import React, { useRef } from "react";
import BaseLayout from "@/components/BaseLayout";
import ScrollList from "@/components/ScrollList";
import { listData, getCurData } from './constant'
import pc from "prefix-classnames";
import './BnsList.less';

const px = pc('lyx-website-bnslist');

const BnsList = () => {
  const _this = useRef({ times: 0, limit: 2, reset: false }).current;

  const queryData = () => {
    if (_this.reset) {
      // 到底了
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            list: listData
          });
        }, 1000);
      });
    }
    if (_this.times > _this.limit) {
      // 到底了
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            list: []
          });
        }, 1000);
      });
    }
    const data = {
      list: getCurData(listData, _this.times)
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    })
  };

  const onInitSuccess = () => {
    _this.times += 1;
  }

  const beforePullDown = () => {
    _this.reset = true;
  }

  const onPullDownSuccess = () => {
    _this.times = 1;
    _this.reset = false;
  }

  const onPullUpSuccess = () => {
    _this.times += 1;
  }

  return (
    <BaseLayout goBack className={px('root')}>
      <div className={px('scroll-wrapper')}>
        <ScrollList
          pullUp
          pullDown
          scrollId="bnsScroll"
          asyncFunction={queryData}
          onInitSuccess={onInitSuccess}
          beforePullDown={beforePullDown}
          onPullDownSuccess={onPullDownSuccess}
          onPullUpSuccess={onPullUpSuccess}
        >
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