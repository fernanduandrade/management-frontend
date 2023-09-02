<script lang="ts" setup>
const produtosColumns = ref<string[]>([
  'name', 'value', 'avaliable',
])

type Product = {
  id: string
  name: string
  value: number
  avaliable: boolean
}

const products = ref<Product[]>([
  { avaliable: true, id: '1', name: 'Jarro', value: 22.28 },
  { avaliable: false, id: '2', name: 'Leite', value: 12.28 },
  { avaliable: true, id: '3', name: 'Abobora', value: 2.18 },
  { avaliable: true, id: '4', name: 'Shazam', value: 8.78 },
  { avaliable: true, id: '5', name: 'Pupila', value: 9.28 },
  { avaliable: false, id: '6', name: 'Bolha', value: 6.28 },
  { avaliable: true, id: '7', name: 'Gato', value: 5.28 },
  { avaliable: false, id: '8', name: 'Falcão', value: 2.28 },
])
</script>
<template>
  <h1>PRODUTOS</h1>
  <VTable
    :columns="produtosColumns"
    :data="products"
  >
    <template #actions>
      ações
    </template>
  </VTable>
</template>
