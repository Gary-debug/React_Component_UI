import React from "react";
import { Story, Meta } from "@storybook/react";
import "../../styles/index.scss";
import Tabs, { TabsProps } from "./tabs";
import TabItem from "./tabItem";
import { Title, Subtitle, Description, Primary, ArgsTable, Stories, PRIMARY_STORY } from "@storybook/addon-docs";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export default {
  title: "Nav/Tabs",
  Component: Tabs,
  subcomponents: { TabItem },
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
    type: {
      description: "Tabs类型",
      defaultValue: "line",
      control: {
        type: "select",
        options: ["line", "card"],
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

export const BaseTabs: Story<TabsProps> = (args) => (
  <Tabs
    defaultIndex="0"
    onSelect={(index) => {
      console.log(index);
    }}
    {...args}
  >
    <TabItem label="label1">tab1</TabItem>
    <TabItem label="label2">tab2</TabItem>
    <TabItem label="label3">tab3</TabItem>
  </Tabs>
);

export const CardTabs: Story<TabsProps> = (args) => (
  <Tabs
    defaultIndex="0"
    onSelect={(index) => {
      console.log(index);
    }}
    type="card"
  >
    <TabItem label="label1">tab1</TabItem>
    <TabItem label="label2">tab2</TabItem>
    <TabItem label="label3">tab3</TabItem>
  </Tabs>
);
