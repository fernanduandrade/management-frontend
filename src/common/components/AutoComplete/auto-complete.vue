<!-- eslint-disable prefer-regex-literals -->
<template>
  <div id="autocomplete-container">
    <section id="autocomplete-input">
      <label class="font-semibold text-[#333]">
        {{ label }}
      </label>
      <input
        ref="input"
        :class="`search-input ${hasInput ? 'active' : ''}`"
        class="font-semibold"
        type="text"
        :value="keyword"
        :disabled="disabled"
        :placeholder="label"
        @input="onInput($event.target)"
        @focus="focusInput"
        @blur="onBlur"
        @keydown="onKeydown"
      />
    </section>
    <transition>
      <div v-if="mutableOptions?.length" id="autocomplete-options">
        <ul>
          <li
            v-for="(value, index) in mutableOptions"
            :key="value.toString() + index"
            :ref="el => { refs[index] = el }"
            :class="{ 'autocomplete-option' : true, 'background-option' : arrowCount === index }"
            class="font-semibold"
            tabindex="0"
            @click="onSelect(value)"
            @mouseover="setArrowCounter(index)"
          >
            {{ value }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import InputLoading from '~/assets/InputLoading.vue'
import SearchSVG from '~/assets/SearchSVG.vue'
import ClearInputSVG from '~/assets/ClearInputSVG.vue'

const props = defineProps({
  /**
   * Placeholder for the autocomplete input
   * @type {string}
   */
  label: {
    type: String,
    required: true,
    default: '',
  },
  /**
   * The options to filter while search
   * @type {Array}
   */
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
  /**
   * Indicates whether the component is avaliable or not to be use
   * @type {boolean}
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * The text bind to search
   * @type {string}
   */
  modelValue: {
    type: String,
    required: true,
    default: '',
  },
})

const keyword = ref('')
const mutableOptions = ref([])
const clonedOptions = ref([])
const focusColor = ref('#333')
const defaultColor = ref('#dfdede')
const currentColor = ref('#dfdede')
const arrowCount = ref(0)
const refs = ref([])
const input = ref()

const cloneOptions = () => {
  clonedOptions.value = props.options
  mutableOptions.value = props.options
}

const emit = defineEmits(['update:modelValue', 'shouldSearch', 'select', 'clearInput'])

const emitUpdateModelValue = () => emit('update:modelValue', keyword.value)

const formatText = (value) => {
  // eslint-disable-next-line prefer-regex-literals
  const DIACRITCS_REGEXP_PATTERN = new RegExp(/[\u0300-\u036F]/gi)
  // eslint-disable-next-line prefer-regex-literals
  const SPECIAL_CHARACTERS_REGEXP_PATTERN = new RegExp(/[^A-Za-z\d\s]/g)
  return value.normalize('NFD').replace(DIACRITCS_REGEXP_PATTERN, '').replace(SPECIAL_CHARACTERS_REGEXP_PATTERN, ' ').replace(/ +(?= )/g, '').trim().toUpperCase()
}

const hasInput = computed(() => {
  if (['null', 'undefined'].includes(`${props.modelValue}`))
    return false

  return !!props.modelValue
})

watch(() => props.modelValue, (newValue, oldValue) => {
  keyword.value = newValue
})

watch(() => props.options, (newValue, oldValue) => {
  cloneOptions()
})

const searchInternally = () => {
  const search = keyword.value
  mutableOptions.value = clonedOptions.value.filter(option => formatText(option.toString()).includes(formatText(search)))
}

onBeforeMount(() => {
  refs.value = []
})

onMounted(() => {
  keyword.value = props.modelValue

  if (props.options.length)
    cloneOptions()
})

const focusInput = () => {
  currentColor.value = focusColor.value
}

const resetOptions = () => {
  clonedOptions.value = []
  mutableOptions.value = []
}

const resetArrowCounter = () => {
  arrowCount.value = 0
}

const onInput = (target) => {
  const value = target.value
  keyword.value = value
  emitUpdateModelValue()

  if (value.replace(' ', '').length >= 3) {
    if (!clonedOptions.value.length) {
      emit('shouldSearch', value)
      return
    }

    searchInternally()
    return
  }

  resetOptions()
}

const fixScroll = () => {
  refs.value[arrowCount.value].scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'start',
  })
}

