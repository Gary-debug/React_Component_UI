import React from "react";
import Alert from "./alert";
import { ComponentMeta, ComponentStory } from '@storybook/react'

import "../../styles/index.scss";

// 设置标签
const alertMeta: ComponentMeta<typeof Alert> = {
  title: 'Alert',
  component: Alert
}

// 必须是默认导出
export default alertMeta;
// 传入 args 可以在 story 中调整样式
const Template: ComponentStory<typeof Alert> = (args) => (
  <Alert {...args}></Alert>
)

export const Defalut = Template.bind({})
Defalut.args = {
  description: 'this is a Defalut alert',
}
Defalut.storyName = 'Default Alert';

export const Success = Template.bind({})
Success.args = {
  type: 'success',
  description: 'this is a Success alert',
}
Success.storyName = 'Success Alert';

export const Danger = Template.bind({})
Danger.args = {
  type: 'danger',
  description: 'this is a Danger alert',
}
Danger.storyName = 'Danger Alert';

export const Warning = Template.bind({})
Warning.args = {
  type: 'warning',
  description: 'this is a Warning alert',
}
Warning.storyName = 'Warning Alert';