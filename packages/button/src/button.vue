<template>
  <button
    class="el-buttomm el-button"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-square': square,
        'is-icon': (icon || loading) && $slots.default
      },
    ]"
    @click="handleClick"
  >
    <span class="el-button-flex">
      <i v-if="loading" class="el-icon-loading"></i>
      <i v-if="icon && !loading" :class="icon"></i>
      <span v-if="$slots.default" class="el-button-flex el-button-slot"><slot></slot></span>
    </span>
  </button>
</template>
<script>

const ELEMENT_DEFAULT = {}

export default {
  name: 'ElButton',

  inject: {
    elForm: {
      default: '',
    },
    elFormItem: {
      default: '',
    },
  },
  // directives: {
  //   ripple
  // },
  props: {
    type: {
      type: String,
      default: 'default',
    },
    size: String,
    icon: {
      type: String,
      default: '',
    },
    nativeType: {
      type: String,
      default: 'button',
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    square: Boolean,
  },

  emits: ['click'],

  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize
    },
    ripple() {
      return (this.$ELEMENT || ELEMENT_DEFAULT).ripple
    },
    buttonSize() {
      return (
        this.size ||
        this._elFormItemSize ||
        (this.$ELEMENT || ELEMENT_DEFAULT).size
      )
    },
    buttonDisabled() {
      return this.disabled || (this.elForm || {}).disabled
    },
  },

  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    },
  },
}
</script>
