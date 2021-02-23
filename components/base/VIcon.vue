<template>
  <i
    :class="[
      'icon',
      color ? COLOR[color] : '',
      size ? SIZE[size] : '',
    ]"
    @click="$emit('click', $event)"
  >
    <span class="iconify" :data-icon="name" data-inline="false" />
  </i>
</template>

<script>
export const COLOR = {
  primary: 'is-primary',
}
export const SIZE = {
  small: 'is-small',
  medium: 'is-medium',
}

export default {
  name: 'VIcon',
  props: {
    name: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: undefined,
      validator (value) {
        return Object.keys(SIZE).includes(value)
      }
    },
    color: {
      type: String,
      default: undefined,
      validator (value) {
        return Object.keys(COLOR).includes(value)
      }
    },
  },
  data () {
    return {
      COLOR,
      SIZE,
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  display: inline-flex;
  width: 24px;
  height: 24px;
  color: inherit;
  line-height: 1;
  vertical-align: top;
  transition: inherit;

  /deep/ {
    svg {
      width: 100%;
      height: 100%;
    }
  }

  &.is-primary /deep/ {
    .iconify {
      color: $primary;
    }
  }

  &.is-small {
    width: 20px;
    height: 20px;
  }

  &.is-medium {
    width: 32px;
    height: 32px;
  }
}
</style>
