<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import ProductApi from '~/api/Product/ProductApi'
import DeleteProductForm from '~/products/components/DeleteProductForm.vue'
import { ProductDTO } from '~/products/types/index'
import ProductForm from '~/products/components/ProductForm.vue'
import { useFilter } from '~/composables/useFilter'
const productsColumn = ref<string[]>([
  'name', 'price', 'description', 'quantity',
])

const modal = useModal()
const toast = useToast()

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
const ids = ref<string[]>([])
watch(modalEmitValue, (value) => {
  products.value.push(value as ProductDTO)
})

function createProductModal() {
  storeModal.open({ component: markRaw(ProductForm), title: 'Cadastro de Produto' })
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

const onDeleteSub = ref('')

function deleteProductsModal() {
  if (!ids.value.length) {
    toast.info('Nenhum registro selecionado')
    return
  }
  onDeleteSub.value = uuidv4()
  modal.open({
    component: markRaw(DeleteProductForm),
    props: { ids: ids.value },
    title: 'Exclusão de produtos',
    description: 'Você irá excluir todos os produtos selecionados.',
    subscribe: onDeleteSub.value,
  })
}

watch(modalEmitValue, async(newValue) => {
  if (newValue === onDeleteSub.value) {
    await getProducts(1, 10)
    ids.value = []
    return
  }

  await getProducts(1, 10)
})

function onSelectId(evt: string[]) {
  ids.value = evt
}

</script>
<template>
  <main class="container shadow-md">
    <div class="product__actions self-end">
      <VInputSearch v-model="search" placeholder="Pesquise pelo nome" />
      <VButton :transparent="true" :outline="true" @click="deleteProductsModal">
        Deletar pedido(s)
      </VButton>
      <VButton @click="createProductModal">
        Adicionar produto
      </VButton>
    </div>
    <VTable
      :columns="productsColumn"
      :data="data"
      page="products"
      @select-ids="onSelectId"
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

.product__actions {
  display: flex;
  gap: 15px ;
}

</style>
