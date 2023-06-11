import React from "react";
import { Story, Meta } from "@storybook/react";
import "../../styles/index.scss";
import Transition, { TransitionProps } from "./transition";
import { Title, Subtitle, Description, Primary, ArgsTable, Stories, PRIMARY_STORY } from "@storybook/addon-docs";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/button";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
library.add(fas);

export default {
  title: "Style/Transition",
  Component: Transition,
  argTypes: {
    className: {
      description: "类名",
      disable: true,
    },
    animation: {
      description: "动画类型",
      control: {
        type: "select",
        options: ["zoom-in-top", "zoom-in-left", "zoom-in-right", "zoom-in-bottom"],
      },
      table: {
        category: "Transition",
        type: { summary: "zoom-in-top | zoom-in-left | zoom-in-right | zoom-in-bottom" },
      },
    },
    wrapper: {
      description: "是否用容器包裹（防止子元素不继承动画）",
      control: {
        type: "boolean",
      },
      table: {
        category: "Transition",
      },
    },
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle></Subtitle>
          <Description>此Transition组件基于react-transition-group</Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as Meta;

// const Template: Story<IconProps> = (args) => <Icon {...args} />;

export const Example: Story<TransitionProps> = (args: CSSTransitionProps) => {
  const [show, setShow] = React.useState(false);
  return (
    <div style={{...styles,flexDirection: 'column'}}>
      <Button
        btnType="primary"
        onClick={() => {
          setShow(!show);
        }}
      >click to transition</Button>
      <Transition in={show} timeout={300} animation="zoom-in-left" wrapper {...args}>
        <>
          <Button>turn left</Button>
        </>
      </Transition>
      <Transition in={show} timeout={300} animation="zoom-in-right" wrapper {...args}>
        <>
          <Button>turn right</Button>
        </>
      </Transition>
      <Transition in={show} timeout={300} animation="zoom-in-bottom" wrapper {...args}>
        <>
          <Button>turn bottom</Button>
        </>
      </Transition>
      <Transition in={show} timeout={300} animation="zoom-in-top" wrapper {...args}>
        <>
          <Button>turn top</Button>
        </>
      </Transition>
    </div>
  );
};

// export const template = Template.bind({});

const styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
};
