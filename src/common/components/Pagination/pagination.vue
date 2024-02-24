<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Dropdown from 'primevue/dropdown'
import { prop } from 'ramda'

interface Pagination {
  pageNumber: number
  totalCount: number
  pageSize: number
  totalPages: number
}

type PageValue = Pick<Pagination, 'pageNumber' | 'pageSize'>

const emit = defineEmits<{
  (event: 'update-page', value: PageValue): void
}>()

const props = defineProps<Pagination>()

const pageSizeOptions = ([
  { name: '10', value: 10 },
  { name: '20', value: 20 },
  { name: '50', value: 50 },
  { name: '75', value: 75 },
  { name: '100', value: 100 },
])

const pageNumberOptions = computed(() => {
  return Array.from({ length: props.totalPages }, (_, index) => ({
    name: String(index + 1),
    value: index + 1,
  }))
})

const currentPageSize = ref(10)
const currentPage = ref(1)
const refPage = ref(1)

const emitEventPageChange = (pageSize: number, pageNumber: number): void => {
  const pageValue: PageValue = {
    pageNumber,
    pageSize,
  }
  emit('update-page', pageValue)
}

function updatePage(changeOnArrow = false) {
  const pageSize = prop('value', currentPageSize.value) || 10
  if (changeOnArrow) {
    emitEventPageChange(pageSize, currentPage.value)
    return
  }
  const pageNumber = prop('value', currentPage.value) || 1
  refPage.value = pageNumber
  emitEventPageChange(pageSize, pageNumber)
}

function updateOnArrow(action: number) {
  if ((refPage.value + action) < 1 || (refPage.value + action) > props.totalPages)
    return

  refPage.value += action
  currentPage.value = refPage.value

  updatePage(true)
}

</script>
<template>
  <div class="flex justify-between items-center border-t-[1px] p-[10px] border-[#bec1ca]">
    <div class="flex items-center font-medium text-xl gap-5 text-[#53545C]">
      <Dropdown
        v-model="currentPageSize"
        class="shadow-md"
        :options="pageSizeOptions"
        option-label="name"
        :placeholder="`${currentPageSize}`"
        @update:modelValue="updatePage(false)"
      />

      <span>Itens por página</span>
      <span>1-{{ currentPageSize }} de {{ totalCount }} registros</span>
    </div>
    <div class="flex items-center text-xl gap-5 text-[#53545C]">
      <Dropdown
        v-model="currentPage"
        class="shadow-md"
        :options="pageNumberOptions"
        option-label="name"
        :placeholder="`${currentPage}`"
        @update:modelValue="updatePage(false)"
      />
      <span>de {{ totalPages }} páginas</span>
      <div class="flex gap-4">
        <font-awesome-icon
          class="hover:cursor-pointer"
          icon="fa-angle-left"
          @click="updateOnArrow(-1)"
        />
        <font-awesome-icon
          class="hover:cursor-pointer"
          icon="fa-angle-right"
          @click="updateOnArrow(1)"
        />
      </div>
    </div>
  </div>
</template>
