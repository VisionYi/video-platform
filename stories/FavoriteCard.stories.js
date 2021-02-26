import base, { filename } from 'paths.macro'
import { argEvents, dirnameTitle } from '@/.storybook/utils'
import FavoriteCard from '@/components/FavoriteCard.vue'
import { Default as videoCardDefault } from './VideoCard.stories'

export default {
  title: dirnameTitle(base, filename),
  component: FavoriteCard,
}

const Template = ({ isFavorite, ...restProps }, { argTypes }) => ({
  props: {
    args: { default: () => ({ isFavorite, restProps }) },
    events: { default: () => argEvents(argTypes) }
  },
  components: { FavoriteCard },
  template: `
    <favorite-card v-bind="args.restProps" :isFavorite.sync="args.isFavorite" v-on="events"></favorite-card>
  `
})

export const Default = Template.bind({})
Default.args = videoCardDefault.args
