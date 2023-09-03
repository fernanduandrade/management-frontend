<script lang="ts" setup>
import ProductApi from '~/api/Product/ProductApi'
import { Product } from '~/api/Product/response/IGetProductPaginateResponse'
const productsColumn = ref<string[]>([
  'name', 'price', 'description', 'quantity',
])

const products = ref<Product[]>([])

onMounted(async() => {
  const result = await ProductApi.getProductSPaginate({ pageNumber: 1, pageSize: 10 })
  products.value = result.data.items
})

</script>
<template>
  <VTable
    :columns="productsColumn"
    :data="products"
  >
    <template #actions>
    </template>
  </VTable>
</template>
