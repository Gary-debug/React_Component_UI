import React, { ReactNode } from "react";
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';
export type TransitionProps = CSSTransitionProps & {
    animation?: AnimationName;
    children?: ReactNode;
};
declare const Transition: React.FC<TransitionProps>;
export default Transition;
