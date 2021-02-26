<template>
  <div>
    <div class="navbar__brick" />
    <div class="navbar">
      <div class="navbar__container">
        <nuxt-link class="navbar__tab" to="/my-favorite">
          <v-icon name="carbon:user-favorite" size="small" size-md="default" />
          <p>我的最愛</p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: $z-index-navbar;
  width: 100%;
  height: 52px;
  background-color: #fff;
  border-top: 1px solid $gray-300;

  @include media-area('md') {
    width: 76px;
    height: 100%;
    border-top: none;
    background-color: $gray-100;
  }

  &__container {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 24px;

    @include media-area('md') {
      flex-direction: column;
      height: auto;
      padding: 60px 0 24px 0;
    }
  }

  &__tab {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 16px;
    text-align: center;
    cursor: pointer;

    &:hover {
      color: $primary-light;
    }

    @include media-area('md') {
      width: 100%;
      height: auto;
      padding: 16px 0;
    }

    &.nuxt-link-active {
      color: $primary;
    }
  }

  p {
    font-size: 12px;
    white-space: nowrap;

    @include media-area('md') {
      font-size: 14px;
    }
  }

  &__brick {
    width: 0;

    @include media-area('md') {
      height: 100vh;
      width: 76px;
    }
  }
}
</style>
