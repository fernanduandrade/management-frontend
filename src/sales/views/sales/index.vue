<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import SaleApi from '~/api/Sale/SaleApi'
import { SaleDTO } from '~/sales/types/index'
import { useFilter } from '~/composables/index'
import useModal from '~/common/logic/use-modal'
import SaleForm from '~/sales/components/SaleForm.vue'
const saleColumn = ref<string[]>([
  'clientName', 'totalPrice', 'pricePerUnit', 'productName', 'date', 'quantity',
])

const sales = ref<SaleDTO[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const hasPreviousPage = ref(false)
const hasNextPage = ref(false)
const totalPages = ref(0)
const totalCount = ref(0)

const { search, data } = useFilter(sales, 'clientName')

async function getSales(pageNumber: number, pageSize: number) {
  const { data } = await SaleApi.getSalesPaginate({ pageNumber, pageSize })
  sales.value = data.items
  hasPreviousPage.value = data.hasPreviousPage
  hasNextPage.value = data.hasNextPage
  totalPages.value = data.totalPages
  totalCount.value = data.totalCount
}

onMounted(async() => {
  await getSales(1, 10)
})

const storeModal = useModal()

const { modalEmitValue } = storeToRefs(storeModal)

watch(modalEmitValue, (value) => {
  sales.value.push(value as SaleDTO)
})

function createSaleModal() {
  storeModal.openModal({ component: markRaw(SaleForm) })
}

async function changeSalesPage(evt: any) {
  await getSales(evt.pageNumber, evt.pageSize)
}

</script>
<template>
  <main class="container">
    <div class="sale__actions">
      <div class="sale__inputs">
        <VInputSearch v-model="search" placeholder="Pesquise pelo nome do cliente" />
        <VButton @click="createSaleModal">
          Nova venda
        </VButton>
      </div>
    </div>
    <VTable
      :columns="saleColumn"
      :data="data"
      page="sales"
    >
      <template #actions>
      </template>
    </VTable>

    <Pagination
      :total-count="totalCount"
      :total-pages="totalPages"
      :page-number="currentPage"
      :page-size="pageSize"
      @update-page="changeSalesPage"
    />
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: var(--background-color-primary);
  border-radius: 10px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  padding: 1.5rem;
}

.sale__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.sale__inputs {
  display: flex;
  gap: 20px;
}

.sale__made {
  font-weight: 500;
  font-size: 20px;
}
</style>
