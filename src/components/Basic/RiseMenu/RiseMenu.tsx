import React from 'react'
import Icon from '../Icon'
import pc from "prefix-classnames";
import './RiseMenu.scss';

const px = pc('lyx-website-risemenu');

interface RiseMenuProps {
  menuItems: Array<React.ReactNode>
  menuIcon?: string
  children?: any
  className?: string;
  position?: string;
}

const RiseMenu = (props: RiseMenuProps) => {
  const { menuItems = [], menuIcon = 'icon-caidanguanli', className = '', position = "right" } = props;

  return (
    <div className={`${px('wrapper')} ${className}`}>
      <div className={`${px('circle')} ${px(position === 'right' ? 'pos-r' : 'pos-l')}`}>
        <Icon className={px('plus-icon')} name={menuIcon}></Icon>
        {menuItems.map((item: any, index: number) => {
          return <div className={px('social')} key={index}> {item}</div>
        })}
      </div>
    </div >
  )
}

export default RiseMenu
