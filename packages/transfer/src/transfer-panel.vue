<template>
  <div class="NAMESPACE-transfer-panel">
    <p class="NAMESPACE-transfer-panel__header">
      <NAMESPACE-checkbox
        v-model="allChecked"
        :indeterminate="isIndeterminate"
        @change="handleAllCheckedChange"
      >
        {{ title }}
        <span>{{ checkedSummary }}</span>
      </NAMESPACE-checkbox>
    </p>

    <div
      :class="['NAMESPACE-transfer-panel__body', hasFooter ? 'is-with-footer' : '']"
    >
      <NAMESPACE-input
        v-if="filterable"
        v-model="query"
        class="NAMESPACE-transfer-panel__filter"
        size="small"
        :placeholder="placeholder"
        @mouseenter="inputHover = true"
        @mouseleave="inputHover = false"
      >
        <template #prefix>
          <i
            :class="['NAMESPACE-input__icon', 'NAMESPACE-icon-' + inputIcon]"
            @click="clearQuery"
          ></i>
        </template>
      </NAMESPACE-input>
      <NAMESPACE-checkbox-group
        v-show="!hasNoMatch && data.length > 0"
        v-model="checked"
        :class="{ 'is-filterable': filterable }"
        class="NAMESPACE-transfer-panel__list"
      >
        <NAMESPACE-checkbox
          v-for="item in filteredData"
          :key="item[keyProp]"
          class="NAMESPACE-transfer-panel__item"
          :label="item[keyProp]"
          :disabled="item[disabledProp]"
        >
          <option-content
            :option="optionRender(item)"
          />
        </NAMESPACE-checkbox>
      </NAMESPACE-checkbox-group>
      <p v-show="hasNoMatch || data.length === 0" class="NAMESPACE-transfer-panel__empty">
        {{ hasNoMatch ? t('el.transfer.noMatch') : t('el.transfer.noData') }}
      </p>
    </div>
    <p v-if="hasFooter" class="NAMESPACE-transfer-panel__footer">
      <slot></slot>
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { t } from '@element-plus/locale'
import NAMESPACECheckbox from '@element-plus/checkbox'
import NAMESPACECheckboxGroup from '@element-plus/checkbox-group'
import NAMESPACEInput from '@element-plus/input'
import { useCheck, CHECKED_CHANGE_EVENT } from './useCheck'

export default defineComponent({
  name: 'NAMESPACETransferPanel',

  components: {
    NAMESPACECheckboxGroup,
    NAMESPACECheckbox,
    NAMESPACEInput,
    OptionContent: ({ option }) => option,
  },

  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
    optionRender: Function,
    placeholder: String,
    title: String,
    filterable: Boolean,
    format: Object,
    filterMethod: Function,
    defaultChecked: Array,
    props: Object,
  },

  emits: [CHECKED_CHANGE_EVENT],

  setup(props, { emit, slots }) {
    const panelState = reactive({
      checked: [],
      allChecked: false,
      query: '',
      inputHover: false,
      checkChangeByUser: true,
    })

    const {
      labelProp,
      keyProp,
      disabledProp,
      filteredData,
      checkedSummary,
      isIndeterminate,
      handleAllCheckedChange,
    } = useCheck(props, panelState, emit)

    const hasNoMatch = computed(() => {
      return panelState.query.length > 0 && filteredData.value.length === 0
    })

    const inputIcon = computed(() => {
      return panelState.query.length > 0 && panelState.inputHover
        ? 'circle-close'
        : 'search'
    })

    const hasFooter = computed(() => !!slots.default()[0].children.length)

    const clearQuery = () => {
      if (inputIcon.value === 'circle-close') {
        panelState.query = ''
      }
    }

    const {
      checked,
      allChecked,
      query,
      inputHover,
      checkChangeByUser,
    } = toRefs(panelState)

    return {
      labelProp,
      keyProp,
      disabledProp,
      filteredData,
      checkedSummary,
      isIndeterminate,
      handleAllCheckedChange,

      checked,
      allChecked,
      query,
      inputHover,
      checkChangeByUser,

      hasNoMatch,
      inputIcon,
      hasFooter,
      clearQuery,

      t,
    }
  },
})
</script>
