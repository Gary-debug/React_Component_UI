import React, { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from "react";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon/icon";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'>{
  disabled ?: boolean;
  size ?: 'large' | 'small';
  icon ?: IconProp;
  prepend ?: string | ReactElement;
  append ?: string | ReactElement;
  children ?: React.ReactNode;
  onChange ?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = (props) => {
  const { disabled, size, icon, prepend, append, style, children, ...restProps } = props;
  const cnames = classNames('input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend,

  })
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if('value' in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }
  return (
    // 根据属性判断是否要添加特定的节点
    <div className={cnames} style={style}>
      {prepend && <div className="input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}></Icon></div>}
      <input className="input-inner" disabled={disabled} {...restProps} />
      {append && <div className="input-group-append">{append}</div>}
    </div>
  )
}

export default Input;