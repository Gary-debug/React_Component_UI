import React from "react";
import { Story, Meta } from "@storybook/react";
import "../../styles/index.scss";
import Select, { SelectProps } from "./select";
import SelectOptions from "./option";
import { Title, Subtitle, Description, Primary, ArgsTable, Stories, PRIMARY_STORY } from "@storybook/addon-docs";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export default {
  title: "Actions/Select",
  Component: Select,
  subcomponents: { SelectOptions },
  argTypes: {
    defaultValue: {
      description: "默认选中条目",
      control: {
        type: "text",
      },
      table: {
        category: "Select",
      },
    },
    multiple: {
      description: "是否支持多选",
      defaultValue: false,
      control: {
        type: "boolean",
      },
      table: {
        category: "Select",
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      description: "是否禁用",
      defaultValue: false,
      control: {
        type: "boolean",
      },
      table: {
        category: "Select",
        defaultValue: { summary: "false" },
      },
    },
    placeholder: {
      description: "默认提示文字（仅单选有效）",
      control: {
        type: "text",
      },
      table: {
        category: "Select",
      },
    },
    name: {
      description: "input的name属性",
      control: {
        type: "text",
      },
      table: {
        category: "Select",
      },
    },
    onChange: {
      description: "onChange事件",
      control: {
        type: null,
      },
      table: {
        category: "Select",
      },
    },
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

export const BaseSelect: Story<SelectProps> = (args) => (
  <div style={{ marginBottom: "100px" }}>
    <Select
      onChange={(index) => {
        console.log(index);
      }}
      defaultValue={["option3"]}
      {...args}
    >
      <SelectOptions label="label1" value="option1"></SelectOptions>
      <SelectOptions label="label2" value="option2"></SelectOptions>
      <SelectOptions label="label3" value="option3"></SelectOptions>
    </Select>
  </div>
);

export const MultipleSelect: Story<SelectProps> = (args) => (
  <div style={{ marginBottom: "100px" }}>
    <Select
      onChange={(index) => {
        console.log(index);
      }}
      multiple
      defaultValue={["option2","option3"]}
    >
      <SelectOptions label="label1" value="option1"></SelectOptions>
      <SelectOptions label="label2" value="option2"></SelectOptions>
      <SelectOptions label="label3" value="option3"></SelectOptions>
    </Select>
  </div>
);
