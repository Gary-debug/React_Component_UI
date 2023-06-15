var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { createContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Input from "../Input/input";
import Icon from "../Icon/icon";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from "../Transition/transition";
export var SelectContext = createContext({ selectedValues: [] });
export var Select = function (props) {
    var defaultValue = props.defaultValue, placeholder = props.placeholder, multiple = props.multiple, name = props.name, disabled = props.disabled, onChange = props.onChange, onVisibleChange = props.onVisibleChange, children = props.children, restProps = __rest(props, ["defaultValue", "placeholder", "multiple", "name", "disabled", "onChange", "onVisibleChange", "children"]);
    var input = useRef(null);
    var containerRef = useRef(null);
    var containerWidth = useRef(0);
    var _a = useState(false), menuOpen = _a[0], setMenuOpen = _a[1];
    var _b = useState(typeof defaultValue === 'string' ? defaultValue : ''), value = _b[0], setValue = _b[1];
    var _c = useState(Array.isArray(defaultValue) ? defaultValue : []), selectedValues = _c[0], setSelectedValues = _c[1];
    var handleClick = function (e) {
        e.preventDefault();
        if (!disabled) {
            setMenuOpen(!menuOpen);
            if (onVisibleChange) {
                onVisibleChange(!menuOpen);
            }
        }
    };
    var handleOptionClick = function (value, isSelected) {
        if (!multiple) {
            setMenuOpen(false);
            setValue(value);
            if (onVisibleChange) {
                onVisibleChange(false);
            }
        }
        else {
            setValue('');
        }
        var updatedValues = [value];
        if (multiple) {
            updatedValues = isSelected ? selectedValues.filter(function (v) { return v !== value; }) : __spreadArray(__spreadArray([], selectedValues, true), [value], false);
            setSelectedValues(updatedValues);
        }
        if (onChange) {
            onChange(value, updatedValues);
        }
    };
    useEffect(function () {
        if (input.current) {
            input.current.focus();
            if (multiple && selectedValues.length > 0) {
                input.current.placeholder = '';
            }
            else {
                if (placeholder)
                    input.current.placeholder = placeholder;
            }
        }
    }, [selectedValues, multiple, placeholder]);
    useEffect(function () {
        if (containerRef.current) {
            containerWidth.current = containerRef.current.getBoundingClientRect().width;
        }
    });
    useClickOutside(containerRef, function () {
        setMenuOpen(false);
        if (onVisibleChange && menuOpen) {
            onVisibleChange(false);
        }
    });
    var passedContext = {
        onSelect: handleOptionClick,
        selectedValues: selectedValues,
        multiple: multiple,
    };
    var generateOptions = function () {
        return React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === 'Option') {
                return React.cloneElement(childElement, {
                    index: "select-".concat(i)
                });
            }
            else {
                console.error("warning: Select has a child which is not a Option Component");
            }
        });
    };
    var cnames = classNames('select', {
        'menu-is-open': menuOpen,
        'is-disabled': disabled,
        'is-multiple': multiple,
    });
    return (React.createElement("div", { className: cnames, ref: containerRef },
        React.createElement("div", { className: "select-input", onClick: handleClick },
            React.createElement(Input, { ref: input, placeholder: placeholder, value: value, readOnly: true, icon: "angle-down", disabled: disabled, name: name })),
        React.createElement(SelectContext.Provider, { value: passedContext },
            React.createElement(Transition, { in: menuOpen, animation: "zoom-in-top", timeout: 300 },
                React.createElement("ul", { className: "select-dropdown" }, generateOptions()))),
        multiple &&
            React.createElement("div", { className: "selected-tags", style: { maxWidth: containerWidth.current - 12 } }, selectedValues.map(function (value, index) {
                return (React.createElement("span", { className: "tag", key: "tag-".concat(index) },
                    value,
                    React.createElement(Icon, { icon: "times", onClick: function () { handleOptionClick(value, true); } })));
            }))));
};
Select.defaultProps = {
    name: 'select',
    placeholder: '请选择'
};
export default Select;
