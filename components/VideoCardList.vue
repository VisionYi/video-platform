<template>
  <div class="list">
    <div v-if="cards.length !== 0" class="g-row g-gap-5">
      <div v-for="card in cards" :key="card.id" class="g-col-12 g-col-md-6 g-col-lg-3">
        <nuxt-link :to="`/video/${card.id}`">
          <video-card
            :title="card.title"
            :content="card.content"
            :time="card.time"
            :image="card.image"
            :is-favorite.sync="card.isFavorite"
            @update:isFavorite="$emit('change-card-favorite', card)"
          />
        </nuxt-link>
      </div>
    </div>
    <div v-show="cards.length === 0 && !isLoading" class="list__empty">
      No Video
    </div>
    <div v-show="isLoading" class="list__loading">
      <v-icon class="animate-spin" name="ant-design:loading-3-quarters-outlined" />
    </div>
  </div>
</template>

<script>
import VideoCard from '@/components/VideoCard.vue'

export default {
  name: 'VideoCardList',
  components: { VideoCard },
  props: {
    isLoading: Boolean,
    cards: {
      type: Array,
      default: () => [
        {
          id: '1',
          title: 'title title~~',
          content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
          time: '10:10',
          image: 'https://fakeimg.pl/500x300',
          isFavorite: false,
        }
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.list {

  &__empty,
  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 24px;
    color: $gray-500;
    margin: 16px;
  }
}
</style>
