<template>
  <div>
    <div class="header__brick" />
    <header class="header">
      <div class="header__container">
        <nuxt-link class="flex" to="/">
          <v-icon name="ant-design:home-filled" size-md="medium" class="text-primary" />
          <h1 class="text-primary text-2xl ml-1 hidden md:block">
            video-platform
          </h1>
        </nuxt-link>
        <input
          ref="searchInput"
          v-model="searchTextInput"
          type="text"
          class="search-bar"
          placeholder="Search"
          @keypress.enter="search()"
        >
        <v-icon class="ml-1" name="ant-design:search-outlined" button @click="search()" />
      </div>
    </header>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderBar',
  data () {
    return {
      searchTextInput: ''
    }
  },
  computed: {
    ...mapGetters('app', [
      'searchText'
    ]),
  },
  methods: {
    search () {
      this.$store.commit('app/setSearchText', this.searchTextInput)
      if (this.$refs.searchInput) this.$refs.searchInput.blur()
      if (this.$route.name !== 'Index') this.$router.push({ name: 'Index' })
    },
  }
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

.search-bar {
  display: block;
  width: 100%;
  max-width: 240px;
  background-color: transparent;
  height: 32px;
  padding: 2px 4px;
  border: none;
  border-bottom: 1px solid $gray-500;
  outline: none;
  transition: all .15s;
  margin-left: 24px;
  transition: all .15s;

  &:focus {
    border-bottom: 2px solid $primary;
  }
}
</style>
