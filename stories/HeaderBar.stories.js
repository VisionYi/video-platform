import base, { filename } from 'paths.macro'
import { argEvents, dirnameTitle } from '@/.storybook/utils'
import HeaderBar from '@/components/HeaderBar.vue'

export default {
  title: dirnameTitle(base, filename),
  component: HeaderBar,
}

const Template = ({ ...restProps }, { argTypes }) => ({
  props: {
    args: { default: () => ({ restProps }) },
    events: { default: () => argEvents(argTypes) }
  },
  components: { HeaderBar },
  template: `
    <header-bar v-bind="args.restProps" v-on="events"></header-bar>
  `
})

export const Default = Template.bind({})
Default.args = {
}
