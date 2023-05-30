import React, { useState } from "react";
import classNames from "classnames";
import Transition from "../Transition/transition";
import Icon from "../Icon/icon";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export interface BaseAlertProps {
  className ?: string;
  title ?: string;
  description ?: string;
  type ?: 'success' | 'default' | 'danger' | 'warning';
  afterClose ?: () => void;
  closable ?: boolean;
  children ?: React.ReactNode;
}

const Alert: React.FC<BaseAlertProps> = (props: BaseAlertProps) => {
  const {
    type,
    description,
    title,
    closable,
    className,
    afterClose
  } = props
  // alert, alert-primary
  const classes = classNames('alert', className, {
    [`alert-${type}`]: type,
  })
  const [isShow, setIsShow] = useState<boolean>(true);
  const handleOnClick = () => {
    afterClose && afterClose()
    return setIsShow(false)
  }
  return (
    <Transition
      in={isShow}
      timeout={500}
      animation="zoom-in-top"
    >
      <div className={classes}>
        {/* {closable && <div className="close" onClick={handleOnClick}>X</div>} */}
        <div className="title">{title}</div>
        <div className="description">{description}</div>
        <Icon className="alert-close-icon" onClick={handleOnClick} icon={faXmark} style={{ display: closable ? "block" : "none" }} />
      </div>
    </Transition>

  )
}

Alert.defaultProps = {
  type: 'default',
  closable: true
}

export default Alert;