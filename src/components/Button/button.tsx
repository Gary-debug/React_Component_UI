import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import classNames from "classnames";
import Icon from "../Icon/icon";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// export enum ButtonSize {
//   Large = 'large',
//   Small = 'small'
// }

// export enum ButtonType {
//   Primary = 'primary',
//   Default = 'default',
//   Danger = 'danger',
//   Link = 'link'
// }

interface BaseButtonProps {
  className ?: string;
  /**设置 Button 的禁用 */
  disabled ?: boolean;
  /**设置 Button 的尺寸 */
  size ?: 'large' | 'small';
  /**设置 Button 的类型 */
  btnType ?: 'primary' | 'default' | 'danger' | 'link';
  children ?: React.ReactNode;
  href ?: string;
  icon ?: React.FunctionComponentElement<IconProp>;
  loading ?: boolean;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

export const Button: FC<ButtonProps> = (props) => {
  const {
    btnType,
    className,
    disabled,
    size,
    children,
    href,
    icon,
    loading,
    ...restProps
  } = props
  // btn, btn-lg. btn-primary
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === 'link') && disabled || !!loading,
  })
  if (btnType === 'link' && href) {
    return (
      <a
        className={classes}
        href={href}
        {...restProps}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {loading ? <Icon icon="spinner" spin /> : icon}
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
  loading: false,
}

export default Button;