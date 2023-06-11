import React, { useState } from "react";
import { Story, Meta } from "@storybook/react";
// import { Meta, ArgsTable} from '@storybook/addon-docs'
import "../../styles/index.scss";

import Component, { InputProps } from "./input";

export const Input: React.FC<InputProps> = (args: any) => {
  return <Component placeholder="请输入" {...args} />;
};
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Actions/Input",
  component: Input,
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
    size: {
      description: "输入框尺寸",
      defaultValue: "ml",
      control: {
        type: "select",
        options: ["ml", "lg", "sm"],
      },
      table: {
        category: "Input",
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
        category: "Input",
        defaultValue: { summary: "false" },
      },
    },
    prepend: {
      description: "前缀",
      control: {
        type: null,
      },
      table: {
        category: "Input",
      },
    },
    append: {
      description: "前缀",
      control: {
        type: null,
      },
      table: {
        category: "Input",
      },
    },
    icon: {
      description: "icon图标",
      control: { type: null },
      table: {
        category: "Input",
        type: { summary: "IconProp" },
      },
    },
  },
} as Meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

export const InputSizes: Story<InputProps> = (args) => (
  <div style={styles}>
    <Input size="large" />
    <Input size="small" />
  </div>
);

export const InputEnable: Story<InputProps> = (args) => (
  <div style={styles}>
    <Input />
    <Input disabled />
  </div>
);

export const InputAppend: Story<InputProps> = (args) => (
  <div style={styles}>
    <Input prepend="prepend" />
    <Input prepend={<b>prepend</b>} />
    <Input append="append" />
    <Input append={<small>append</small>} />
  </div>
);

export const InputControled: Story<InputProps> = (args) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div style={styles}>
      <Input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
    </div>
  );
};

const styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
};
