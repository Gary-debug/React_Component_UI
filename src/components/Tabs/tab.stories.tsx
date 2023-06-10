import React from "react";
import Tabs from "./tabs";
import TabItem from "./tabItem";
import { ComponentMeta, ComponentStory } from '@storybook/react'

import "../../styles/index.scss";

// 设置标签
const alertMeta: ComponentMeta<typeof Tabs> = {
  title: 'Tabs',
  component: Tabs
}

// 必须是默认导出
export default alertMeta;
// 传入 args 可以在 story 中调整样式
const Template: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args}>
    <TabItem label='label1'>tab1</TabItem>
    <TabItem label='label2'>tab2</TabItem>
    <TabItem label='label3'>tab3</TabItem>
  </Tabs>
)

export const Line = Template.bind({})
Line.args = {
  type: 'line',
}
Line.storyName = 'Line Tabs';

export const Card = Template.bind({})
Card.args = {
  type: 'card',
}
Card.storyName = 'Card Tabs';
