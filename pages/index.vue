<template>
  <div class="container">
    <div v-if="searchCount" class="mb-3">
      Quantity: {{ searchCount }}
    </div>
    <video-card-list
      ref="list"
      v-scroll="handleScroll"
      :cards="cards"
      :is-loading="isLoadingMore"
      @change-card-favorite="updateFavoriteIds($event)"
    />
  </div>
</template>

<router>
{
  name: 'Index',
  meta: {
    keepAlive: true,
  }
}
</router>

<script>
import VideoCardList from '@/components/VideoCardList.vue'
import { addFavoriteVideos, getFavoriteVideos, getFormatData, removeFavoriteVideos } from '@/utils/helpers'
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
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
      },
    }
  },
  data () {
    return {
      cards: [
        {
          id: '',
          title: '',
          content: '',
          image: '',
          time: '',
          isFavorite: false,
        }
      ],
      page: 1,
      isEndPage: false,
      isLoadingMore: true,
      nextPageToken: null, // for youtube API
      searchCount: 0,
      routeLeave: false,
    }
  },
  async fetch () {
    await this.fectData(this.searchText)
  },
  fetchOnServer: false,

  computed: {
    ...mapGetters('app', [
      'searchText'
    ]),
  },
  watch: {
    searchText (value) {
      this.reFetchData(value)
    }
  },
  created () {
    this.cards = []
  },
  activated () {
    this.routeLeave = false
    this.cards = this.cards.map(card => ({ ...card, isFavorite: getFavoriteVideos().map(i => i.id).includes(card.id) }))
  },
  deactivated () {
    this.routeLeave = true
  },
  methods: {
    async fectData (query = '', page = 1, isWindowOverElementBottom = true) {
      if (this.isEndPage || !isWindowOverElementBottom) return

      this.page = page
      this.isLoadingMore = true
      let videoList = []

      if (query) {
        const searchResult = await this.$api.videoSearch({ query, pageToken: this.nextPageToken })
        const videoIds = searchResult.items.map(item => item.id?.videoId ?? null)
        this.nextPageToken = searchResult.nextPageToken
        this.searchCount = searchResult.pageInfo?.totalResults

        if (videoIds.length !== 0) {
          const { items } = await this.$api.videoListById(videoIds)
          videoList = items
        }
      } else {
        const { nextPageToken, items } = await this.$api.videoList({ pageToken: this.nextPageToken })
        videoList = items
        this.nextPageToken = nextPageToken
      }

      const list = videoList.map(item => ({ ...getFormatData(item), isFavorite: getFavoriteVideos().map(i => i.id).includes(item.id) }))
      this.cards.push(...list)
      await this.$nextTick()

      this.isEndPage = !this.nextPageToken
      this.isLoadingMore = false

      await this.fectData(
        query,
        this.page + 1,
        this.getIsWindowOverElementBottom(this.$refs.list?.$el ?? null)
      )
    },

    reFetchData (query) {
      this.cards = []
      this.page = 1
      this.isEndPage = false
      this.nextPageToken = null
      this.searchCount = 0
      this.fectData(query, this.page)
    },

    updateFavoriteIds (card) {
      if (card.isFavorite) {
        addFavoriteVideos(card)
      } else {
        removeFavoriteVideos(card.id)
      }
    },

    getIsWindowOverElementBottom (element) {
      // when the DOM rendering did not finished.
      if (!element) return false
      return element.getBoundingClientRect().top + element.offsetHeight < window.innerHeight
    },

    handleScroll (element) {
      if (this.isLoadingMore || this.isEndPage || this.routeLeave) return

      const isWindowOverElementBottom = this.getIsWindowOverElementBottom(element)
      if (isWindowOverElementBottom) {
        this.fectData(
          this.searchText,
          this.page + 1,
          isWindowOverElementBottom,
        )
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
