<template>
  <header class="NAMESPACE-header" :style="{ height }">
    <slot></slot>
  </header>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NAMESPACEHeader',
  props: {
    height: {
      type: String,
      default: '60px',
    },
  },
})
</script>
