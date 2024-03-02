<script lang="ts" setup>

type ButtonProps = {
  backgroundColor?: string
  disabled?: boolean
  transparent?: boolean
  funcCallBack?: Function
}

withDefaults(defineProps<ButtonProps>(), {
  backgroundColor: '#6552C5',
  transparent: false,
})

</script>

<template>
  <div class="wrapper-button">
    <button
      type="button"
      :style="[transparent
        ? 'background-color: transparent; color: #333'
        : `background-color: ${backgroundColor}; color: #fff`]"
      class="font-bold p-3 border-none
        rounded-lg transition-all active:translate-y-1"
      :disabled="disabled"
    >
      <slot></slot>
    </button>
  </div>
</template>

<style scoped>
button:disabled {
  @apply bg-slate-300 hover:cursor-not-allowed !important
}

button:hover {
  opacity: 0.9 !important;
}
</style>
