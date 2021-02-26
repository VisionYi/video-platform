import base, { filename } from 'paths.macro'
import { argEvents, dirnameTitle } from '@/.storybook/utils'
import VideoCardList from '@/components/VideoCardList.vue'
import { Default as videoCardDefault } from './VideoCard.stories'

export default {
  title: dirnameTitle(base, filename),
  component: VideoCardList,
}

const Template = ({ ...restProps }, { argTypes }) => ({
  props: {
    args: { default: () => ({ restProps }) },
    events: { default: () => argEvents(argTypes) }
  },
  components: { VideoCardList },
  template: `
    <video-card-list v-bind="args.restProps" v-on="events"></video-card-list>
  `
})

export const Default = Template.bind({})
Default.args = {
  isLoading: false,
  cards: [...Array(6)].map((n, index) => ({ id: String(index), ...videoCardDefault.args }))
}
