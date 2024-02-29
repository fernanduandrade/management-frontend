<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import ClientApi from '~/api/Client/ClientApi'
import { ClientDTO } from '~/clients/types/index'
import { useFilter } from '~/composables/useFilter'
import useModal from '~/common/logic/use-modal'
import ClientForm from '~/clients/components/ClientForm.vue'
const clientColumn = ref<string[]>([
  'name', 'lastName', 'isActive', 'phone', 'debt', 'credit',
])

const clients = ref<ClientDTO[]>([])
const { search, data } = useFilter(clients, 'name')

const currentPage = ref(1)
const pageSize = ref(10)
const hasPreviousPage = ref(false)
const hasNextPage = ref(false)
const totalPages = ref(0)
const totalCount = ref(0)

async function getClients(pageNumber: number, pageSize: number) {
  const { data } = await ClientApi.getClientsPaginate({ pageNumber, pageSize })
  clients.value = data.items
  hasPreviousPage.value = data.hasPreviousPage
  hasNextPage.value = data.hasNextPage
  totalPages.value = data.totalPages
  totalCount.value = data.totalCount
}

onMounted(async() => {
  await getClients(1, 10)
})

const storeModal = useModal()

function createClientModal() {
  storeModal.openModal({ component: markRaw(ClientForm) })
}

const { modalEmitValue } = storeToRefs(storeModal)

watch(modalEmitValue, (value) => {
  clients.value.push(value as ClientDTO)
})

async function changeClientPage(evt: any) {
  await getClients(evt.pageNumber, evt.pageSize)
}

</script>
<template>
  <main class="container">
    <div class="client__actions">
      <VInputSearch v-model="search" placeholder="Pesquise pelo nome" />
      <VButton @click="createClientModal">
        Novo cliente
      </VButton>
    </div>
    <VTable
      :columns="clientColumn"
      :data="data"
      page="clients"
    />
    <Pagination
      :total-count="totalCount"
      :total-pages="totalPages"
      :page-number="currentPage"
      :page-size="pageSize"
      @update-page="changeClientPage"
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

.client__actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
