import base, { filename } from 'paths.macro'
import { argEvents, dirnameTitle } from '@/.storybook/utils'
import VImage from '@/components/base/VImage.vue'

export default {
  title: dirnameTitle(base, filename),
  component: VImage,
}

const Template = ({ 'v-model': model, slot, ...restProps }, { argTypes }) => ({
  props: {
    args: { default: () => ({ model, slot, restProps }) },
    events: { default: () => argEvents(argTypes) }
  },
  components: { VImage },
  template: `
    <v-image class="w-1/2" v-model="args.model" v-bind="args.restProps" v-on="events"></v-image>
  `
})

export const Default = Template.bind({})
Default.args = {
  src: 'https://fakeimg.pl/250x200',
}
