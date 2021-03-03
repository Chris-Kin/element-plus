<template>
  <transition name="el-zoom-in-top">
    <div
      v-show="visible"
      class="el-alert"
      :class="[typeClass, center ? 'is-center' : '', 'is-' + effect,isClosable, isIcon, isTitle, mini && `el-alert--mini`]"
      role="alert"
    >
      <i v-if="showIcon" class="el-alert__icon" :class="[ iconClass ]"></i>
      <div class="el-alert__content">
        <span v-if="title || $slots.title" class="el-alert__title" :class="[ isBoldTitle, isTitle ]">
          <slot name="title">{{ title }}</slot>
        </span>
        <div
          v-if="$slots.default && !description"
          class="el-alert__description"
          :class="{
            hasTitle: title || $slots.title
          }"
        >
          <slot></slot>
        </div>
        <p
          v-if="description && !$slots.default"
          class="el-alert__description"
          :class="{
            hasTitle: title || $slots.title
          }"
        >
          {{ description }}
        </p>
        <i
          v-show="closable"
          class="el-alert__closebtn"
          :class="{ 'is-customed': closeText !== '', 'sys-icon-close': closeText === '' }"
          @click="close()"
        >{{ closeText }}</i>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
const TYPE_CLASSES_MAP = {
  'success': 'sys-icon-checkbox-circle-fill',
  'warning': 'sys-icon-error-warning-fill',
  'error': 'sys-icon-close-circle-fill',
}
export default {
  name: 'ElAlert',

  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'info',
    },
    closable: {
      type: Boolean,
      default: true,
    },
    closeText: {
      type: String,
      default: '',
    },
    showIcon: Boolean,
    center: Boolean,
    effect: {
      type: String,
      default: 'light',
      validator: function(value) {
        return ['light', 'dark'].indexOf(value) !== -1
      },
    },
    // size: {
    //   type: String,
    //   default: 'medium',
    //   validator: function(value) {
    //     return ['medium', 'small'].indexOf(value) !== -1;
    //   }
    // }
    mini: Boolean,
  },

  emits: ['close'],

  data() {
    return {
      visible: true,
    }
  },

  computed: {
    typeClass() {
      return `el-alert--${ this.type }`
    },

    iconClass() {
      return TYPE_CLASSES_MAP[this.type] || 'sys-icon-information-fill'
    },

    isBoldTitle() {
      return (this.description || this.$slots.default) ? 'is-bold' : ''
    },
    isTitle() {
      return (this.description || this.$slots.default) ? 'is-title' : ''
    },
    isClosable() {
      return this.closable ? 'is-closable' : ''
    },
    isIcon() {
      return this.showIcon ? 'is-icon' : ''
    },
  },

  methods: {
    close() {
      this.visible = false
      this.$emit('close')
    },
  },
}
</script>
