import base, { filename } from 'paths.macro'
import { argEvents, dirnameTitle } from '@/.storybook/utils'
import VButton from '@/components/base/VButton.vue'

export default {
  title: dirnameTitle(base, filename),
  component: VButton,
}

const Template = ({ slot, ...restProps }, { argTypes }) => ({
  props: {
    args: { default: () => ({ slot, restProps }) },
    events: { default: () => argEvents(argTypes) }
  },
  components: { VButton },
  template: `
    <v-button v-bind="args.restProps" v-on="events">{{args.slot}}</v-button>
  `
})

export const Default = Template.bind({})
Default.args = {
  slot: 'Button',
}
