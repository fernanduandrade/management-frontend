<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import SaleApi from '~/api/Sale/SaleApi'
import { SaleDTO } from '~/sales/types/index'
import { useFilter } from '~/composables/index'
import useModal from '~/common/logic/use-modal'
import SaleForm from '~/sales/components/SaleForm.vue'
const saleColumn = ref<string[]>([
  'clientName', 'totalPrice', 'pricePerUnit', 'saleDate', 'quantity',
])

const sales = ref<SaleDTO[]>([])
const { search, data } = useFilter(sales, 'clientName')

onMounted(async() => {
  const result = await SaleApi.getSalesPaginate({ pageNumber: 1, pageSize: 10 })
  sales.value = result.data.items
})

const storeModal = useModal()

const { modalEmitValue } = storeToRefs(storeModal)

watch(modalEmitValue, (value) => {
  sales.value.push(value as SaleDTO)
})

function createSaleModal() {
  storeModal.openModal({ component: markRaw(SaleForm) })
}

</script>
<template>
  <main class="container">
    <div class="sale__actions">
      <VInputSearch v-model="search" placeholder="Pesquise pelo nome do cliente" />
      <VButton @click="createSaleModal">
        Nova venda
      </VButton>
    </div>
    <VTable
      :columns="saleColumn"
      :data="data"
    >
      <template #actions>
      </template>
    </VTable>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sale__actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
