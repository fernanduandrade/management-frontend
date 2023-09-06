<script lang="ts" setup>
import ProductApi from '~/api/Product/ProductApi'
import { ProductDTO } from '~/products/types/index'
import useModal from '~/common/logic/use-modal'
import ProductForm from '~/products/components/ProductForm.vue'
const productsColumn = ref<string[]>([
  'name', 'price', 'description', 'quantity',
])

const products = ref<ProductDTO[]>([])

onMounted(async() => {
  const result = await ProductApi.getProductsPaginate({ pageNumber: 1, pageSize: 10 })
  products.value = result.data.items
})

const search = ref<string>('')

const filteredProducts = computed(() => {
  return products.value.filter((item: ProductDTO) => {
    return (
      item.name.toLowerCase().includes(search.value.toLowerCase())
    )
  })
})

const storeModal = useModal()

function createProductModal() {
  storeModal.openModal({ component: ProductForm })
}

// TODO sort in view

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
      :data="filteredProducts"
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
