import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
interface BaseButtonProps {
    className?: string;
    /**设置 Button 的禁用 */
    disabled?: boolean;
    /**设置 Button 的尺寸 */
    size?: 'large' | 'small';
    /**设置 Button 的类型 */
    btnType?: 'primary' | 'default' | 'danger' | 'link';
    children?: React.ReactNode;
    href?: string;
    icon?: React.FunctionComponentElement<IconProp>;
    loading?: boolean;
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
export declare const Button: FC<ButtonProps>;
export default Button;
