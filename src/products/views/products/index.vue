<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import Dropdown from 'primevue/dropdown'
import ProductApi from '~/api/Product/ProductApi'
import { ProductDTO } from '~/products/types/index'
import useModal from '~/common/logic/use-modal'
import ProductForm from '~/products/components/ProductForm.vue'
import FontAwesomeIcon from '~/common/modules/fontawesome'
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

async function getProducts(pageNumber: number) {
  const { data } = await ProductApi.getProductsPaginate({ pageNumber, pageSize: 10 })
  products.value = data.items
  hasPreviousPage.value = data.hasPreviousPage
  hasNextPage.value = data.hasNextPage
  totalPages.value = data.totalPages
  totalCount.value = data.totalCount
}

onMounted(async() => {
  const { data } = await ProductApi.getProductsPaginate({ pageNumber: 1, pageSize: 10 })
  products.value = data.items
  hasPreviousPage.value = data.hasPreviousPage
  hasNextPage.value = data.hasNextPage
  totalPages.value = data.totalPages
  totalCount.value = data.totalCount
})

const pageNumberOptions = computed(() => {
  return Array.from({ length: totalPages.value }, (_, index) => ({
    name: String(index + 1),
    value: index + 1,
  }))
})

const pageSizeOptions = ref([
  { name: 10, value: 10 },
  { name: 20, value: 20 },
  { name: 50, value: 10 },
  { name: 75, value: 75 },
  { name: 10, value: 10 },
])
</script>
<template>
  <main class="container">
    <div class="product__header">
      <h3 style="color: var(--text-secondary-dark);">
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
    >
      <template #actions>
      </template>
    </VTable>
    <div class="flex justify-between items-center border-t-[1px] p-[10px] border-[#bec1ca]">
      <div class="flex items-center font-medium text-xl gap-5 text-[#53545C]">
        <Dropdown
          v-model="pageSize"
          class="shadow-md"
          :options="pageSizeOptions"
          option-label="name"
          placeholder="10"
        />

        <span>Itens por página</span>
        <span>1-{{ pageSize }} de {{ totalCount }} registros</span>
      </div>
      <div class="flex items-center text-xl gap-5 text-[#53545C]">
        <Dropdown
          v-model="currentPage"
          class="shadow-md"
          :options="pageNumberOptions"
          option-label="name"
          placeholder="1"
        />
        <span>de {{ totalPages }} páginas</span>
        <div class="flex gap-4">
          <font-awesome-icon class="hover:cursor-pointer" icon="fa-angle-left" />
          <font-awesome-icon class="hover:cursor-pointer" icon="fa-angle-right" />
        </div>
      </div>
    </div>
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

/* .product__pagination {
  border-top: 1px solid #bec1ca;
} */
</style>
