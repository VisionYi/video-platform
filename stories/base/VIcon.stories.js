import base, { filename } from 'paths.macro'
import { argEvents, dirnameTitle, controlOptions } from '@/.storybook/utils'
import VIcon, { SIZE, COLOR } from '@/components/base/VIcon.vue'

export default {
  title: dirnameTitle(base, filename),
  component: VIcon,
  argTypes: {
    size: controlOptions(Object.keys(SIZE)),
    color: controlOptions(Object.keys(COLOR)),
  }
}

const Template = ({ 'v-model': model, slot, ...restProps }, { argTypes }) => ({
  props: {
    args: { default: () => ({ model, slot, restProps }) },
    events: { default: () => argEvents(argTypes) }
  },
  components: { VIcon },
  template: `
    <v-icon v-model="args.model" v-bind="args.restProps" v-on="events"></v-icon>
  `
})

export const Default = Template.bind({})
Default.args = {
  name: 'ant-design:home-filled',
  color: 'primary',
}
