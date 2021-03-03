<template>
  <transition name="el-fade-in">
    <div
      v-if="visible"
      :style="{
        'right': styleRight,
        'bottom': styleBottom
      }"
      class="el-backtop"
      @click.stop="handleClick"
    >
      <slot>
        <el-icon class="el-icon-caret-top" name="online" />
      </slot>
    </div>
  </transition>
</template>

<script>
import throttle from 'lodash/throttle'
import ElIcon from '@element-plus/icon'

export default {
  name: 'ElBacktop',

  components: {
    ElIcon,
  },

  props: {
    visibilityHeight: {
      type: Number,
      default: 200,
    },
    target: [String],
    right: {
      type: Number,
      default: 40,
    },
    bottom: {
      type: Number,
      default: 40,
    },
  },

  emits: ['click'],

  data() {
    return {
      el: null,
      container: null,
      visible: false,
    }
  },

  computed: {
    styleBottom() {
      return `${this.bottom}px`
    },
    styleRight() {
      return `${this.right}px`
    },
  },

  mounted() {
    this.init()
    this.throttledScrollHandler = throttle(this.onScroll)
    this.container.addEventListener('scroll', this.throttledScrollHandler)
  },

  beforeUnmount() {
    this.container.removeEventListener('scroll', this.throttledScrollHandler)
  },

  methods: {
    init() {
      this.container = document
      this.el = document.documentElement
      if (this.target) {
        this.el = document.querySelector(this.target)
        if (!this.el) {
          throw new Error(`target is not existed: ${this.target}`)
        }
        this.container = this.el
      }
    },
    onScroll() {
      const scrollTop = this.el.scrollTop
      this.visible = scrollTop >= this.visibilityHeight
    },
    handleClick(e) {
      this.scrollToTop()
      this.$emit('click', e)
    },
    scrollToTop() {
      let el = this.el
      let step = 0
      let interval = setInterval(() => {
        if (el.scrollTop <= 0) {
          clearInterval(interval)
          return
        }
        step += 10
        el.scrollTop -= step
      }, 20)
    },
  },
}
</script>
