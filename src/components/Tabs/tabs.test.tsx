import React from "react";
import { render, fireEvent, RenderResult } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'

import Tabs, {TabsProps} from "./tabs";
import TabItem from "./tabItem";


const testProps: TabsProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
}

let wrapper: RenderResult, tabsElement: HTMLElement, disabledElement: HTMLElement, activeElement: HTMLElement, thirdItem: HTMLElement, disabledItem: HTMLElement
describe('test Tabs Component', () => {
  beforeEach(() => {
    wrapper = render(
      <Tabs {...testProps}>
        <TabItem label="tab1">content1</TabItem>
        <TabItem label="tab2">content2</TabItem>
        <TabItem label="disabled" disabled>disabled</TabItem>
      </Tabs>
    )
    tabsElement = wrapper.getByTestId('test-tabs')
    activeElement = wrapper.getByText('content1')
    thirdItem = wrapper.getByText('tab2')
    disabledItem = wrapper.getByText('disabled')
  })

  it('should render the correct default Tabs', () => {
    tabsElement = wrapper.getByTestId('test-tabs')
    expect(tabsElement).toHaveClass('test')
    disabledElement = wrapper.getByText('disabled')
    expect(disabledElement).toHaveClass('tabs-nav-item disabled')
  })
  it('click tabItem should switch to content', () => {
    fireEvent.click(activeElement)
    expect(activeElement).toBeInTheDocument()
  })
  it('click disabled tabItem should not works', () => {
    expect(disabledItem).toHaveClass('disabled')
  })
})