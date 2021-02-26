import base, { filename } from 'paths.macro'
import { argEvents, dirnameTitle } from '@/.storybook/utils'
import Navbar from '@/components/Navbar.vue'

export default {
  title: dirnameTitle(base, filename),
  component: Navbar,
}

const Template = ({ ...restProps }, { argTypes }) => ({
  props: {
    args: { default: () => ({ restProps }) },
    events: { default: () => argEvents(argTypes) }
  },
  components: { Navbar },
  template: `
    <Navbar v-bind="args.restProps" v-on="events"></Navbar>
  `
})

export const Default = Template.bind({})
Default.args = {
}
