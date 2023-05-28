import React, { ReactNode } from "react";
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

type TransitionProps = CSSTransitionProps & {
  animation ?: AnimationName,
  children ?: ReactNode
}

const Transition: React.FC<TransitionProps> = (props) => {
  const {
    children,
    className,
    animation,
    ...restProps
  } = props
  return (
    <CSSTransition
      classNames={className? className: animation}
      {...restProps}
    >
      {<div>{children}</div>}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true
}

export default Transition;