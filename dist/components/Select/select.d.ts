import React, { FC } from "react";
export interface SelectProps {
    /**指定默认选中的条目	 可以是是字符串或者字符串数组*/
    defaultValue?: string | string[];
    placeholder?: string;
    disabled?: boolean;
    /** 是否支持多选*/
    multiple?: boolean;
    name?: string;
    /**选中值发生变化时触发 */
    onChange?: ((selectedValue: string, selectedValues: string[]) => void);
    /**下拉框出现/隐藏时触发 */
    onVisibleChange?: ((visible: boolean) => void);
    children?: React.ReactNode;
}
export interface ISelectContext {
    onSelect?: (value: string, isSelected?: boolean) => void;
    selectedValues: string[];
    multiple?: boolean;
}
export declare const SelectContext: React.Context<ISelectContext>;
export declare const Select: FC<SelectProps>;
export default Select;
