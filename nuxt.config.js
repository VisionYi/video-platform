import 'dotenv'

const isDevelopmentMode = process.env.NODE_ENV === 'development'

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
    { src: '@/plugins/vue-gtag.js', mode: 'client' },
    '@/plugins/vue-lazyload.js',
    '@/plugins/axios.js',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv',
    '@nuxtjs/router-extras',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '@/components/base'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sentry',
    ['@netsells/nuxt-hotjar', {
      id: process.env.NUXT_ENV_HOTJAR_ID || '',
      sv: '6',
    }],
  ],

  router: {
    base: process.env.NUXT_ENV_PUBLIC_PATH || '/',
    middleware: 'router',
  },

  generate: {
    fallback: true
  },

  sentry: {
    dsn: process.env.SENTRY_DSN || '',
    disabled: process.env.SENTRY_DISABLED === 'true' || false,
    tracing: true,
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
