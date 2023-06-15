import React, { useState } from "react";
import classNames from "classnames";
import Transition from "../Transition/transition";
import Icon from "../Icon/icon";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
var Alert = function (props) {
    var _a;
    var type = props.type, description = props.description, title = props.title, closable = props.closable, className = props.className, afterClose = props.afterClose;
    // alert, alert-primary
    var classes = classNames('alert', className, (_a = {},
        _a["alert-".concat(type)] = type,
        _a));
    var _b = useState(true), isShow = _b[0], setIsShow = _b[1];
    var handleOnClick = function () {
        afterClose && afterClose();
        return setIsShow(false);
    };
    return (React.createElement(Transition, { in: isShow, timeout: 500, animation: "zoom-in-top" },
        React.createElement("div", { className: classes },
            React.createElement("div", { className: "title" }, title),
            React.createElement("div", { className: "description" }, description),
            React.createElement(Icon, { className: "alert-close-icon", onClick: handleOnClick, icon: faXmark, style: { display: closable ? "block" : "none" } }))));
};
Alert.defaultProps = {
    type: 'default',
    closable: true
};
export default Alert;
