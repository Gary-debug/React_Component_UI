import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Upload } from './upload'
import Button from '../Button/button'
import Icon from '../Icon/icon'

export default {
  title: 'Upload',
  id: 'Upload',
  component: Upload,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    }
  }
} as ComponentMeta<typeof Upload>

export const SimpleUpload: ComponentStory<typeof Upload> = (args) => (
  <Upload
    {...args}
    action="https://mock.apifox.cn/m1/2128399-0-default/api/upload"
  >
    <Button size="large" btnType="primary"><Icon icon="upload" /> 点击上传 </Button>
  </Upload>
)
SimpleUpload.storyName = 'SimpleUpload'
export const CheckUpload: ComponentStory<typeof Upload> = (args) => {
  const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
      alert('file too big')
      return false;
    }
    return true;
  }
  return (
    <Upload
      {...args}
      action="https://mock.apifox.cn/m1/2128399-0-default/api/upload"
      beforeUpload={checkFileSize}
    >
      <Button size="large" btnType="primary"><Icon icon="upload" /> 不能传大于50Kb！ </Button>
    </Upload>
  )
}
CheckUpload.storyName = 'CheckUpload'
export const DragUpload: ComponentStory<typeof Upload> = (args) => (
  <Upload
    {...args}
    action="https://mock.apifox.cn/m1/2128399-0-default/api/upload"
    name="fileName"
    multiple
    drag
  >
    <Icon icon="upload" size="5x" theme="secondary" />
    <br />
    <p>点击或者拖动到此区域进行上传</p>
  </Upload>
)
DragUpload.storyName = 'DragUpload'