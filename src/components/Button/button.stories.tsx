import React from "react";
import { Story, Meta } from "@storybook/react";
// import { Meta, ArgsTable} from '@storybook/addon-docs'
import "../../styles/index.scss";

import Component, { ButtonProps } from "./button";
import Icon from "../Icon/icon";

export const Button: React.FC<ButtonProps> = (args: any) => {
  return <Component {...args}>click</Component>;
};
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Base/Button",
  component: Button,
  // parameters: {
  //   docs: {
  //     page: null
  //   }
  // },
  // decorators: [
  //   (Story) => (
  //     <div style={{margin: '3em'}}>
  //       <Story />
  //     </div>
  //   )
  // ],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: "color" },
    className: {
      description: "类名",
      disable: true,
    },
    btnType: {
      description: "按钮类型",
      defaultValue: "default",
      control: {
        type: "select",
        options: ["default", "primary", "danger", "link"],
      },
      table: {
        category: "Button",
        type: { summary: "default |primary | danger | link" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      description: "按钮尺寸",
      defaultValue: "ml",
      control: {
        type: "select",
        options: ["ml", "lg", "sm"],
      },
      table: {
        category: "Button",
        type: { summary: "ml | lg | sm" },
        defaultValue: { summary: "ml" },
      },
    },
    disabled: {
      description: "是否禁用",
      defaultValue: false,
      control: {
        type: "boolean",
      },
      table: {
        category: "Button",
        defaultValue: { summary: "false" },
      },
    },
    href: {
      description: "链接地址（当type==“link”时生效）",
      control: {
        type: "text",
      },
      table: {
        category: "Button",
      },
    },
    loading: {
      description: "是否正在加载中",
      defaultValue: false,
      control: {
        type: "boolean",
      },
      table: {
        category: "Button",
        defaultValue: { summary: "false" },
      },
    },
    icon: {
      description: "icon图标",
      control: { type: null },
      table: {
        category: "Button",
        type: { summary: "IconProps" },
      },
    },
    children: {
      type: {
        name: "string",
        required: true,
      },
      control: {
        type: null,
      },
    },
  },
} as Meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ButtonProps> = (args) => <Button {...args}>primary</Button>;

export const ButtonTypes: Story<ButtonProps> = (args) => (
  <div style={styles}>
    <Button btnType="primary">primary</Button>
    <Button btnType="default">default</Button>
    <Button btnType="danger">danger</Button>
    <Button btnType="link" href="https://www.baidu.com" target="_blank">
      百度
    </Button>
  </div>
);

export const ButtonSizes: Story<ButtonProps> = (args) => (
  <div style={styles}>
    <Button size="large">large btn</Button>
    <Button size="small">small btn</Button>
  </div>
);

export const ButtonEnable: Story<ButtonProps> = (args) => (
  <div style={styles}>
    <Button>Enable</Button>
    <Button disabled>Disabled</Button>
  </div>
);

export const ButtonLoading: Story<ButtonProps> = (args) => (
  <div style={styles}>
    <Button loading>loading</Button>
    <Button>normal</Button>
  </div>
);

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: <Icon icon="coffee" />,
};

const styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
};
