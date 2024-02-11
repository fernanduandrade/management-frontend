<script lang="ts" setup>
import useModal from '~/common/logic/use-modal'
import ProductApi from '~/api/Product/ProductApi'
import { ProductDTO } from '~/products/types'

const productInput = ref('')
const isLoadingAutoComplete = ref(false)
const autocompleteOptions = ref<ProductDTO[]>([])
const clearInput = () => {
  productInput.value = ''
  autocompleteOptions.value = []
}
const modal = useModal()
async function addProduct() {
  modal.closeModal()
}

const onSelectProduct = (evt: any) => {
  console.log(evt)
}

const searchAutocomplete = async(input: string) => {
  isLoadingAutoComplete.value = true
  console.log(input)

  const result = await ProductApi.getProductAutoComplete(input)
  autocompleteOptions.value = result.data
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
  background-color: #FFFFFF;
  padding: 1rem;

  border-radius: 1rem;
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
