import React from 'react';
import Button from './button';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import "../../styles/index.scss";


// 设置标签
const buttonMeta: ComponentMeta<typeof Button> = {
  title: 'Button',
  component: Button
}
// 必须要是默认导出
export default buttonMeta
// 传入 args 可以在 story 中调整样式 
const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}></Button>
)
export const Default = Template.bind({})
Default.args = {
  children: 'Default Button',
}
Default.storyName = 'Default'
export const Large = Template.bind({})
Large.args = {
  size: 'large',
  children: 'Large Button'
}
export const Small = Template.bind({})
Small.args = {
  size: 'small',
  children: 'Small Button'
}
export const Primary = Template.bind({})
Primary.args = {
  btnType: 'primary',
  children: 'Primary Button'
}
export const Danger = Template.bind({})
Danger.args = {
  btnType: 'danger',
  children: 'Danger Button'
}
export const Link = Template.bind({})
Link.args = {
  btnType: 'link',
  children: 'Link Button',
  href: 'https://google.com'
}
