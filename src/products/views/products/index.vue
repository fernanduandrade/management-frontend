<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import ProductApi from '~/api/Product/ProductApi'
import { ProductDTO } from '~/products/types/index'
import ProductForm from '~/products/components/ProductForm.vue'
import { useFilter } from '~/composables/useFilter'
const productsColumn = ref<string[]>([
  'name', 'price', 'description', 'quantity',
])

const currentPage = ref(1)
const pageSize = ref(10)
const hasPreviousPage = ref(false)
const hasNextPage = ref(false)
const totalPages = ref(0)
const totalCount = ref(0)
const products = ref<ProductDTO[]>([])
const { search, data } = useFilter(products, 'name')
const storeModal = useModal()
const { modalEmitValue } = storeToRefs(storeModal)

watch(modalEmitValue, (value) => {
  products.value.push(value as ProductDTO)
})

function createProductModal() {
  storeModal.openModal({ component: markRaw(ProductForm) })
}

async function getProducts(pageNumber: number, pageSize: number) {
  const { data } = await ProductApi.getProductsPaginate({ pageNumber, pageSize })
  products.value = data.items
  hasPreviousPage.value = data.hasPreviousPage
  hasNextPage.value = data.hasNextPage
  totalPages.value = data.totalPages
  totalCount.value = data.totalCount
}

async function changeProductPage(evt: any) {
  await getProducts(evt.pageNumber, evt.pageSize)
}

onMounted(async() => {
  await getProducts(1, 10)
})

</script>
<template>
  <main class="container">
    <div class="product__header">
      <h3 class="text-[25px]">
        Cadastrado de produtos
      </h3>
      <div class="product__actions">
        <VInputSearch v-model="search" placeholder="Pesquise pelo nome" />
        <VButton @click="createProductModal">
          Adicionar produto
        </VButton>
      </div>
    </div>
    <VTable
      :columns="productsColumn"
      :data="data"
      page="products"
    >
    </VTable>
    <Pagination
      :total-count="totalCount"
      :total-pages="totalPages"
      :page-number="currentPage"
      :page-size="pageSize"
      @update-page="changeProductPage"
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
.product__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: 10px;
}

.product__actions {
  display: flex;
  gap: 15px ;
}

</style>
