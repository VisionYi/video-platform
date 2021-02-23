<template>
  <button class="btn" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'VButton',
}
</script>

<style lang="scss" scoped>
.btn {
  display: inline-block;
  position: relative;
  text-align: center;
  background-color: $primary;
  color: #fff;
  border-radius: 4px;
  padding: 4px 16px;
  border-width: 0;
  user-select: none;
  @apply transition-all;

  &:focus,
  &:hover {
    outline: none;
    background-color: $primary-light;
    @apply shadow-md;
  }

  &:active {
    outline: none;
    box-shadow: none;
  }
}
</style>
