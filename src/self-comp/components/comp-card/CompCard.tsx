import React from 'react';
import Icon from '@/components/Basic/Icon';
import { useHistory } from 'react-router-dom';
import pc from "prefix-classnames";
import './CompCard.scss';

const px = pc('lyx-website-comp');

const CompCard = (props: any) => {
  const { title, href } = props;
  const history = useHistory();

  return (
    <div className={px('card')}>
      <div className={px('type')}>
        <Icon name="icon-fenlei-copy"></Icon>
      </div>
      {title}
      <div className={px('go')} onClick={() => {
        history.push(`/self-comp/${href}`);
      }}>
        <Icon name="icon-xiayibu"></Icon>
      </div>
    </div>
  )
};

export default CompCard;