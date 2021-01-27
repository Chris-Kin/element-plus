<template>
  <transition-group
    tag="ul"
    :class="[
      'NAMESPACE-upload-list',
      'NAMESPACE-upload-list--' + listType,
      { 'is-disabled': disabled }
    ]"
    name="NAMESPACE-list"
  >
    <li
      v-for="(file, idx) in files"
      :key="idx"
      :class="['NAMESPACE-upload-list__item', 'is-' + file.status, focusing ? 'focusing' : '']"
      tabindex="0"
      @keydown.delete="!disabled && handleRemove($event, file)"
      @focus="focusing = true"
      @blur="focusing = false"
      @click="onFileClicked"
    >
      <slot :file="file">
        <img
          v-if="file.status !== 'uploading' && ['picture-card', 'picture'].includes(listType)"
          class="NAMESPACE-upload-list__item-thumbnail"
          :src="file.url"
          alt=""
        >
        <a class="NAMESPACE-upload-list__item-name" @click="handleClick(file)">
          <i class="NAMESPACE-icon-document"></i>{{ file.name }}
        </a>
        <label class="NAMESPACE-upload-list__item-status-label">
          <i
            :class="{
              'NAMESPACE-icon-upload-success': true,
              'NAMESPACE-icon-circle-check': listType === 'text',
              'NAMESPACE-icon-check': ['picture-card', 'picture'].includes(listType)
            }"
          ></i>
        </label>
        <i v-if="!disabled" class="NAMESPACE-icon-close" @click="handleRemove($event, file)"></i>
        <!-- Due to close btn only appears when li gets focused disappears after li gets blurred, thus keyboard navigation can never reach close btn-->
        <!-- This is a bug which needs to be fixed -->
        <!-- TODO: Fix the incorrect navigation interaction -->
        <i v-if="!disabled" class="NAMESPACE-icon-close-tip">{{ t('el.upload.deleteTip') }}</i>
        <NAMESPACE-progress
          v-if="file.status === 'uploading'"
          :type="listType === 'picture-card' ? 'circle' : 'line'"
          :stroke-width="listType === 'picture-card' ? 6 : 2"
          :percentage="parsePercentage(file.percentage)"
        />
        <span v-if="listType === 'picture-card'" class="NAMESPACE-upload-list__item-actions">
          <span
            class="NAMESPACE-upload-list__item-preview"
            @click="handlePreview(file)"
          >
            <i class="NAMESPACE-icon-zoom-in"></i>
          </span>
          <span
            v-if="!disabled"
            class="NAMESPACE-upload-list__item-delete"
            @click="handleRemove($event, file)"
          >
            <i class="NAMESPACE-icon-delete"></i>
          </span>
        </span>
      </slot>
    </li>
  </transition-group>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NOOP } from '@vue/shared'

import { t } from '@element-plus/locale'
import NAMESPACEProgress from '@element-plus/progress'

import type { PropType } from 'vue'

export default defineComponent({
  name: 'NAMESPACEUploadList',
  components: { NAMESPACEProgress },
  props: {
    files: {
      type: Array as PropType<File[]>,
      default: () => [] as File[],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    handlePreview: {
      type: Function as PropType<(file: File) => void>,
      default: () => NOOP,
    },
    listType: {
      type: String as PropType<'picture' | 'picture-card' | 'text'>,
      default: 'text',
    },
  },
  emits: ['remove'],
  setup(props, { emit }) {
    const parsePercentage = (val: string) => {
      return parseInt(val, 10)
    }

    const handleClick = (file: File) => {
      props.handlePreview(file)
    }

    const onFileClicked = (e: Event) => {
      (e.target as HTMLElement).focus()
    }

    const handleRemove = (e: Event, file: File) => {
      emit('remove', file)
    }
    return {
      focusing: ref(false),
      parsePercentage,
      handleClick,
      handleRemove,
      onFileClicked,
      t,
    }
  },
})
</script>
