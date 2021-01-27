<template>
  <li class="NAMESPACE-timeline-item">
    <div class="NAMESPACE-timeline-item__tail"></div>

    <div
      v-if="!$slots.dot"
      class="NAMESPACE-timeline-item__node"
      :class="[
        `NAMESPACE-timeline-item__node--${size || ''}`,
        `NAMESPACE-timeline-item__node--${type || ''}`
      ]"
      :style="{
        backgroundColor: color
      }"
    >
      <i
        v-if="icon"
        class="NAMESPACE-timeline-item__icon"
        :class="icon"
      ></i>
    </div>
    <div v-if="$slots.dot" class="NAMESPACE-timeline-item__dot">
      <slot name="dot"></slot>
    </div>

    <div class="NAMESPACE-timeline-item__wrapper">
      <div
        v-if="!hideTimestamp && placement === 'top'"
        class="NAMESPACE-timeline-item__timestamp is-top"
      >
        {{ timestamp }}
      </div>

      <div class="NAMESPACE-timeline-item__content">
        <slot></slot>
      </div>

      <div
        v-if="!hideTimestamp && placement === 'bottom'"
        class="NAMESPACE-timeline-item__timestamp is-bottom"
      >
        {{ timestamp }}
      </div>
    </div>
  </li>
</template>

<script lang='ts'>
import { inject, defineComponent } from 'vue'

interface ITimeLineItemProps {
    timestamp: string
    hideTimestamp: boolean
    placement: string
    type: string
    color: string
    size: string
    icon: string
}

export default defineComponent({
  name: 'NAMESPACETimelineItem',
  props: {
    timestamp: {
      type: String,
      default: '',
    },
    hideTimestamp: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String,
      default: 'bottom',
    },
    type: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'normal',
    },
    icon: {
      type: String,
      default: '',
    },
  },
  setup() {
    inject('timeline')
  },
})
</script>
