<script lang="ts" setup>
import ProductApi from '~/api/Product/ProductApi'
import { ProductDTO } from '~/products/types'

const productInput = ref('')
const isLoadingAutoComplete = ref(false)
const autocompleteOptions = ref<string[]>([])
const productOptions = ref<ProductDTO[]>([])
const selectedProduct = ref<ProductDTO>()
const clearInput = () => {
  productInput.value = ''
  autocompleteOptions.value = []
}
const modal = useModal()
async function addProduct() {
  modal.setFormValue(selectedProduct.value)
  modal.closeModal()
}

const onSelectProduct = (evt: string) => {
  const product = productOptions.value.find(x => x.name === evt)
  selectedProduct.value = product
}

const searchAutocomplete = async(input: string) => {
  isLoadingAutoComplete.value = true

  const result = await ProductApi.getProductAutoComplete(input)
  productOptions.value = result.data
  autocompleteOptions.value = result.data.map(product => product.name)
  isLoadingAutoComplete.value = false
}
</script>

<template>
  <main class="container">
    <form class="form">
      <div>
        <AutoComplete
          v-model="productInput"
          v-model:loading-result="isLoadingAutoComplete"
          :options="autocompleteOptions"
          label="Nome do produto"
          @shouldSearch="searchAutocomplete($event as string)"
          @select="onSelectProduct"
          @clearInput="clearInput"
        />
      </div>
    </form>
    <div class="form__button">
      <VButton @click="addProduct">
        Cadastrar
      </VButton>
    </div>
  </main>
</template>

<style scoped>
.container {
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.form__button {
  align-self: center;
}
</style>
