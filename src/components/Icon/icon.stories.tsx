import React from "react";
import Icon from "./icon";
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import "../../styles/index.scss";
library.add(fas)
// 设置标签
const iconMeta: ComponentMeta<typeof Icon> = {
  title: 'Icon',
  component: Icon
}

// 必须是默认导出
export default iconMeta;
// 传入 args 可以在 story 中调整样式
const Template: ComponentStory<typeof Icon> = (args) => (
  <Icon {...args}></Icon>
)

export const Primary = Template.bind({})
Primary.args = {
  icon: 'coffee',
  theme: 'primary',
  size: '3x',
}
Primary.storyName = 'Primary Coffee Icon';

export const Secondary = Template.bind({})
Secondary.args = {
  icon: 'check',
  theme: 'secondary',
  size: '3x',
}
Secondary.storyName = 'Secondary Check Icon';

export const Success = Template.bind({})
Success.args = {
  icon: 'times',
  theme: 'success',
  size: '3x',
}
Success.storyName = 'Success times Icon';

export const Dark = Template.bind({})
Dark.args = {
  icon: 'anchor',
  theme: 'dark',
  size: '3x',
}
Dark.storyName = 'Dark Anchor Icon';