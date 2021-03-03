<script>
import {
  h,
} from 'vue'

import BreadCrumbItem from './item.vue'
export default {
  name: 'ElBreadcrumb',
  components: {
    BreadCrumbItem,
  },

  provide() {
    return {
      elBreadcrumb: this,
    }
  },

  props: {
    separator: {
      type: String,
      default: '/',
    },
    separatorClass: {
      type: String,
      default: '',
    },
    foldCount: {
      type: Number,
      default: 6,
    },
    mini: {
      type: Boolean,
    },
  },
  data() {
    return {
      $slotsDefaultCache: [],
      showAllItem: false,
    }
  },

  created() {
    this.$slotsDefaultCache = this.$slots.default().filter(({ type }) => type && type.name?.includes('BreadcrumbItem'))
    console.log('slotsDefaultCache', this.$slotsDefaultCache)
  },

  mounted() {
    const items = this.$el.querySelectorAll('.el-breadcrumb__item')
    if (items.length) {
      items[items.length - 1].setAttribute('aria-current', 'page')
    }
  },
  render: function() {
    let slots
    if (!this.showAllItem && this.$slotsDefaultCache.length >= this.foldCount) {
      const foldItem = h(BreadCrumbItem, {
        class: {
          'el-breadcrumb__fold-item': true,
          'el-breadcrumb__fxxxk': true,
        },
        onClick: () => {
          console.log('sdsfd')
          this.showAllItem = !this.showAllItem
        },
      }, '...')
      slots = [this.$slotsDefaultCache[0], foldItem, ...this.$slotsDefaultCache.slice(this.$slotsDefaultCache.length - 3)]
    } else {
      slots = this.$slotsDefaultCache
    }
    console.log(slots)
    return h('div', {
      class: {
        'el-breadcrumb': true,
        'el-breadcrumb--mini': this.mini,
      },
      'fuuuu': this.showAllItem,
      'aria-label': 'Breadcrumb',
      'role': 'navigation',
    }, [...slots])
  },
}
</script>
