import { parameters as nuxtParameters } from '~~/.nuxt-storybook/storybook/preview.js'
import '~~/.nuxt-storybook/storybook/preview.js'

export const parameters = {
  ...nuxtParameters,
  backgrounds: {
    default: 'light',
  },
  // here don't work. issue: https://github.com/nuxt-community/storybook/issues/205
  // docs: {
  //   source: {
  //     type: 'dynamic'
  //   }
  // }
}
