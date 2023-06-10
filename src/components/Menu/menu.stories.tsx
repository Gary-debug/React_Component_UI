import React from "react";
import Menu from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";
import { ComponentMeta, ComponentStory } from '@storybook/react'

import "../../styles/index.scss";

// 设置标签
const alertMeta: ComponentMeta<typeof Menu> = {
  title: 'Menu',
  component: Menu
}

// 必须是默认导出
export default alertMeta;
// 传入 args 可以在 story 中调整样式
const Template: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args}>
    <MenuItem>
            cool link
          </MenuItem>
          <MenuItem disabled>
            cool link2
          </MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>
              dropdown 1
            </MenuItem>
            <MenuItem>
              dropdown 2
            </MenuItem>
          </SubMenu>
          <MenuItem>
            cool link3
          </MenuItem>
  </Menu>
)

export const Horizontal = Template.bind({})
Horizontal.args = {
  mode: 'horizontal'
}
Horizontal.storyName = 'Horizontal Menu';

export const Vertical = Template.bind({})
Vertical.args = {
  mode: 'vertical'
}
Vertical.storyName = 'Vertical Menu';

