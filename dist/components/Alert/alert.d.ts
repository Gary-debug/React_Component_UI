import React from "react";
export interface BaseAlertProps {
    className?: string;
    title?: string;
    description?: string;
    type?: 'success' | 'default' | 'danger' | 'warning';
    afterClose?: () => void;
    closable?: boolean;
    children?: React.ReactNode;
}
declare const Alert: React.FC<BaseAlertProps>;
export default Alert;
