import base, { filename } from 'paths.macro'
import { argEvents, dirnameTitle } from '@/.storybook/utils'
import Heart from '@/components/Heart.vue'

export default {
  title: dirnameTitle(base, filename),
  component: Heart,
}

const Template = ({ 'v-model': model, ...restProps }, { argTypes }) => ({
  props: {
    args: { default: () => ({ model, restProps }) },
    events: { default: () => argEvents(argTypes) }
  },
  components: { Heart },
  template: `
    <heart v-model="args.model" v-bind="args.restProps" v-on="events"></heart>
  `
})

export const Default = Template.bind({})
Default.args = {
  'v-model': false
}
