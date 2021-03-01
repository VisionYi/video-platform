<template>
  <div class="card">
    <div class="g-row">
      <div class="g-col">
        <figure class="card__figure">
          <v-image class="card__image" :src="image" background-image />
          <span class="card__time">{{ time }}</span>
        </figure>
      </div>
      <div class="g-col-flexible">
        <div class="card__content">
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
    </div>
  </div>
</template>

<script>
import Heart from '@/components/Heart.vue'

export default {
  name: 'FavoriteCard',
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
    width: 112px;

    @include media-area('md') {
      width: 156px;
    }
    @include media-area('lg') {
      width: 200px;
    }
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
    font-size: 14px;

    @include media-area('md') {
      font-size: 16px;
    }
  }

  &__content {
    padding: 0 8px;

    @include media-area('md') {
      padding: 0 12px;
    }
  }

  h2 {
    font-size: 16px;
    font-weight: bold;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    @include media-area('md') {
      font-size: 18px;
    }
  }

  p {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    font-size: 14px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    @include media-area('md') {
      margin-top: 4px;
      -webkit-line-clamp: 3;
    }

    @include media-area('lg') {
      -webkit-line-clamp: 4;
    }
  }
}
</style>
