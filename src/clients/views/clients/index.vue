<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import ProductApi from '~/api/Client/ClientApi'
import { ClientDTO } from '~/clients/types/index'
import { useFilter } from '~/composables/useFilter'
import useModal from '~/common/logic/use-modal'
import ClientForm from '~/clients/components/ClientForm.vue'
const clientColumn = ref<string[]>([
  'name', 'lastName', 'isActive', 'phone', 'debt', 'credit',
])

const clients = ref<ClientDTO[]>([])
const { search, data } = useFilter(clients, 'name')

onMounted(async() => {
  const result = await ProductApi.getClientsPaginate({ pageNumber: 1, pageSize: 10 })
  clients.value = result.data.items
})

const storeModal = useModal()

function createClientModal() {
  storeModal.openModal({ component: markRaw(ClientForm) })
}

const { modalEmitValue } = storeToRefs(storeModal)

watch(modalEmitValue, (value) => {
  clients.value.push(value as ClientDTO)
})

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
