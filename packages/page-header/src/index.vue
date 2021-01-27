<template>
  <div class="NAMESPACE-page-header">
    <div class="NAMESPACE-page-header__left" @click="handleClick">
      <i class="NAMESPACE-icon-back"></i>
      <div class="NAMESPACE-page-header__title">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <div class="NAMESPACE-page-header__content">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import { t } from '@element-plus/locale'

export default defineComponent({
  name: 'NAMESPACEPageHeader',
  props: {
    title: {
      type: String,
      default: () => t('el.pageHeader.title'),
    },
    content: {
      type: String,
      default: '',
    },
  },
  emits: ['back'],
  setup(props, { emit }) {

    function handleClick() {
      emit('back')
    }

    return {
      handleClick,
    }
  },
})
</script>
