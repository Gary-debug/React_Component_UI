import React from "react";
import classNames from "classnames";
var TabItem = function (props) {
    var label = props.label, children = props.children, disabled = props.disabled, className = props.className, style = props.style;
    var classes = classNames("tab-panel", className);
    return (React.createElement("div", { className: classes, style: style }, children));
};
TabItem.displayName = "TabItem";
export default TabItem;
