<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import ProductApi from '~/api/Product/ProductApi'
import { ProductDTO } from '~/products/types/index'
import useModal from '~/common/logic/use-modal'
import ProductForm from '~/products/components/ProductForm.vue'
import { useFilter } from '~/composables/useFilter'

const productsColumn = ref<string[]>([
  'name', 'price', 'description', 'quantity',
])

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

onMounted(async() => {
  const result = await ProductApi.getProductsPaginate({ pageNumber: 1, pageSize: 15 })
  products.value = result.data.items
})
</script>
<template>
  <main class="container">
    <div class="product__actions">
      <VInputSearch v-model="search" placeholder="Pesquise pelo nome" />
      <VButton @click="createProductModal">
        Adicionar produto
      </VButton>
    </div>
    <VTable
      :columns="productsColumn"
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
.product__actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
