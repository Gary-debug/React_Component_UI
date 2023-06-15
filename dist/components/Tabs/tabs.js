import React, { useState, createContext } from "react";
import classNames from "classnames";
export var TabContext = createContext({ index: "0" });
var Tabs = function (props) {
    var defaultIndex = props.defaultIndex, className = props.className, onSelect = props.onSelect, type = props.type, children = props.children, style = props.style;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var handleClick = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var navClass = classNames("tabs-nav", {
        "nav-line": type === "line",
        "nav-card": type === 'card',
    });
    var renderNavLinks = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var _a = childElement.props, label = _a.label, disabled = _a.disabled;
            var classes = classNames("tabs-nav-item", {
                "is-active": currentActive === index.toString(),
                "disabled": disabled,
            });
            return (React.createElement("li", { className: classes, key: "nav-item-".concat(index), onClick: function (e) {
                    handleClick(index.toString());
                } }, label));
        });
    };
    var renderContent = function () {
        return React.Children.map(children, function (child, index) {
            if (index.toString() === currentActive) {
                return child;
            }
        });
    };
    return (React.createElement("div", { className: className, "data-testid": "test-tabs" },
        React.createElement("ul", { className: navClass }, renderNavLinks()),
        React.createElement("div", { className: "tabs-content" }, renderContent())));
};
Tabs.defaultProps = {
    type: 'line',
    defaultIndex: "0",
};
export default Tabs;
