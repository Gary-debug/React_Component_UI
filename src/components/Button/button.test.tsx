import React from "react";
import { render } from "@testing-library/react";
import Button from "./button";


describe('test Button component', () => {
  it('should render the correct default button', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(<Button>Nice</Button>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
  })
  it('should render the correct component based on different props', () => {

  })
  it('should render a link when btnType equals link and href is provided', () => {

  })
  it('should render disabled button when disabled set to true', () => {

  })
})
