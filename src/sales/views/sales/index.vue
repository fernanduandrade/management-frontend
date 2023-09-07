<script lang="ts" setup>
import SaleApi from '~/api/Sale/SaleApi'
import { SaleDTO } from '~/sales/types/index'
// import useModal from '~/common/logic/use-modal'
// import ProductForm from '~/products/components/ProductForm.vue'
const saleColumn = ref<string[]>([
  'clientName', 'totalPrice', 'pricePerUnit', 'saleDate', 'quantity',
])

const sales = ref<SaleDTO[]>([])

onMounted(async() => {
  const result = await SaleApi.getSalesPaginate({ pageNumber: 1, pageSize: 10 })
  sales.value = result.data.items
})

const search = ref<string>('')

const filteredSales = computed(() => {
  return sales.value.filter((item: SaleDTO) => {
    return (
      item.clientName.toLowerCase().includes(search.value.toLowerCase())
    )
  })
})

// const storeModal = useModal()

// function createProductModal() {
//   storeModal.openModal({ component: markRaw(ProductForm) })
// }

// TODO sort in view
// TODO emit product created to parent
// TODO intercionalizar
</script>
<template>
  <main class="container">
    <div class="sale__actions">
      <VInputSearch v-model="search" placeholder="Pesquise pelo nome do cliente" />
      <VButton>
        Nova venda
      </VButton>
    </div>
    <VTable
      :columns="saleColumn"
      :data="filteredSales"
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
