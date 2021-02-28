<template>
  <button class="heart" :class="{ 'is-checked': checkedInner }" title="My Favorite">
    <input v-model="checkedInner" type="checkbox">
    <v-icon v-show="checkedInner" :size="size" name="ant-design:heart-filled" class="text-red-500" />
    <v-icon v-show="!checkedInner" :size="size" name="ant-design:heart-outlined" class="text-red-500" />
  </button>
</template>

<script>
export default {
  name: 'Heart',
  model: {
    event: 'change',
    prop: 'checked'
  },
  props: {
    checked: Boolean,
    size: {
      type: String,
      default: undefined
    },
  },
  computed: {
    checkedInner: {
      get () {
        return this.checked
      },
      set (value) {
        return this.$emit('change', value)
      },
    }
  }
}
</script>

<style lang="scss" scoped>
.heart {
  display: inline-block;
  position: relative;

  &:hover {
    opacity: 0.6;
  }

  input[type=checkbox] {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    z-index: 1;
    cursor: pointer;
  }
}
</style>
