import React from 'react'
import Icon from '../Icon'
import './RiseMenu.scss'

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
    <div className={`wrapper ${className}`}>
      <div className={`circle ${position === 'right' ? 'pos-r' : 'pos-l'}`}>
        <Icon className='plus-icon' name={menuIcon}></Icon>
        {menuItems.map((item: any, index: number) => {
          return <div className='social' key={index}>{item}</div>
        })}
      </div>
    </div>
  )
}

export default RiseMenu
