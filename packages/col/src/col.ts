import { defineComponent, computed, inject, h } from 'vue'
import type { PropType } from 'vue'

type SizeObject = {
  span: number
  offset: number
}
const NAMESPACECol = defineComponent({
  name: 'NAMESPACECol',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    span: {
      type: Number,
      default: 24,
    },
    offset: {
      type: Number,
      default: 0,
    },
    pull: {
      type: Number,
      default: 0,
    },
    push: {
      type: Number,
      default: 0,
    },
    xs: {
      type: [Number, Object] as PropType<number | SizeObject>,
      default: () => ({} as SizeObject),
    },
    sm: {
      type: [Number, Object] as PropType<number | SizeObject>,
      default: () => ({} as SizeObject),
    },
    md: {
      type: [Number, Object] as PropType<number | SizeObject>,
      default: () => ({} as SizeObject),
    },
    lg: {
      type: [Number, Object] as PropType<number | SizeObject>,
      default: () => ({} as SizeObject),
    },
    xl: {
      type: [Number, Object] as PropType<number | SizeObject>,
      default: () => ({} as SizeObject),
    },
  },
  setup(props, { slots }) {
    const gutter = inject('NAMESPACERow', 0)

    const style = computed(() => {
      if (gutter) {
        return {
          paddingLeft: gutter / 2 + 'px',
          paddingRight: gutter / 2 + 'px',
        }
      }
      return {}
    })
    const classList = computed(() => {
      const ret: string[] = []
      const pos = ['span', 'offset', 'pull', 'push'] as const
      pos.forEach(prop => {
        const size = props[prop]
        if (typeof size === 'number' && size > 0) {
          ret.push(prop !== 'span' ? `NAMESPACE-col-${prop}-${props[prop]}` : `NAMESPACE-col-${props[prop]}`)
        }
      })
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
      sizes.forEach(size => {
        if (typeof props[size] === 'number') {
          ret.push(`NAMESPACE-col-${size}-${props[size]}`)
        } else if (typeof props[size] === 'object') {
          const sizeProps = props[size]
          Object.keys(sizeProps).forEach(prop => {
            ret.push(
              prop !== 'span' ? `NAMESPACE-col-${size}-${prop}-${sizeProps[prop]}` : `NAMESPACE-col-${size}-${sizeProps[prop]}`,
            )
          })
        }
      })
      // this is for the fix
      if (gutter) {
        ret.push('is-guttered')
      }

      return ret
    })

    return () => h(
      props.tag,
      {
        class: ['NAMESPACE-col', classList.value],
        style: style.value,
      },
      slots.default?.(),
    )
  },
})

export default NAMESPACECol
