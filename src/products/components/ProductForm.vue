<script lang="ts" setup>
import { CreateProductDTO } from '~/products/types/index'
import ProductApi from '~/api/Product/ProductApi'
import useModal from '~/common/logic/use-modal'

const store = useModal()

const form = reactive<CreateProductDTO>({
  description: '',
  name: '',
  price: 0,
  quantity: 0,

})

const emit = defineEmits(['createProduct'])

// TODO add toast messages
// Emit
async function createProduct() {
  emit('createProduct', 'aaaa')
  const response = await ProductApi.createProduct(form)
  if (response.type === 'Success')
    store.closeModal()
}
</script>

<template>
  <div class="wrapper">
    <form class="form">
      <VInputText v-model="form.name" placeholder="Nome" />
      <VInputText v-model="form.description" placeholder="Descrição" />
      <VInputText v-model="form.price" type="number" placeholder="Preço" />
      <VInputText v-model="form.quantity" type="number" placeholder="Quantidade" />
    </form>
    <div class="form__button">
      <VButton @click="createProduct">
        Cadastrar
      </VButton>
    </div>
  </div>
</template>

<style scoped>

.wrapper {
  width: 600px;
  height: 400px;
  background-color: #FFFFFF;
  padding: 1rem;

  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
