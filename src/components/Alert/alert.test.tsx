import React from "react";
import { render } from "@testing-library/react";
import Alert, {BaseAlertProps} from "./alert";

describe('test Alert component', () => {
  it('test alert-success component', () => {
    const testProps: BaseAlertProps = {
      title: 'testTitle',
      description: 'testDescription',
      type: 'success',
      className: 'testDemo',
      closable: false
    }
    const { container, queryByText } = render(<Alert {...testProps}/>)
    expect(queryByText('testTitle')).toBeInTheDocument()
    expect(queryByText('testDescription')).toBeInTheDocument()
    expect(container.querySelector('.alert')).toHaveClass('alert-success testDemo')
    expect(queryByText('X')).not.toBeInTheDocument()
  })
})