import React, { ReactElement, InputHTMLAttributes, ChangeEvent } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean;
    size?: 'large' | 'small';
    icon?: IconProp;
    prepend?: string | ReactElement;
    append?: string | ReactElement;
    children?: React.ReactNode;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export default Input;
