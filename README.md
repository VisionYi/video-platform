# Video Platform
- 模仿 Youtube 網站影音平台的作品，支援 RWD
- [Dome Page](https://video-platform.netlify.app)
- [Storybook Page](https://video-platform.netlify.app/_storybook)
- [Design WireFrame](https://whimsical.com/wireframe-M17zBx8n7wSd2vDqi9yCXU)

## Tech Stack
- Nuxt.js v2
- Tailwind CSS v2
- Storybook
- Youtube Data API ([Document](https://developers.google.com/youtube/v3/docs))
- Analysis Tool - GA tag, Hotjar, Sentry
- Deploy on Netlify

## Start Development
create a '.env' files for environment variable, default content:
```
NUXT_ENV_PUBLIC_PATH = /
NUXT_ENV_YOUTUBE_KEY =
NUXT_ENV_GOOGLE_ANALYTICS_ID =
NUXT_ENV_HOTJAR_ID =

SENTRY_DSN =
SENTRY_DISABLED = false
```

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate

# storybook
$ npm run storybook
$ npm run build-storybook
```

## Next step
- [ ] research Vercel, then use server side render for this project.
- [ ] hidden header-bar when trigger window scroll event
