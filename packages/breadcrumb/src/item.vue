<template>
  <span class="el-breadcrumb__item">
    <span
      ref="link"
      :class="['el-breadcrumb__inner', to ? 'is-link' : '', disabled ? 'is-disabled': '']"
      role="link"
    >
      <slot></slot>
    </span>
    <i v-if="separatorClass" class="el-breadcrumb__separator" :class="separatorClass"></i>
    <span v-else class="el-breadcrumb__separator" role="presentation">{{ separator }}</span>
  </span>
</template>
<script>
export default {
  name: 'ElBreadcrumbItem',

  inject: ['elBreadcrumb'],
  props: {
    to: {
      type: Object,
    },
    replace: Boolean,
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      separator: '',
      separatorClass: '',
    }
  },

  mounted() {
    this.separator = this.elBreadcrumb.separator
    this.separatorClass = this.elBreadcrumb.separatorClass
    const link = this.$refs.link
    link.setAttribute('role', 'link')
    link.addEventListener('click', () => {
      if (this.disabled) return
      const { to, $router } = this
      if (!to || !$router) return
      this.replace ? $router.replace(to) : $router.push(to)
    })
  },
}
</script>
