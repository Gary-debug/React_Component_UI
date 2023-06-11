import React from 'react';
import { config } from 'react-transition-group';
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react'
import { AutoCompleteProps, AutoComplete, DataSourceType } from './autoComplete';
import { screen } from '@testing-library/react';
// 消灭动画的影响
config.disabled = true
jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>
  }
})
const testArray = [
  { value: 'ab', number: 11 },
  { value: 'abc', number: 1 },
  { value: 'b', number: 4 },
  { value: 'c', number: 15 },
]
const renderOption = (item: DataSourceType) => {
  const itemWithNumber = item as DataSourceType<{ value: string; number: number }>
  return (
    <>name:{itemWithNumber.value}</>
  )
}
const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => { return testArray.filter(item => item.value.includes(query)) },
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}
const testPropsWithCustomRender: AutoCompleteProps = {
  ...testProps,
  placeholder: 'auto-complete-2',
  renderOption
}
let view: RenderResult, inputNode: HTMLInputElement

describe('test AutoComplete component', () => {
  beforeEach(() => {
    view = render(<AutoComplete {...testProps}></AutoComplete>)
    inputNode = screen.getByPlaceholderText('auto-complete') as HTMLInputElement
  })
  it('test basic AutoComplete behavior', async () => {
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(screen.queryByText('ab')).toBeInTheDocument()
    })
    // should have two suggestion items
    expect(view.container.querySelectorAll('.suggestion-item').length).toEqual(2)
    //click the first item
    fireEvent.click(screen.getByText('ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
    expect(view.queryByText('ab')).not.toBeInTheDocument()
    // fill the input
    expect(inputNode.value).toBe('ab')
  })
  it('should provide keyboard support', async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(view.queryByText('ab')).toBeInTheDocument()
    })
    const firstResult = screen.queryByText('ab')
    const secondResult = screen.queryByText('abc')

    // ArrowDown
    fireEvent.keyDown(inputNode, { keyCode: '40' })
    expect(firstResult).toHaveClass('suggestion-item')
    // ArrowDown
    fireEvent.keyDown(inputNode, { keyCode: '40' })
    expect(secondResult).toHaveClass('suggestion-item')
    // ArrowUp
    fireEvent.keyDown(inputNode, { keyCode: '38' })
    expect(firstResult).toHaveClass('suggestion-item')
    // press Enter
    fireEvent.keyDown(inputNode, { keyCode: '13' })
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
    expect(screen.queryByText('ab')).not.toBeInTheDocument()
  })
  it('click outside should hide the dropdown', async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(screen.queryByText('ab')).toBeInTheDocument()
    })
    fireEvent.click(document)
    expect(screen.queryByText('ab')).not.toBeInTheDocument()
  })
  it('renderOption should generate the right template', async () => {
    const view = render(<AutoComplete {...testPropsWithCustomRender}></AutoComplete>)
    const inputNode = view.getByPlaceholderText('auto-complete-2') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(screen.queryByText('name:ab')).toBeInTheDocument()
    })
  })
  it('async fetchSuggestions should works fine', async () => {
    const testPropsWithPromise: AutoCompleteProps = {
      ...testProps,
      fetchSuggestions: jest.fn((query) => { return Promise.resolve(testArray.filter(item => item.value.includes(query))) }),
      placeholder: 'auto-complete-3',
    }
    const view = render(<AutoComplete {...testPropsWithPromise} />)
    const inputNode = view.getByPlaceholderText('auto-complete-3') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(testPropsWithPromise.fetchSuggestions).toHaveBeenCalled()
    })
    await waitFor(() => {
      expect(view.queryByText('ab')).toBeInTheDocument()
    })
  })

})
