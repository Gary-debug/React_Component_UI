import React from "react";
import { Story, Meta } from "@storybook/react";
import "../../styles/index.scss";
import Component, { BaseAlertProps } from "./alert";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export const Alert: React.FC<BaseAlertProps> = (args: any) => {
  return <Component message="title" {...args} />;
};

export default {
  title: "Feedback/Alert",
  Component: Alert,
  argTypes: {
    className: {
      description: "类名",
      disable: true,
    },
    message: {
      description: "标题",
      control: {
        type: "text",
      },
      table: {
        category: "Alert",
      },
    },
    type: {
      description: "Alert类型",
      defaultValue: "default",
      control: {
        type: "select",
        options: ["default", "success", "danger", "warning"],
      },
      table: {
        category: "Alert",
        type: { summary: "default | success | danger | warning" },
        defaultValue: { summary: "default" },
      },
    },
    description: {
      description: "描述",
      control: {
        type: "text",
      },
      table: {
        category: "Alert",
      },
    },
    closable: {
      description: "是否显示关闭按钮",
      defaultValue: true,
      control: {
        type: "boolean",
      },
      table: {
        category: "Alert",
        defaultValue: { summary: "false" },
      },
    },
    onClose: {
      description: "关闭事件",
      control: {
        type: null,
      },
      table: {
        category: "Alert",
      },
    },
  },
} as Meta;

const Template: Story<BaseAlertProps> = (args) => <Alert {...args} />;

export const AlertTypes: Story<BaseAlertProps> = (args) => (
  <div style={{ ...styles, flexDirection: "column" }}>
    <Alert title="Title" type="default" />
    <Alert title="Title" type="success" />
    <Alert title="Title" type="danger" />
    <Alert title="Title" type="warning" />
  </div>
);

export const WithDesc = Template.bind({});
WithDesc.args = {
  title: "title",
  description: "This is a few of description",
};

const styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
};
