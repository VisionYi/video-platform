<template>
  <div class="container">
    <video
      id="video"
      class="video-js vjs-default-skin"
      controls
      preload="auto"
      width="600px"
    >
      <source src="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8" type="application/x-mpegURL">
    </video>
    <div class="g-row">
      <div class="g-col-flexible">
        <h2 class="title">
          {{ video.title }}
        </h2>
      </div>
      <div class="g-col">
        <div class="heart">
          <heart v-model="video.isFavorite" size="medium" @change="changeHeart()" />
        </div>
      </div>
    </div>
    <p class="text">
      {{ video.content }}
    </p>
  </div>
</template>

<router>
{
  name: 'VideoDetail',
  meta: {
    keepAlive: false,
  }
}
</router>

<script>
import Heart from '@/components/Heart.vue'
import { addFavoriteVideos, getFavoriteVideos, getFormatData, removeFavoriteVideos } from '@/utils/helpers'
import 'video.js/dist/video-js.css'
import 'videojs-contrib-hls'
import videojs from 'video.js'

export default {
  name: 'VideoDetail',
  components: { Heart },
  data () {
    return {
      video: {
        id: '',
        title: '',
        content: '',
        image: '',
        time: '',
        isFavorite: false,
      },
      player: null,
      options: {
        bigPlayButton: false,
        textTrackDisplay: false,
        posterImage: true,
        errorDisplay: false,
        controlBar: true
      },
    }
  },

  fetchOnServer: false,

  async fetch () {
    const videoId = this.$route.query?.id
    if (!videoId) {
      this.routeErrorAction()
      return
    }
    await this.fetchData(videoId)
  },

  mounted () {
    this.player = videojs('video', this.options, () => { this.player.play() })
    const Component = videojs.getComponent('Component')
    const AdBar = videojs.extend(Component, {

      constructor (player, options) {
        Component.apply(this, arguments)

        player.on('pause', () => {
          this.el().style.display = 'block'
        })
        player.on('play', () => {
          this.el().style.display = 'none'
        })
        this.options = options
      },
      createEl () {
        return videojs.createEl('div', {
          className: 'vjs-ad-bar',
          textContent: '廣告！！'
        })
      },
    })

    videojs.registerComponent('AdBar', AdBar)
    this.player.addChild('AdBar')
  },

  beforeDestroy () {
    if (this.player) {
      this.player.dispose()
    }
  },

  methods: {
    async fetchData (id) {
      const { items } = await this.$api.videoListById(id)
      if (!items[0]) {
        this.routeErrorAction()
        return
      }

      this.video = {
        ...getFormatData(items[0]),
        isFavorite: getFavoriteVideos().map(i => i.id).includes(id)
      }
    },

    changeHeart () {
      if (this.isFavorite) {
        addFavoriteVideos(this.video)
      } else {
        removeFavoriteVideos(this.video.id)
      }
    },

    routeErrorAction () {
      this.$router.replace({ name: 'Index' })
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  padding: 16px;

  max-width: 724px;
}

.title {
  font-size: 20px;
  font-weight: bold;

  @include media-area('md') {
    font-size: 24px;
  }
  @include media-area('lg') {
    font-size: 28px;
  }
}
.text {
  word-break: break-word;
  word-wrap: break-word;
  white-space: pre-line; // add '\n' line break to text

  @include media-area('lg') {
    font-size: 18px;
  }
}

.heart {
  display: flex;
  align-items: center;

  @include media-area('md') {
    height: 36px;
  }
  @include media-area('lg') {
    height: 40px;
  }
}
</style>

<style lang="scss">
.video-js .vjs-ad-bar {
  background: rgba(0, 0, 0, 0.5);
  color: white;

  display: none;
  font-size: 2em;
  padding: .5em;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
}

.video-dimensions {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  overflow: hidden;

  &::before {
    content: '';
    float: left;
    padding-top: 56%; // 360 x 136 image size

  }

  &::after {
    content: '';
    display: block;
    clear: both;
  }
}
</style>