const resetKeyword = () => {
  keyword.value = ''
  emitUpdateModelValue()
}
const onBlur = () => {
  resetOptions()
  resetArrowCounter()
  currentColor.value = defaultColor.value
}

const onClear = () => {
  emit('select', null)
  emit('clearInput', null)
  resetKeyword()
  resetOptions()
}

const onSelect = (option) => {
  emit('select', option)
  keyword.value = option
  emitUpdateModelValue()
  resetOptions()
  onBlur()
}

const setArrowCounter = number => arrowCount.value = number

const onArrowDown = () => {
  if (arrowCount.value < mutableOptions.value.length - 1)
    arrowCount.value += 1

  fixScroll()
}

const onArrowUp = () => {
  if (arrowCount.value > 0)
    arrowCount.value -= 1

  fixScroll()
}

const onEsc = () => {
  resetArrowCounter()
  resetOptions()
}

const onKeydown = (event) => {
  if (!mutableOptions.value.length) return

  switch (event.code) {
    case 'ArrowDown':
      event.preventDefault()
      onArrowDown()
      break
    case 'ArrowUp':
      event.preventDefault()
      onArrowUp()
      break
    case 'Enter':
      event.preventDefault()
      // eslint-disable-next-line no-case-declarations
      const selected = mutableOptions.value[arrowCount.value]
      onSelect(selected)
      break
    case 'Escape':
      onEsc()
      break
  }
}

</script>

<style scoped>
button {
  border: none;
  background: none;
}

#autocomplete-container {
  position: relative;
}

#autocomplete-input {
  display: flex;
  gap: 3px;
  flex-direction: column;
  position: absolute;
  border-radius: .5rem;
  width: 100%;
}
.search-input {
  box-shadow: none;
  font-size: 16px;
  font-weight: 400;
  font-family: 'Nunito', sans-serif;
  border: 1px solid #dfdede;
  border-radius: 8px;
  background-color: #FFFFFF;
  display: block;
  transition: all .3s;
  height: 48px;
  padding-left: 17px;
  padding-right: 30px;
}

.search-input:hover {
  border: 1px solid #333;
}

.search-input:focus {
  outline: none;
  border-color: #333;
}

.search-input.active {
  border-color: #161617;
}

.search-input.active:focus {
  border-color: #333;
  color: #333;
}

.input-disabled, .search-input input:disabled {
  background-color: #D7D7D7;
}

.autocomplete-option {
  text-overflow: ellipsis;
  height: 24px;
  overflow: hidden;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  color: #161617;
  font-family: 'Nunito', sans-serif;
  margin: 2px 0px;
}

.autocomplete-option:hover {
  @apply bg-gray-200;
  cursor: pointer;
  border-radius: 3px;
}

.background-option {
  background: #FFF;
  border-radius: 3px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

#autocomplete-options {
  box-sizing: border-box;
  position: absolute;
  font-weight: 600;
  top: 70px;
  font-family: 'Nunito', sans-serif;
  background: #FFFFFF;
  border: 1px solid #F1F1F1;
  overflow-x: hidden;
  border-radius: 8px;
  width: fit-content;
  z-index: 10;
  max-height: 92px;
  padding: 8px 9px;
  width: 100%;
  border: 1px solid #333;
}

/* SCROLL */

#autocomplete-options::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.3);
  box-shadow: inset 0 0 3px rgba(0,0,0,0.3);
  background-color: #F1F1F1;
}

#autocomplete-options::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  background-color: #FFF;
}

ul {
  margin: .2px 2px 0 2px;
  margin-left: 0;
  padding: 0;
  list-style-type: none;
}

#autocomplete-options::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,.3);
  box-shadow: inset 0 0 3px rgba(0,0,0,0.3);
  background-color: #732690;
  border-radius: 20px;
}

.clear {
  cursor: pointer;
}

.autocomplete-icon {
  background-color: transparent;
  position: absolute;
  align-self: flex-end;
  right: 0.7rem;
  top: 14px;
  cursor: pointer;
}
</style>
