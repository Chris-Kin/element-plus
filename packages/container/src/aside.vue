<template>
  <aside class="NAMESPACE-aside" :style="{ width }">
    <slot></slot>
  </aside>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NAMESPACEAside',
  props: {
    width: {
      type: String,
      default: '300px',
    },
  },
})
</script>
