<template>
  <div class="image">
    <div
      v-if="backgroundImage"
      v-lazy:background-image="src"
      class="image__background-image"
    />
    <img v-lazy="src" :alt="alt">
  </div>
</template>

<script>
export default {
  name: 'VImage',
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    backgroundImage: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.image {
  border-radius: inherit;

  &__background-image {
    display: block;
    border-radius: inherit;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-color: $gray-400;
    background-repeat: no-repeat;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }
}
</style>
