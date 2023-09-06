<script lang="ts" setup>
const attrs = useAttrs()

type InputSearchProp = {
  placeholder: string
  modelValue: string | number
  type?: string
}
const props = withDefaults(defineProps<InputSearchProp>(), {
  type: 'text',
})
defineEmits(['update:modelValue'])

const hasInput = computed(() => {
  if (['null', 'undefined'].includes(`${props.modelValue}`))
    return false

  return !!props.modelValue
})

const cssClasses = computed(() => {
  const classs = {
    'input__wrapper': true,
    'input--active': hasInput.value && !Object.hasOwnProperty.call(attrs, 'disabled'),
  }
  return classs
})
</script>

<template>
  <div>
    <input
      :class="cssClasses"
      :placeholder="placeholder"
      :value="modelValue"
      v-bind="$attrs"
      :type="type"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<style scoped>
.input__wrapper {
  width: 100%;
  height: 44px;
  padding: 0px 20px 0px 20px;
  font-family: 'Nunito', sans-serif;
  border-radius: 6px;
  transition: .2s ease-in;
  border: 1px solid #dfdede;
}

.input__wrapper:hover {
  border: 1px solid #333;
}

.input--active {
  border: 1px solid #333;
}
</style>
