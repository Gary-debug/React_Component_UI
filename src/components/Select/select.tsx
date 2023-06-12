import React, { createContext, FC, FunctionComponentElement, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Input from "../Input/input";
import Icon from "../Icon/icon";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from "../Transition/transition";
import { SelectOptionProps } from "./option";

export interface SelectProps {
  /**指定默认选中的条目	 可以是是字符串或者字符串数组*/
  defaultValue ?: string | string[];
  placeholder ?: string;
  disabled ?: boolean;
   /** 是否支持多选*/
  multiple ?: boolean;
  name ?: string;
  /**选中值发生变化时触发 */
  onChange ?: ((selectedValue: string, selectedValues: string[]) => void);
  /**下拉框出现/隐藏时触发 */
  onVisibleChange ?: ((visible: boolean) => void);
  children ?: React.ReactNode;
}

export interface ISelectContext {
  onSelect ?: (value: string, isSelected ?: boolean) => void;
  selectedValues : string[];
  multiple ?: boolean;
}

export const SelectContext = createContext<ISelectContext>({ selectedValues: [] })

export const Select: FC<SelectProps> = (props) => {
  const {
    defaultValue,
    placeholder,
    multiple,
    name,
    disabled,
    onChange,
    onVisibleChange,
    children,
    ...restProps
  } = props;
  const input = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLInputElement>(null)
  const containerWidth = useRef(0)
  const [ menuOpen, setMenuOpen ] = useState(false)
  const [ value, setValue] = useState(typeof defaultValue === 'string' ? defaultValue : '')
  const [ selectedValues, setSelectedValues ] = useState<string[]>(Array.isArray(defaultValue) ? defaultValue : [])
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!disabled) {
      setMenuOpen(!menuOpen)
      if (onVisibleChange) {
        onVisibleChange(!menuOpen)
      }
    }
  }
  const handleOptionClick = (value: string, isSelected ?: boolean) => {
    if (!multiple) {
      setMenuOpen(false)
      setValue(value)
      if (onVisibleChange) {
        onVisibleChange(false)
      }
    } else {
      setValue('')
    }
    let updatedValues = [value]
    if (multiple) {
      updatedValues = isSelected ? selectedValues.filter((v) => v !==value) : [...selectedValues, value]
      setSelectedValues(updatedValues)
    }
    if (onChange) {
      onChange(value, updatedValues)
    }
  }

  useEffect(() => {
    if (input.current) {
      input.current.focus()
      if (multiple && selectedValues.length>0) {
        input.current.placeholder = ''
      } else {
        if (placeholder)
          input.current.placeholder = placeholder
      }
    }
  }, [selectedValues, multiple, placeholder])
  useEffect(() => {
    if (containerRef.current) {
      containerWidth.current = containerRef.current.getBoundingClientRect().width
    }
  })
  useClickOutside(containerRef, () => {
    setMenuOpen(false)
    if (onVisibleChange && menuOpen) {
      onVisibleChange(false)
    }
  })

  const passedContext: ISelectContext = {
    onSelect : handleOptionClick,
    selectedValues: selectedValues,
    multiple: multiple,
  }
  const generateOptions = () => {
    return React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<SelectOptionProps>
      if (childElement.type.displayName === 'Option') {
        return React.cloneElement(childElement, {
          index: `select-${i}`
        })
      } else {
        console.error("warning: Select has a child which is not a Option Component")
      }
    })
  }
  const cnames = classNames('select', {
    'menu-is-open': menuOpen,
    'is-disabled': disabled,
    'is-multiple': multiple,
  })
  return (
    <div className={cnames} ref={containerRef}>
      <div className="select-input" onClick={handleClick}>
        <Input
          ref={input}
          placeholder={placeholder}
          value={value}
          readOnly
          icon="angle-down"
          disabled={disabled}
          name={name} 
        />
      </div>
      <SelectContext.Provider value={passedContext}>
        <Transition
          in={menuOpen}
          animation="zoom-in-top"
          timeout={300}
        >
          <ul className="select-dropdown">
            {generateOptions()}
          </ul>
        </Transition>
      </SelectContext.Provider>
      {multiple && 
        <div className="selected-tags" style={{ maxWidth: containerWidth.current-12 }} >
          {
          selectedValues.map((value, index) => {
            return (
              <span className="tag" key={`tag-${index}`}>
                {value}
                <Icon icon="times" onClick={() => {handleOptionClick(value, true)}} />
              </span>
            )
          })
          }
        </div>
    }
    </div>
  )
}

Select.defaultProps = {
  name: 'select',
  placeholder: '请选择'
}

export default Select;