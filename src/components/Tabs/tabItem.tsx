import React, { ReactNode } from "react";
import classNames from "classnames";

export interface TabItemProps {
  label : string | React.ReactElement;
  className ?: string;
  disabled ?:  boolean;
  children ?: React.ReactNode;
  style ?: React.CSSProperties;
}

const TabItem: React.FC<TabItemProps> = (props: TabItemProps) => {
  const { label, children, disabled, className, style } = props;
  const classes = classNames("tab-panel", className);
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  )
}

TabItem.displayName = "TabItem"
export default TabItem;