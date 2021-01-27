<template>
  <NAMESPACE-popper
    v-model:visible="visible"
    trigger="click"
    effect="light"
    popper-class="NAMESPACE-popover"
    append-to-body
  >
    <div class="NAMESPACE-popconfirm">
      <p class="NAMESPACE-popconfirm__main">
        <i
          v-if="!hideIcon"
          :class="icon"
          class="NAMESPACE-popconfirm__icon"
          :style="{color: iconColor}"
        ></i>
        {{ title }}
      </p>
      <div class="NAMESPACE-popconfirm__action">
        <NAMESPACE-button
          size="mini"
          :type="cancelButtonType"
          @click="cancel"
        >
          {{ cancelButtonText_ }}
        </NAMESPACE-button>
        <NAMESPACE-button
          size="mini"
          :type="confirmButtonType"
          @click="confirm"
        >
          {{ confirmButtonText_ }}
        </NAMESPACE-button>
      </div>
    </div>
    <template #trigger>
      <slot name="reference"></slot>
    </template>
  </NAMESPACE-popper>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import NAMESPACEButton from '@element-plus/button'
import NAMESPACEPopper from '@element-plus/popper'
import { t } from '../../locale'

export default defineComponent({
  name: 'NAMESPACEPopconfirm',

  components: {
    NAMESPACEButton,
    NAMESPACEPopper,
  },

  props: {
    title: {
      type: String,
    },
    confirmButtonText: {
      type: String,
    },
    cancelButtonText: {
      type: String,
    },
    confirmButtonType: {
      type: String,
      default: 'primary',
    },
    cancelButtonType: {
      type: String,
      default: 'text',
    },
    icon: {
      type: String,
      default: 'NAMESPACE-icon-question',
    },
    iconColor: {
      type: String,
      default: '#f90',
    },
    hideIcon: {
      type: Boolean,
      default: false,
    },
  },
  emits:['confirm','cancel'],
  setup(props,{ emit }){
    const visible = ref(false)
    const confirm = () => {
      visible.value = false
      emit('confirm')
    }
    const cancel = () => {
      visible.value = false
      emit('cancel')
    }
    const confirmButtonText_ = computed(() => {
      return props.confirmButtonText || t('el.popconfirm.confirmButtonText')
    })
    const cancelButtonText_ = computed(() => {
      return props.cancelButtonText || t('el.popconfirm.cancelButtonText')
    })
    return {
      visible,
      confirm,
      cancel,
      confirmButtonText_,
      cancelButtonText_,
    }
  },
})
</script>
