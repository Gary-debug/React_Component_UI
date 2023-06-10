import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from './input';

export default {
  title: 'Input',
  id: 'Input',
  component: Input,
  decorators: [
    (Story) => (
      <div style={{ width: '350px' }}>
        <Story></Story>
      </div>
    )
  ]
} as ComponentMeta<typeof Input>


// export const ControllerInput = () => {
//   const [value, setValue] = useState()
//   return <Input value={value} defaultValue='0' onChange={(e) => { setValue(e.target.value) }}></Input>
// }

const Template: ComponentStory<typeof Input> = (args) => <Input  {...args} />
export const Default = Template.bind({})
Default.args = {
  placeholder: 'Default Input'
}
Default.storyName = 'Default Input'

export const Disabled = Template.bind({})
Disabled.args = {
  placeholder: 'Disabled Input',
  disabled: true
}
Disabled.storyName = 'Disabled Input'

export const Icon = Template.bind({})
Icon.args = {
  placeholder: 'Input With Icon',
  icon: 'search'
}
Icon.storyName = 'Input With Icon'

export const SizeInput = () => (
  <>
    <Input defaultValue='Large Size' size='large'></Input>
    <Input placeholder='Small Size' size='small'></Input>
  </>
)
SizeInput.storyName = 'Different Size Input'
export const PendInput = () => (
  <>
    <Input defaultValue='prepend text' prepend='https://'></Input>
    <Input defaultValue='google' append='.com'></Input>
    <Input prepend='https://' append='.com'></Input>
  </>
)
PendInput.storyName = 'Pend Input'
