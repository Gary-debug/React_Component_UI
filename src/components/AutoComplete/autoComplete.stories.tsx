import React from "react";
import { Story, Meta } from "@storybook/react";
import "../../styles/index.scss";
import { Title, Subtitle, Description, Primary, ArgsTable, Stories, PRIMARY_STORY } from "@storybook/addon-docs";
import Component, { AutoCompleteProps, DataSourceType } from "./autoComplete";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const mockData = [
  { value: "苹果", name: "苹果" },
  { value: "橘子", name: "橘子" },
  { value: "梨", name: "梨" },
  { value: "西瓜", name: "西瓜" },
  { value: "桃子", name: "桃子" },
];
const mockSuggestions = (query: string) => mockData.filter((v) => v.name.includes(query));
export const AutoComplete: React.FC<AutoCompleteProps> = (args: any) => {
  return (
    <div style={{ marginBottom: "100px" }}>
      <Component fetchSuggestions={mockSuggestions} placeholder="请输入水果名称" {...args} />
    </div>
  );
};

export default {
  title: "Actions/AutoComplete",
  Component: AutoComplete,
  argTypes: {
    fetchSuggestions: {
      description: "数据源",
      type: {
        name: "string",
        required: true,
      },
      control: {
        type: "function",
      },
      table: {
        category: "AutoComplete",
        type: { summary: "DataSourceType[] | Promise<DataSourceType[]>" },
      },
    },
    renderOptions: {
      description: "自定义模版",
      control: {
        type: "null",
      },
      table: {
        category: "AutoComplete",
        type: { summary: "(item: DataSourceType) => React.ReactElement" },
      },
    },
    onSelect: {
      description: "选择事件",
      control: {
        type: null,
      },
      table: {
        category: "AutoComplete",
      },
    },
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle></Subtitle>
          <Description>自动填充组件，支持键盘事件</Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as Meta;

const Template: Story<AutoCompleteProps> = (args) => <AutoComplete {...args} />;

type Ilogin = {
  login: string;
};
const handleFetch = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`)
    .then((res) => res.json())
    .then(({ items }) => {
      console.log(items);
      return items.slice(0, 10).map((item: Ilogin) => ({
        value: item.login,
        ...item,
      }));
    })
    .catch((err) => {
      console.error(err);
    });
};
/**
 * 异步调用数据源
 */
export const asyncData = Template.bind({});
asyncData.args = {
  fetchSuggestions: handleFetch,
  placeholder: "请输入用户名",
  onSelect: (item) => {
    console.log(item);
  },
};

export const RenderOptions: Story<AutoCompleteProps> = (args) => <AutoComplete fetchSuggestions={mockSuggestions} renderOption={(item: DataSourceType) => <strong style={{ color: "red" }}>{item.value}</strong>} />;
