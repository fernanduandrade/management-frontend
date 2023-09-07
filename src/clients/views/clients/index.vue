<script lang="ts" setup>
import ProductApi from '~/api/Client/ClientApi'
import { ClientDTO } from '~/clients/types/index'
// import useModal from '~/common/logic/use-modal'
// import ProductForm from '~/products/components/ProductForm.vue'
const clientColumn = ref<string[]>([
  'name', 'lastName', 'isActive', 'phone', 'debt', 'credit',
])

const clients = ref<ClientDTO[]>([])

onMounted(async() => {
  const result = await ProductApi.getClientsPaginate({ pageNumber: 1, pageSize: 10 })
  clients.value = result.data.items
})

const search = ref<string>('')

const filteredClients = computed(() => {
  return clients.value.filter((item: ClientDTO) => {
    return (
      item.name.toLowerCase().includes(search.value.toLowerCase())
    )
  })
})

// const storeModal = useModal()

// function createProductModal() {
//   storeModal.openModal({ component: markRaw(ProductForm) })
// }

// TODO sort in view
// TODO emit product created to parent

</script>
<template>
  <main class="container">
    <div class="client__actions">
      <VInputSearch v-model="search" placeholder="Pesquise pelo nome" />
      <VButton>
        Novo cliente
      </VButton>
    </div>
    <VTable
      :columns="clientColumn"
      :data="filteredClients"
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
.client__actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
