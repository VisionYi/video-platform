import Vue from 'vue'
import VueGtag from 'vue-gtag'

export default () => {
  Vue.use(
    VueGtag,
    {
      config: {
        id: process.env.NUXT_ENV_GOOGLE_ANALYTICS_ID || ''
      },
      disableScriptLoad: !process.env.NUXT_ENV_GOOGLE_ANALYTICS_ID,
    }
  )
}
