<script lang="ts" setup>
import { CreateSaleDTO } from '~/sales/types/index'
import SaleApi from '~/api/Sale/SaleApi'
import { ResultType } from '~/common/types/ResponseDTO'
import { formatCurrency } from '~/common/logic'
import { ProductDTO } from '~/products/types'
import ProductApi from '~/api/Product/ProductApi'

const modal = useModal()
const toast = useToast()

const searchInput = ref('')
const productOptions = ref<ProductDTO[]>([])
const autocompleteOptions = ref<string[]>([])

const form = reactive<CreateSaleDTO>({
  clientName: '',
  pricePerUnit: 0,
  productId: '',
  saleDate: '',
  quantity: 0,
})

const totalSold = computed(() => {
  const soldValue = form.quantity * form.pricePerUnit
  form.totalPrice = soldValue
  return formatCurrency(soldValue)
})

async function createSale() {
  const response = await SaleApi.createSale(form)
  switch (response.type) {
    case ResultType.success:
      toast.success(response.message)
      modal.setFormValue(response.data)
      modal.closeModal()
      break
    case ResultType.warning:
      toast.warning(response.message)
      break
    default:
      break
  }
}

const clearInput = () => {
  searchInput.value = ''
  productOptions.value = []
}

const onSelectProduct = (evt: string) => {
  const product = productOptions.value.find(x => x.name === evt)
  form.productId = product!.id
}

const searchAutocomplete = async(input: string) => {
  const result = await ProductApi.getProductAutoComplete(input)
  productOptions.value = result.data
  autocompleteOptions.value = result.data.map(product => product.name)
}

</script>

<template>
  <div class="wrapper">
    <form class="form">
      <div>
        <label class="font-semibold" for="">Nome do cliente</label>
        <VInputText v-model="form.clientName" placeholder="Nome do cliente" />
      </div>
      <div>
        <label class="font-semibold" for="">Preço da unidade</label>
        <VInputText v-model="form.pricePerUnit" placeholder="Preço da unidade" />
      </div>
      <div>
        <label class="font-semibold" for="">Quantidade vendida</label>
        <VInputText v-model="form.quantity" type="number" placeholder="Quantidade" />
      </div>
      <div>
        <label class="font-semibold" for="">Data da venda</label>
        <VInputText v-model="form.saleDate" type="date" placeholder="Data da venda" />
      </div>
      <div>
        <AutoComplete
          v-model="searchInput"
          :options="autocompleteOptions"
          label="Nome do produto"
          @shouldSearch="searchAutocomplete($event as string)"
          @select="onSelectProduct"
          @clearInput="clearInput"
        />
      </div>
    </form>
    <div class="form__button">
      <span class="font-bold text-gray-700 text-xl">Total - {{ totalSold }}</span>
      <div class="flex items-center gap-2 self-center">
        <VButton :transparent="true" @click="modal.closeModal">
          Cancelar
        </VButton>
        <VButton @click="createSale">
          Cadastrar
        </VButton>
      </div>
    </div>
  </div>
</template>

<style scoped>

.wrapper {
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 6rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.form__button {
  display: flex;
  flex-direction: column;
}

</style>
