<script lang="ts" setup>
import { formatCurrency } from '~/common/logic'
import { SaleDTO } from '~/sales/types'
import DeleteForm from '~/common/components/Forms/DeleteForm.vue'
import SaleApi from '~/api/Sale/SaleApi'
const route = useRoute()
const modal = useModal()
const toast = useToast()

const sale = ref<SaleDTO>()
const editSaleData = ref<SaleDTO>()
const onEditing = ref(false)

function editInfo() {
  onEditing.value = !onEditing.value
  editSaleData.value = { ...sale.value! }
}

async function getSale() {
  const saleId = route.params.id as string
  const { data } = await SaleApi.getById(saleId)
  sale.value = data
}

async function updateSale() {
  sale.value = { ...editSaleData.value! }
  await SaleApi.update(sale.value)
  editSaleData.value = undefined
  toast.success('Dados atualizados')
  onEditing.value = !onEditing.value
}

onMounted(async() => {
  await getSale()
})

const openDeleteModal = () => {
  modal.open({
    component: markRaw(DeleteForm),
    description: 'Remover venda',
    props: { id: sale.value?.id, resource: 'saleshistory' },
  },
  )
}

</script>

<template>
  <main class="wrapper shadow-sm">
    <div class="client__actions">
      <div class="flex flex-col">
        <h1 class="text-2xl font-mono">
          {{ sale?.clientName }} - {{ sale?.productName }}
        </h1>
      </div>

      <div class="flex items-center gap-3">
        <VButton v-if="!onEditing" icon="fa-pen" :transparent="true" :outline="true" @click="editInfo">
          Editar
        </VButton>
        <VButton v-if="!onEditing" icon="fa-trash" background-color="red" @click="openDeleteModal">
          Excluir
        </VButton>

        <VButton v-if="onEditing" icon="fa-xmark" background-color="red" @click="onEditing = !onEditing">
          Cancelar
        </VButton>
        <VButton v-if="onEditing" @click="updateSale">
          Salvar
        </VButton>
      </div>
    </div>

    <div v-if="!onEditing" class="flex gap-2 flex-col">
      <h3 class="text-[30px] font-semibold">
        Dados:
      </h3>
      <div class="flex flex-col gap-3">
        <span class="text-xl">Venda total: {{ formatCurrency(sale?.totalPrice) }}</span>
        <span class="text-xl">Quantidade & Preço: {{ sale?.quantity }} | {{ formatCurrency(sale?.pricePerUnit) }}</span>
      </div>
    </div>

    <div v-else class="flex gap-2 flex-col">
      <div class="flex flex-col gap-2">
        <VInputText
          v-model="editSaleData!.clientName"
          type="text"
          placeholder="Nome"
        />
      </div>
      <div class="flex flex-col gap-2">
        <VInputText
          v-model="editSaleData!.quantity"
          type="number"
          placeholder="Quantidade"
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
