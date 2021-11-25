import React, { useState, useEffect } from 'react';
import pc from "prefix-classnames";
import ScrollList from '@/components/ScrollList';
import { globalCountries, getTypedCountries } from './constant';
import { BScrollProps } from '@/components/BaseScrollList/constant';
import './CompCtyList.scss';

const cx = pc('lyx-website-comp-ctylist');
const data = getTypedCountries(globalCountries);

const CompCtyList = (props: any) => {
  const { letterHeight = 40, itemHeight = 40 } = props;
  // 记录国家索引元素距离顶部的距离
  const [scrollTop, setTop] = useState(0);
  // 字母索引表
  const [letters, setLetters] = useState<any>([]);
  // 当前字母
  const [letter, setLetter] = useState('A');
  // 滚动插件
  const [scroll, setScroll] = useState<BScrollProps>();

  useEffect(() => {
    const res = data.map((item) => {
      return item[0];
    })
    setLetters(res);
  }, []);

  useEffect(() => {
    if (scroll) {
      scroll.on('beforeScrollStart', () => {
        setLetter('NULL');
      })
    }
  }, [scroll])

  const queryCountryData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          list: data
        })
      }, 1000);
    })
  };

  const scrollToLetter = (index: number) => {
    if (scroll) {
      var le = letters[index];
      setLetter(le);
      var itemNumber = 0;
      if (index === 0) {
        scroll.scrollTo(0, 0);
        return;
      }
      for (let i = 0; i < index; i++) {
        itemNumber += data[i][1].length;
      }
      var allItemHeight = itemNumber * itemHeight;
      var len = allItemHeight + index * letterHeight;
      scroll.scrollTo(0, -len);
    }
  };

  const countryScrollStart = (e: any) => {
    e.persist();
    if (scroll) {
      // if (scrollInit) {
      //   scroll.scrollTo(0, 0);
      // }
      scroll.refresh();
    }
  };

  const countryScrollMove = (e: any) => {
    e.persist();
    if (!e.touches || !e.touches[0]) return;
    const len = Math.floor(e.touches[0].clientY - scrollTop);
    var index = Math.floor(len / 16);
    if (index < 0) {
      index = 0;
    }
    if (index > letters.length - 1) {
      index = letters.length - 1;
    }
    scrollToLetter(index);
  };

  const countryScrollEnd = (e: any) => {
    e.persist();
    if (!e.changedTouches || !e.changedTouches[0]) return;
    const len = Math.floor(e.changedTouches[0].clientY - scrollTop);
    var index = Math.floor(len / 16);
    if (index < 0) {
      index = 0;
    }
    if (index > 25) {
      index = 25;
    }
    scrollToLetter(index);
    // setInit(false);
  };

  return (
    <div className={cx('root')}>
      <div className={cx('scroll-wrapper')}>
        <ScrollList
          scrollId="ctyScroll"
          asyncFunction={queryCountryData}
          onInstance={(s) => setScroll(s)}
        >
          {
            data => {
              const [letter, countries] = data;
              return (
                <div className={cx('item-wrapper')}>
                  <div className={cx('letter')}>{letter}</div>
                  <div>
                    {
                      countries.map((country: any, index: number) => {
                        const { code, cn } = country;
                        return (
                          <div className={cx('item')} key={index}>
                            <span className={cx('item-code')}>{code}</span>
                            <span className={cx('item-cn')}>{cn}</span>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            }
          }
        </ScrollList>
      </div>
      <div
        className={cx('countryscroll')}
        ref={(r) => {
          if (!r || scrollTop > 0) return;
          var top = r.getBoundingClientRect().top;
          setTop(top);
        }}
        onTouchStart={(e) => countryScrollStart(e)}
        onTouchMove={(e) => countryScrollMove(e)}
        onTouchEnd={(e) => countryScrollEnd(e)}
      >
        <div className={cx('countryscrollmain')}>
          {letters.map((curLetter: any, index: any) => {
            return (
              <div
                key={index}
                className={
                  letter === curLetter
                    ? cx('countryscrollmainchoose')
                    : cx('countryscrollmainnormal')
                }
              >
                {curLetter}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
};

export default CompCtyList;