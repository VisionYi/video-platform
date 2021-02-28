<template>
  <div class="container">
    <div class="flex flex-col lg:flex-row">
      <div class="lg:w-2/6">
        <h2 class="text-3xl">
          My Favorite Videos.
        </h2>
        <p class="mt-2 mb-8 text-xl">
          Quantity: {{ count }}
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

<router>
{
  name: 'MyFavorite',
  meta: {
    keepAlive: false,
  }
}
</router>

<script>
import FavoriteCardList from '~/components/FavoriteCardList.vue'
import { getFavoriteVideos, removeFavoriteVideos } from '~/utils/helpers'

export default {
  name: 'MyFavorite',
  components: { FavoriteCardList },
  data () {
    return {
      count: 0,
      cards: [
        {
          id: '',
          title: '',
          content: '',
          image: '',
          time: '',
          isFavorite: true,
        }
      ],
    }
  },
  async fetch () {
    await this.fetchData()
    this.count = getFavoriteVideos().length
  },
  created () {
    this.cards = []
  },
  fetchOnServer: false,
  methods: {
    fetchData () {
      this.cards = getFavoriteVideos().map(i => ({ ...i, isFavorite: true }))
      return Promise.resolve()
    },

    updateFavoriteIds (card) {
      if (!card.isFavorite) {
        const index = this.cards.findIndex(i => i.id === card.id)
        this.cards.splice(index, 1)
        removeFavoriteVideos(card.id)
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
