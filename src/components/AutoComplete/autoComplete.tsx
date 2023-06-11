import React, {FC, useState, ChangeEvent, ReactElement, useEffect, KeyboardEvent, useRef} from "react";
import Input, {InputProps} from "../Input/input";
import classNames from "classnames";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from "../Transition/transition";

import "../../styles/index.scss";


interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect' | 'onChange'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  onChange?: (value: string) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, onChange, value, renderOption, ...restProps } = props
  const [ inputValue, setInputValue ] = useState(value as string)
  const [ suggestions, setSuggestions ] = useState<DataSourceType[]>([])
  const [ loading, setLoading] = useState(false)
  const [ showDropdown, setShowDropDown ] = useState(false)
  const [ highlightIndex, setHighlightIndex ] = useState(-1)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const debouncedValue = useDebounce(inputValue, 500)
  useClickOutside(componentRef, () => { setSuggestions([]) })

  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSuggestions(data)
          if (data.length>0) {
            setShowDropDown(true)
          }
        })
      } else {
          setSuggestions(results)
          if (results.length>0) {
            setShowDropDown(true)
          }
        }
    } else {
      setSuggestions([])
      setShowDropDown(false)
    }
    setHighlightIndex(-1)
  }, [debouncedValue, fetchSuggestions])
  const highlight = (index: number) => {
    if(index < 0) index = 0;
    if(index >= suggestions.length) {
      index = suggestions.length-1
    }
    setHighlightIndex(index)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode) {
      case 13:
        if(suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 38:
        highlight(highlightIndex-1)
        break
      case 40:
        highlight(highlightIndex+1)
        break
      case 27:
        // setSuggestions([])
        setShowDropDown(false)
        break
      default:
        break
      
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    if (onChange) {
      onChange(value)
    }
    triggerSearch.current = true
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    // setSuggestions([])
    setShowDropDown(false)
    if(onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExit={() => {
          setSuggestions([])
        }}
      >
      <ul className="suggestion-list">
        { loading && <div className="suggestions-loading-icon"> <Icon icon="spinner" spin /> </div>}
        {suggestions.map((item, index) => {
          const cnames = classNames('suggestion-item', {
            'item-highlighted': index === highlightIndex
          })
          return (
            <li key={index} className={cnames} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
      </Transition>
    )
  }
  return (
    <div className="auto-complete" ref={componentRef}>
      <Input
       value={inputValue}
       onChange={handleChange} 
       onKeyDown={handleKeyDown}
       {...restProps} 
       />
      {generateDropdown()}
    </div>
  )
}

export default AutoComplete;