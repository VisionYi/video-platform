import base, { filename } from 'paths.macro'
import { argEvents, dirnameTitle } from '@/.storybook/utils'
import VideoCard from '@/components/VideoCard.vue'

export default {
  title: dirnameTitle(base, filename),
  component: VideoCard,
}

const Template = ({ isFavorite, ...restProps }, { argTypes }) => ({
  props: {
    args: { default: () => ({ isFavorite, restProps }) },
    events: { default: () => argEvents(argTypes) }
  },
  components: { VideoCard },
  template: `
    <video-card v-bind="args.restProps" :isFavorite.sync="args.isFavorite" v-on="events"></video-card>
  `
})

export const Default = Template.bind({})
Default.args = {
  title: 'title title~~',
  content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
  time: '10:10',
  image: 'https://fakeimg.pl/500x300',
  isFavorite: false,
}
