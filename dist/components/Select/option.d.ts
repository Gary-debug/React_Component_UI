import React, { FC } from "react";
export interface SelectOptionProps {
    index?: string;
    value: string;
    label?: string;
    disabled?: boolean;
    children?: React.ReactNode;
}
export declare const Option: FC<SelectOptionProps>;
export default Option;
