<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import { storeToRefs } from 'pinia'
import { formatCurrency } from '~/common/logic'
import ClientApi from '~/api/Client/ClientApi'
import { ClientDTO } from '~/clients/types'
import AddClientInputForm from '~/clients/components/AddClientInputForm.vue'

const route = useRoute()
const modal = useModal()

const { modalEmitValue } = storeToRefs(modal)

const client = ref<ClientDTO>()
const editClientData = ref<ClientDTO>()
const onEditing = ref(false)

function editInfo() {
  onEditing.value = !onEditing.value
  editClientData.value = { ...client.value! }
}

const onSubscribeEvent = ref('')

async function getClient() {
  const orderId = route.params.id as string
  const { data } = await ClientApi.getById(orderId)
  client.value = data
}

async function updateClient() {
  client.value = { ...editClientData.value! }
  await ClientApi.updateClient(client.value)
  editClientData.value = undefined
}

onMounted(async() => {
  await getClient()
})
const openInputModal = () => {
  onSubscribeEvent.value = uuidv4()
  modal.open({ component: markRaw(AddClientInputForm), props: { id: client.value?.id }, subscribe: onSubscribeEvent.value })
}

async function updateStatus() {
  client.value!.isActive = !client.value?.isActive
  await ClientApi.updateStatus({ id: client.value?.id })
}

watch(modalEmitValue, async(newValue) => {
  if (newValue === onSubscribeEvent.value)
    await getClient()
})
</script>

<template>
  <main class="wrapper shadow-sm">
    <div class="client__actions">
      <h1 class="text-2xl font-mono">
        {{ client?.name }} {{ client?.lastName }}
      </h1>
      <div class="flex items-center gap-3">
        <VButton
          v-if="!onEditing"
          :transparent="true"
          :outline="true"
          @click="updateStatus"
        >
          {{ client?.isActive ? 'INATIVAR' : 'ATIVAR' }}
        </VButton>
        <VButton v-if="!onEditing" icon="fa-pen" :transparent="true" :outline="true" @click="editInfo">
          Editar
        </VButton>
        <VButton v-if="onEditing" icon="fa-xmark" background-color="red" @click="onEditing = !onEditing">
          Cancelar
        </VButton>
        <VButton v-if="onEditing" @click="updateClient">
          Salvar
        </VButton>
        <VButton v-if="!onEditing" :disabled="!client?.isActive" @click="openInputModal">
          Adicionar insumo
        </VButton>
      </div>
    </div>

    <div v-if="!onEditing" class="flex gap-2 flex-col">
      <h3 class="text-[30px] font-semibold">
        Dados:
      </h3>
      <div class="flex flex-col gap-3">
        <span class="text-xl">Débito: {{ formatCurrency(client?.debt) }}</span>
        <span class="text-xl">Credito: {{ formatCurrency(client?.credit) }}</span>
        <span class="text-xl">
          Telefone: {{ client?.phone ? client.phone.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1)$2-$3') : 'Não informado' }}
        </span>
      </div>
    </div>

    <div v-else class="flex gap-2 flex-col">
      <div class="flex flex-col gap-2">
        <VInputText
          v-model="editClientData!.name"
          type="text"
          placeholder="Nome"
        />
      </div>
      <div class="flex flex-col gap-2">
        <VInputText
          v-model="editClientData!.lastName"
          type="text"
          placeholder="Sobrenome"
        />
      </div>

      <div class="flex flex-col gap-2">
        <VInputText
          v-model="editClientData!.phone"
          type="text"
          placeholder="Telefone"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #FFFFFF;
  padding: 2rem;
  border-radius: 9px;
}

.client__actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
}
</style>
