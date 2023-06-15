import React from "react";
type selectCallBack = (selectedIndex: string) => void;
type TabsType = 'line' | 'card';
export interface TabsProps {
    defaultIndex?: string;
    className?: string;
    onSelect?: selectCallBack;
    type?: TabsType;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}
interface ITabContext {
    index: string;
    onSelect?: selectCallBack;
    type?: TabsType;
}
export declare const TabContext: React.Context<ITabContext>;
declare const Tabs: React.FC<TabsProps>;
export default Tabs;
