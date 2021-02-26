<template>
  <div class="container">
    <div class="flex flex-col lg:flex-row">
      <div class="lg:w-2/6">
        <h2 class="text-3xl">
          喜歡的影片
        </h2>
        <p class="mt-2 mb-8 text-xl">
          數量：{{ count }}
        </p>
        <hr class="mb-4 lg:hidden">
      </div>
      <div class="lg:w-4/6">
        <favorite-card-list
          :cards="cards"
          @change-card-favorite="updateFavoriteIds($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FavoriteCardList from '~/components/FavoriteCardList.vue'
import { getFavoriteIds, getFormatData, removeFavoriteIds } from '~/utils/helpers'
export default {
  name: 'MyFavorite',
  components: { FavoriteCardList },
  data () {
    return {
      count: 0,
      cards: [],
    }
  },
  fetchOnServer: false,
  async fetch () {
    await this.fetchData()
    this.count = getFavoriteIds().length
  },
  methods: {
    async fetchData () {
      const { items } = await this.$api.videoListById(getFavoriteIds())
      this.cards = items.map(i => ({ ...getFormatData(i), isFavorite: true }))
    },

    updateFavoriteIds (card) {
      if (!card.isFavorite) {
        const index = this.cards.findIndex(i => i.id === card.id)
        this.cards.splice(index, 1)
        removeFavoriteIds(card.id)
        this.count -= 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  padding: 16px;
}
</style>
