import React from "react";

interface IconProps {
  name: string;
  className?: string;
  onClick?: () => void;
}

const Icon = (props: IconProps) => {
  const { name, className = '', ...rest } = props;

  return (
    <i className={`iconfont ${name} ${className}`} {...rest}></i>
  )
};

export default Icon;