<template>
  <div class="card">
    <figure class="card__figure">
      <v-image class="card__image" :src="image" background-image />
      <span class="card__time">{{ time }}</span>
    </figure>
    <div class="py-2 px-1">
      <div class="g-row items-center">
        <div class="g-col-flexible mr-1">
          <h2>{{ title }}</h2>
        </div>
        <div class="g-col">
          <heart v-model="isFavoriteInner" @click.native.stop />
        </div>
      </div>
      <p>
        {{ content }}
      </p>
    </div>
  </div>
</template>

<script>
import Heart from '@/components/Heart.vue'

export default {
  name: 'VideoCard',
  components: { Heart },
  props: {
    title: {
      type: String,
      default: '',
    },
    time: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isFavoriteInner: {
      get () {
        return this.isFavorite
      },
      set (value) {
        this.$emit('update:isFavorite', value)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;

  &:hover {
    background-color: $gray-100;
  }

  &__figure {
    position: relative;
  }

  &__image {
    display: block;
    width: 100%;
    border-radius: 4px;
    overflow: hidden;

    &::before {
      content: '';
      float: left;
      padding-top: 56.25%; // 16 : 9 image size
    }

    &::after {
      content: '';
      display: block;
      clear: both;
    }

    /deep/ .image__background-image {
      position: absolute;
    }
  }

  &__time {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0 2px;
    background-color: rgba($color: $gray-100, $alpha: 0.6);
  }

  h2 {
    font-size: 18px;
    font-weight: bold;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  p {
    font-size: 14px;
    margin-top: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
</style>
