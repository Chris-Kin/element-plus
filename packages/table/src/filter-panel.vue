<template>
  <NAMESPACE-popper
    ref="tooltip"
    v-model:visible="tooltipVisible"
    :offset="0"
    :placement="placement"
    :show-arrow="false"
    :stop-popper-mouse-event="false"
    effect="light"
    pure
    manual-mode
    popper-class="NAMESPACE-table-filter"
    append-to-body
  >
    <template #default>
      <div v-if="multiple">
        <div class="NAMESPACE-table-filter__content">
          <NAMESPACE-scrollbar wrap-class="NAMESPACE-table-filter__wrap">
            <NAMESPACE-checkbox-group
              v-model="filteredValue"
              class="NAMESPACE-table-filter__checkbox-group"
            >
              <NAMESPACE-checkbox
                v-for="filter in filters"
                :key="filter.value"
                :label="filter.value"
              >
                {{ filter.text }}
              </NAMESPACE-checkbox>
            </NAMESPACE-checkbox-group>
          </NAMESPACE-scrollbar>
        </div>
        <div class="NAMESPACE-table-filter__bottom">
          <button
            :class="{ 'is-disabled': filteredValue.length === 0 }"
            :disabled="filteredValue.length === 0"
            type
            @click="handleConfirm"
          >
            {{ t('el.table.confirmFilter') }}
          </button>
          <button type @click="handleReset">
            {{ t('el.table.resetFilter') }}
          </button>
        </div>
      </div>
      <ul v-else class="NAMESPACE-table-filter__list">
        <li
          :class="{
            'is-active': filterValue === undefined || filterValue === null,
          }"
          class="NAMESPACE-table-filter__list-item"
          @click="handleSelect(null)"
        >
          {{ t('el.table.clearFilter') }}
        </li>
        <li
          v-for="filter in filters"
          :key="filter.value"
          :class="{ 'is-active': isActive(filter) }"
          :label="filter.value"
          class="NAMESPACE-table-filter__list-item"
          @click="handleSelect(filter.value)"
        >
          {{ filter.text }}
        </li>
      </ul>
    </template>
    <template #trigger>
      <span
        v-click-outside:[popperPaneRef]="hideFilterPanel"
        class="NAMESPACE-table__column-filter-trigger NAMESPACE-none-outline"
        @click="showFilterPanel"
      >
        <i
          :class="[
            'NAMESPACE-icon-arrow-down',
            column.filterOpened ? 'NAMESPACE-icon-arrow-up' : '',
          ]"
        ></i>
      </span>
    </template>
  </NAMESPACE-popper>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  getCurrentInstance,
  watch,
  WritableComputedRef,
  PropType,
} from 'vue'
import NAMESPACEPopper from '@element-plus/popper'
import { t } from '@element-plus/locale'
import NAMESPACECheckbox from '@element-plus/checkbox'
import NAMESPACECheckboxGroup from '@element-plus/checkbox-group'
import NAMESPACEScrollbar from '@element-plus/scrollbar'
import { ClickOutside } from '@element-plus/directives'

import { Store, TableColumnCtx, TableHeader } from './table.type'

export default defineComponent({
  name: 'NAMESPACETableFilterPanel',
  components: {
    NAMESPACECheckbox,
    NAMESPACECheckboxGroup,
    NAMESPACEScrollbar,
    NAMESPACEPopper,
  },
  directives: { ClickOutside },
  props: {
    placement: {
      type: String,
      default: 'bottom-start',
    },
    store: {
      type: Object as PropType<Store>,
    },
    column: {
      type: Object as PropType<TableColumnCtx>,
    },
    upDataColumn: {
      type: Function,
    },
  },
  setup(props) {
    const instance = getCurrentInstance()
    const parent = instance.parent as TableHeader
    if (!parent.filterPanels.value[props.column.id]) {
      parent.filterPanels.value[props.column.id] = instance
    }
    const tooltipVisible = ref(false)
    const tooltip = ref(null)
    const filters = computed(() => {
      return props.column && props.column.filters
    })
    const filterValue = computed({
      get: () => (props.column.filteredValue || [])[0],
      set: (value: string) => {
        if (filteredValue.value) {
          if (typeof value !== 'undefined' && value !== null) {
            filteredValue.value.splice(0, 1, value)
          } else {
            filteredValue.value.splice(0, 1)
          }
        }
      },
    })
    const filteredValue: WritableComputedRef<unknown[]> = computed({
      get() {
        if (props.column) {
          return props.column.filteredValue || []
        }
        return []
      },
      set(value: unknown[]) {
        if (props.column) {
          props.upDataColumn('filteredValue', value)
        }
      },
    })
    const multiple = computed(() => {
      if (props.column) {
        return props.column.filterMultiple
      }
      return true
    })
    const isActive = filter => {
      return filter.value === filterValue.value
    }
    const hidden = () => {
      tooltipVisible.value = false
    }
    const showFilterPanel = (e: MouseEvent) => {
      e.stopPropagation()
      tooltipVisible.value = !tooltipVisible.value
    }
    const hideFilterPanel = () => {
      tooltipVisible.value = false
    }
    const handleConfirm = () => {
      confirmFilter(filteredValue.value)
      hidden()
    }
    const handleReset = () => {
      filteredValue.value = []
      confirmFilter(filteredValue.value)
      hidden()
    }
    const handleSelect = (_filterValue?: string | string[]) => {
      filterValue.value = _filterValue
      if (typeof _filterValue !== 'undefined' && _filterValue !== null) {
        confirmFilter(filteredValue.value)
      } else {
        confirmFilter([])
      }
      hidden()
    }
    const confirmFilter = (filteredValue: unknown[]) => {
      props.store.commit('filterChange', {
        column: props.column,
        values: filteredValue,
      })
      props.store.updateAllSelected()
    }
    watch(
      tooltipVisible,
      value => {
        // todo
        if (props.column) {
          props.upDataColumn('filterOpened', value)
        }
      },
      {
        immediate: true,
      },
    )

    const popperPaneRef = computed(() => {
      return tooltip.value?.popperRef
    })

    return {
      tooltipVisible,
      multiple,
      filteredValue,
      filterValue,
      filters,
      handleConfirm,
      handleReset,
      handleSelect,
      isActive,
      t,
      showFilterPanel,
      hideFilterPanel,
      popperPaneRef,
      tooltip,
    }
  },
})
</script>
