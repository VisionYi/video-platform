import 'dotenv'

const isDevelopmentMode = process.env.NODE_ENV === 'development'
console.log('process.env.NUXT_ENV_PUBLIC_PATH', process.env.NUXT_ENV_PUBLIC_PATH)

export default {
  ssr: false,
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'video-platform',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: process.env.NUXT_ENV_PUBLIC_PATH + 'favicon.ico' }
    ],
    script: [
      {
        src: 'https://code.iconify.design/1/1.0.7/iconify.min.js', body: true,
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/styles/base.scss',
    '@/assets/styles/grid.scss',
  ],
  styleResources: {
    scss: [
      '@/assets/styles/variables.scss',
      '@/assets/styles/mixins.scss',
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vue-lazyload.js',
    '@/plugins/axios.js',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '@/components/base'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  router: {
    base: process.env.NUXT_ENV_PUBLIC_PATH || '/',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // when run production mode, `extractCSS` can make CSS order as the same with development mode
    // reference: https://nuxtjs.org/api/configuration-build/#extractcss
    extractCSS: isDevelopmentMode ? false : { ignoreOrder: true },
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  }
}
