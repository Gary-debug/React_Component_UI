import React from "react";
export interface TabItemProps {
    label: string | React.ReactElement;
    className?: string;
    disabled?: boolean;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}
declare const TabItem: React.FC<TabItemProps>;
export default TabItem;
