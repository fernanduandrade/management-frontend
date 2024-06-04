<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import { formatCurrency } from '~/common/logic'
import ProductApi from '~/api/Product/ProductApi'
import { ProductDTO } from '~/products/types'
import DeleteForm from '~/common/components/Forms/DeleteForm.vue'
const route = useRoute()
const modal = useModal()
const toast = useToast()

const product = ref<ProductDTO>()
const editProductData = ref<ProductDTO>()
const onEditing = ref(false)

function editInfo() {
  onEditing.value = !onEditing.value
  editProductData.value = { ...product.value! }
}

const onSubscribeEvent = ref('')

async function getProduct() {
  const productId = route.params.id as string
  const { data } = await ProductApi.getById(productId)
  product.value = data
}

async function updateProduct() {
  product.value = { ...editProductData.value! }
  await ProductApi.update(product.value)
  editProductData.value = undefined
  toast.success('Dados atualizados')
  onEditing.value = !onEditing.value
}

onMounted(async() => {
  await getProduct()
})

const openDeleteProductModal = () => {
  onSubscribeEvent.value = uuidv4()
  modal.open({
    component: markRaw(DeleteForm),
    description: 'Remover produto',
    props: { id: product.value?.id, resource: 'products' },
  },
  )
}

</script>

<template>
  <main class="wrapper shadow-sm">
    <div class="client__actions">
      <div class="flex flex-col">
        <h1 class="text-2xl font-mono">
          {{ product?.name }}
        </h1>
        <h3 class="text-md font-mono text-gray-600">
          {{ product?.description }}
        </h3>
      </div>

      <div class="flex items-center gap-3">
        <VButton v-if="!onEditing" icon="fa-pen" :transparent="true" :outline="true" @click="editInfo">
          Editar
        </VButton>
        <VButton v-if="!onEditing" icon="fa-trash" background-color="red" @click="openDeleteProductModal">
          Excluir
        </VButton>

        <VButton v-if="onEditing" icon="fa-xmark" background-color="red" @click="onEditing = !onEditing">
          Cancelar
        </VButton>
        <VButton v-if="onEditing" @click="updateProduct">
          Salvar
        </VButton>
      </div>
    </div>

    <div v-if="!onEditing" class="flex gap-2 flex-col">
      <h3 class="text-[30px] font-semibold">
        Dados:
      </h3>
      <div class="flex flex-col gap-3">
        <span class="text-xl">Preço: {{ formatCurrency(product?.price) }}</span>
        <span class="text-xl">Quantidade: {{ product?.quantity }}</span>
      </div>
    </div>

    <div v-else class="flex gap-2 flex-col">
      <div class="flex flex-col gap-2">
        <VInputText
          v-model="editProductData!.name"
          type="text"
          placeholder="Nome"
        />
      </div>
      <div class="flex flex-col gap-2">
        <VInputText
          v-model="editProductData!.description"
          type="text"
          placeholder="Descrição"
        />
      </div>
      <div class="flex flex-col gap-2">
        <VInputText
          v-model="editProductData!.quantity"
          type="number"
          placeholder="Quantidade"
        />
      </div>

      <div class="flex flex-col gap-2">
        <VInputText
          v-model="editProductData!.price"
          type="number"
          placeholder="Preço"
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
