import React, { useState, createContext } from "react";
import classNames from "classnames";
import { TabItemProps } from "./tabItem";

type selectCallBack = (selectedIndex: string) => void
type TabsType = 'line' | 'card'
export interface TabsProps {
  defaultIndex ?: string;
  className ?: string;
  onSelect ?: selectCallBack;
  type ?: TabsType;
  children ?: React.ReactNode;
  style ?: React.CSSProperties;
}

interface ITabContext {
  index: string;
  onSelect ?: selectCallBack;
  type ?: TabsType;
}

export const TabContext = createContext<ITabContext>({ index: "0" });

const Tabs: React.FC<TabsProps> = (props: TabsProps) => {
  const {defaultIndex, className, onSelect, type, children, style} = props;
  const [ currentActive, setActive ] = useState(defaultIndex);
  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  }
  const navClass = classNames("tabs-nav", {
    "nav-line": type === "line",
    "nav-card": type === 'card',
  })
  const renderNavLinks = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabItemProps>
      const { label, disabled } = childElement.props;
      const classes = classNames("tabs-nav-item", {
        "is-active": currentActive === index.toString(),
        "disabled": disabled,
      })
      return (
        <li
          className={classes}
          key={`nav-item-${index}`}
          onClick={(e) => {
            handleClick(index.toString())
          }}
        >
          {label}
        </li>
      )
    })
  }
  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      if(index.toString() === currentActive) {
        return child
      }
    })
  }
  return (
    <div className={className} data-testid="test-tabs">
      <ul className={navClass}>{renderNavLinks()}</ul>
      <div className="tabs-content">{renderContent()}</div>
    </div>
  )
}

Tabs.defaultProps = {
  type : 'line',
  defaultIndex: "0",
}
export default Tabs;