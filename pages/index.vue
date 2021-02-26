<template>
  <div class="container">
    <video-card-list
      ref="list"
      v-scroll="handleScroll"
      :cards="cards"
      :is-loading="isLoadingMore"
      @change-card-favorite="updateFavoriteIds($event)"
    />
  </div>
</template>

<script>
import VideoCardList from '@/components/VideoCardList.vue'
import { addFavoriteIds, getFavoriteIds, getFormatData, removeFavoriteIds } from '@/utils/helpers'

export default {
  components: { VideoCardList },
  directives: {
    scroll: {
      inserted (el, binding) {
        el.scrollCallback = (event) => {
          if (binding.value(el, event)) {
            window.removeEventListener('scroll', el.scrollCallback)
          }
        }
        window.addEventListener('scroll', el.scrollCallback)
      },

      unbind (el) {
        window.removeEventListener('scroll', el.scrollCallback)
      }
    }
  },
  data () {
    return {
      database: [],
      cards: [],
      page: 1,
      isEndPage: false,
      isLoadingMore: true,
    }
  },
  fetchOnServer: false,
  async fetch () {
    await this.initialDataBase()
    await this.fectData()
  },
  computed: {
  },
  methods: {
    async initialDataBase () {
      // because here are the limit 50 per calling API & maxTotal is 200
      const api = `https://youtube.googleapis.com/youtube/v3/videos?key=${process.env.NUXT_ENV_YOUTUBE_KEY}&part=snippet,contentDetails&chart=mostPopular&maxResults=50`
      const res = await fetch(api)
      const { nextPageToken, items } = await res.json()
      const res2 = await fetch(api + `&pageToken=${nextPageToken}`)
      const { items: items2 } = await res2.json()
      const totalItems = [...items, ...items2]

      // hard code: 100 items
      this.database = totalItems.map(i => getFormatData(i))
    },

    databaseByPage ({ page, count = 12 }) {
      const start = (page * 12) - 1
      return Promise.resolve(this.database.slice(start, start + count))
    },

    async fectData (page = 1, isEndPage = false, isWindowOverElementBottom = true) {
      if (isEndPage || !isWindowOverElementBottom) return

      this.page = page
      this.isLoadingMore = true
      const list = await this.databaseByPage({ page: this.page })

      this.cards.push(...list.map(item => ({ ...item, isFavorite: getFavoriteIds().includes(item.id) })))
      this.isEndPage = list.length === 0
      this.isLoadingMore = false

      await this.$nextTick()
      await this.fectData(
        this.page + 1,
        this.isEndPage,
        this.getIsWindowOverElementBottom(this.$refs.list?.$el ?? null)
      )
    },

    updateFavoriteIds (card) {
      if (card.isFavorite) {
        addFavoriteIds(card.id)
      } else {
        removeFavoriteIds(card.id)
      }
    },

    getIsWindowOverElementBottom (element) {
      // when the DOM rendering did not finished.
      if (!element) return false
      return element.getBoundingClientRect().top + element.offsetHeight < window.innerHeight
    },

    handleScroll (element) {
      if (this.isLoadingMore || this.isEndPage) return

      const isWindowOverElementBottom = this.getIsWindowOverElementBottom(element)
      if (isWindowOverElementBottom) {
        this.fectData(this.page + 1, this.isEndPage, isWindowOverElementBottom)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  padding: 16px;
}
</style>
