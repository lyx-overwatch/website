import React from 'react';
import './Tab.less';

const prefix = 'lyx-website-tab';

const Tab = (props: any) => {
  const { tabItems = [], headerClass = '', containClass = '' } = props;

  return (
    <div className={`${prefix}-root`}>
      {tabItems.length > 0 &&
        tabItems.map((_: any, index: number) => {
          const cur = index + 1;
          return (
            <React.Fragment key={cur}>
              <input
                type="radio"
                id={`tab${cur}`}
                name="tab"
                defaultChecked={index === 0}
                key={`radio-${cur}`}
              />
            </React.Fragment>
          );
        })}
      <div className={`${prefix}-header ${headerClass}`}>
        {tabItems.length > 0 &&
          tabItems.map((item: any, index: number) => {
            const { text } = item;
            const cur = index + 1;
            return (
              <div key={cur} className={`${prefix}-tab_item`}>
                <label htmlFor={`tab${cur}`} key={`label-${cur}`}>
                  {text}
                </label>
              </div>
            );
          })}
      </div>
      <div className={`${prefix}-container`}>
        {tabItems.length > 0 &&
          tabItems.map((item: any, index: number) => {
            const { content } = item;
            const cur = index + 1;
            return (
              <div
                className={`${prefix}-container-content ${containClass}`}
                id={`c${cur}`}
                key={cur}
              >
                {content}
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Tab;
