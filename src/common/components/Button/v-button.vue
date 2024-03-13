<script lang="ts" setup>

type ButtonProps = {
  backgroundColor?: string
  disabled?: boolean
  transparent?: boolean
  outline?: boolean
  funcCallBack?: Function
  icon?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  backgroundColor: '#6552C5',
  transparent: false,
  outline: false,
  icon: '',
})

const cssClasses = computed(() => {
  return {
    primary: !props.transparent,
    transparent: props.transparent,
    outline: props.transparent && props.outline,
  }
})

</script>

<template>
  <div class="wrapper-button">
    <button
      type="button"
      class="font-bold p-3 border-none
        rounded-lg transition-all active:translate-y-1 flex justify-between items-center gap-3"
      :class="[cssClasses]"
      :disabled="disabled"
    >
      <font-awesome-icon v-if="icon" :icon="icon" :color="transparent ? '#333' : '#ffffff'" /><slot></slot>
    </button>
  </div>
</template>

<style scoped>

.primary {
  background-color: v-bind(backgroundColor);
  opacity: 0.8;
  @apply text-white
}

.transparent {
  @apply text-black bg-transparent hover:bg-slate-200
}

button:disabled {
  @apply bg-slate-300 hover:cursor-not-allowed !important
}

.outline {
  @apply border-solid border-[1px] border-cyan-950;
}

button:hover {
  opacity: 0.9 !important;
}
</style>
