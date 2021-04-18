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

const Template = ({ ...restProps }, { argTypes }) => ({
  props: {
    args: { default: () => ({ restProps }) },
    events: { default: () => argEvents(argTypes) }
  },
  components: { VIcon },
  template: `
    <v-icon v-bind="args.restProps" v-on="events"></v-icon>
  `
})

export const Default = Template.bind({})
Default.args = {
  name: 'ant-design:home-filled',
}

export const IconWithColor = () => ({
  data: () => ({ colors: Object.keys(COLOR) }),
  template: `
    <div>
      <v-icon name="ant-design:home-filled"></v-icon>
      <v-icon v-for="color in colors" :key="color" name="ant-design:home-filled" :color="color"></v-icon>
    </div>
  `
})

export const IconWithDifferentSize = () => ({
  data: () => ({ sizes: Object.keys(SIZE) }),
  template: `
    <div>
      <v-icon name="ant-design:home-filled"></v-icon>
      <v-icon v-for="size in sizes" :key="size" name="ant-design:home-filled" :size="size"></v-icon>
    </div>
  `
})

// setTimeout(() => {
//   const el = document.querySelector('[title="Hide props items"] button')
//   const el2 = document.querySelector('[title="Hide events items"] button')
//   const el3 = document.querySelector('[title="Hide slots items"] button')
//   if (el) el.click()
//   if (el2) el2.click()
//   if (el3) el3.click()
// })
