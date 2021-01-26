<template>
  <i :class="`NAMESPACE-icon-${name}`"></i>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NAMESPACEIcon',
  props: {
    name: {
      type: String,
      default: '',
    },
  },
})
</script>
