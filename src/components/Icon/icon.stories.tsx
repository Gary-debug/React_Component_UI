import React from "react";
import { Story, Meta } from "@storybook/react";
import "../../styles/index.scss";
import Component, { IconProps } from "./icon";
import { Title, Subtitle, Description, Primary, ArgsTable, Stories, PRIMARY_STORY } from "@storybook/addon-docs";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export const Icon: React.FC<IconProps> = (args: any) => {
  return <Component icon="anchor" {...args} />;
};

export default {
  title: "Base/Icon",
  Component: Icon,
  argTypes: {
    className: {
      description: "类名",
      disable: true,
    },
    theme: {
      description: "icon类型",
      defaultValue: "primary",
      control: {
        type: "select",
        options: ["primary", "secondary", "success", "info", "warning", "danger", "light", "dark"],
      },
      table: {
        category: "Icon",
        type: { summary: "primary | secondary | success | info | warning | danger | light | dark" },
        defaultValue: { summary: "primary" },
      },
    },
    icon: {
      description: "icon图标名称",
      control: {
        type: "text",
      },
      table: {
        category: "Icon",
      },
      type: {
        name: "string",
        required: true
      },
    },
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle></Subtitle>
          <Description>此icon组件基于react-fontawesome, docs：https://fontawesome.com/start</Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as Meta;

// const Template: Story<IconProps> = (args) => <Icon {...args} />;

export const IconTypes: Story<IconProps> = (args) => (
  <div style={styles}>
    <Icon icon="anchor" theme="primary" />
    <Icon icon="anchor" theme="secondary" />
    <Icon icon="anchor" theme="success" />
    <Icon icon="anchor" theme="warning" />
    <Icon icon="anchor" theme="danger" />
    <Icon icon="anchor" theme="dark" />
    <Icon icon="anchor" theme="light" />
    <Icon icon="anchor" theme="info" />
  </div>
);

// export const template = Template.bind({});

const styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
};
