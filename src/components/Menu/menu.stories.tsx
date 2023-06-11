import React from "react";
import { Story, Meta } from "@storybook/react";
import "../../styles/index.scss";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";
import { Title, Subtitle, Description, Primary, ArgsTable, Stories, PRIMARY_STORY } from "@storybook/addon-docs";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export default {
  title: "Nav/Menu",
  Component: Menu,
  subcomponents: { MenuItem, SubMenu },
  argTypes: {
    className: {
      description: "类名",
      disable: true,
    },
    defaultIndex: {
      description: "默认index",
      control: {
        type: "text",
      },
      table: {
        category: "Menu",
      },
    },
    mode: {
      description: "Menu类型",
      defaultValue: "horizontal",
      control: {
        type: "select",
        options: ["horizontal", "vertical"],
      },
      table: {
        category: "Menu",
        type: { summary: "horizontal | vertical" },
        defaultValue: { summary: "horizontal" },
      },
    },
    style: {
      description: "内联样式",
      control: {
        type: null,
      },
    },
    onSelect: {
      description: "选择时触发事件",
      control: {
        type: null,
      },
      table: {
        category: "Menu",
      },
    },
    defaultOpenSubMenus: {
      description: "默认展开的子菜单index(当subMenu存在时适用)",
      control: {
        type: "array",
      },
      table: {
        category: "Menu",
      },
    },
  },
  args: {
    defaultIndex: "0",
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle></Subtitle>
          <Description></Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as Meta;

// const Template: Story<MenuProps> = (args) => <Menu {...args} />;
export const BaseMenu: Story<MenuProps> = (args) => (
  <Menu
    defaultIndex="0"
    onSelect={(index) => {
      console.log(index);
    }}
  >
    <MenuItem disabled>cool link1</MenuItem>
    <MenuItem>cool link2</MenuItem>
    <MenuItem>cool link3</MenuItem>
  </Menu>
);

export const SubMenus: Story<MenuProps> = (args) => (
  <Menu
    defaultIndex="0"
    onSelect={(index) => {
      console.log(index);
    }}
    defaultOpenSubMenus={["3"]}
    style={styles}
  >
    <MenuItem disabled>cool link1</MenuItem>
    <MenuItem>cool link2</MenuItem>
    <MenuItem>cool link3</MenuItem>
    <SubMenu title="dropdown">
      <MenuItem disabled>dropdown1</MenuItem>
      <MenuItem>dropdown2</MenuItem>
      <MenuItem>dropdown3</MenuItem>
    </SubMenu>
  </Menu>
);

export const VerticalMode: Story<MenuProps> = (args) => (
  <Menu
    defaultIndex="0"
    onSelect={(index) => {
      console.log(index);
    }}
    mode="vertical"
    defaultOpenSubMenus={["3"]}
  >
    <MenuItem disabled>cool link1</MenuItem>
    <MenuItem>cool link2</MenuItem>
    <MenuItem>cool link3</MenuItem>
    <SubMenu title="dropdown">
      <MenuItem disabled>dropdown1</MenuItem>
      <MenuItem>dropdown2</MenuItem>
      <MenuItem>dropdown3</MenuItem>
    </SubMenu>
  </Menu>
);

// export const template = Template.bind({});

const styles = {
  marginBottom: "100px",
};
