<template>
  <div>
    <div class="header__brick" />
    <header class="header">
      <nuxt-link class="header__container" to="/">
        <v-icon name="ant-design:home-filled" size-md="medium" class="text-primary" />
        <h1 class="text-primary text-2xl ml-1">
          video-platform
        </h1>
      </nuxt-link>
    </header>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  z-index: $z-index-header;
  background-color: $gray-100;

  @include media-area('md-down') {
    @apply shadow;
  }

  @include media-area('md') {
    height: 52px;
  }
  @include media-area('lg') {
    height: 60px;
  }

  &__container {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 12px;

    @include media-area('md') {
      padding-left: 76px;
    }
  }

  &__brick {
    width: 100%;
    height: 44px;

    @include media-area('md') {
      height: 52px;
    }
    @include media-area('lg') {
      height: 60px;
    }
  }
}
</style>
