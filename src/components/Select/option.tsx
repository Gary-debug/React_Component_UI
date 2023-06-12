import React, { FC, ReactNode, useContext } from "react";
import classNames from "classnames";
import Icon from "../Icon/icon";
import { SelectContext } from "./select";

export interface SelectOptionProps {
  index ?: string;
  value : string;
  label ?: string;
  disabled ?: boolean;
  children ?: React.ReactNode;
}

export const Option: FC<SelectOptionProps> = ({value, label, disabled, children, index}) => {
  const { onSelect, selectedValues, multiple } = useContext(SelectContext)
  const isSelected = selectedValues.includes(value)
  const cnames = classNames('select-item', {
    'is-disabled': disabled,
    'is-selected': isSelected,
  })
  const hadnleClick = (e: React.MouseEvent, value: string, isSelected: boolean) => {
    e.preventDefault()
    if (onSelect && !disabled) {
      onSelect(value, isSelected)
    }
  }
  return (
    <li key={index} className={cnames} onClick={(e) => {hadnleClick(e, value, isSelected)}}>
      {children || (label ? label : value)}
      {multiple && isSelected && <Icon icon="check" />}
    </li>
  )
}

Option.displayName = 'Option'
export default Option;