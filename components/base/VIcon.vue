<template>
  <i
    :class="[
      'icon',
      color ? COLOR[color] : '',
      size ? SIZE[size] : '',
      sizeMd ? SIZE_MD[sizeMd] : '',
      sizeLg ? SIZE_LG[sizeLg] : '',
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
export const SIZE_MD = {
  small: 'is-md-small',
  default: 'is-md-default',
  medium: 'is-md-medium',
}
export const SIZE_LG = {
  small: 'is-lg-small',
  default: 'is-lg-default',
  medium: 'is-lg-medium',
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
    sizeMd: {
      type: String,
      default: undefined,
      validator (value) {
        return Object.keys(SIZE_MD).includes(value)
      }
    },
    sizeLg: {
      type: String,
      default: undefined,
      validator (value) {
        return Object.keys(SIZE_LG).includes(value)
      }
    }
  },
  data () {
    return {
      COLOR,
      SIZE,
      SIZE_MD,
      SIZE_LG,
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

  @include media-area('md') {
    &.is-md-small {
      width: 20px;
      height: 20px;
    }

    &.is-md-default {
      width: 24px;
      height: 24px;
    }

    &.is-md-medium {
      width: 32px;
      height: 32px;
    }
  }

  @include media-area('lg') {
    &.is-lg-small {
      width: 20px;
      height: 20px;
    }

    &.is-lg-default {
      width: 24px;
      height: 24px;
    }

    &.is-lg-medium {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
