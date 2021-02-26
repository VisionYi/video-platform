<template>
  <div class="g-row">
    <div class="g-col">
      <navbar />
    </div>
    <div class="g-col-flexible mb-16 md:mb-4">
      <header-bar />
      <Nuxt />
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue'
import Navbar from '~/components/Navbar.vue'
export default {
  components: { HeaderBar, Navbar },
}
</script>
