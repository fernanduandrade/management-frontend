<script lang="ts" setup>
import { toast } from 'vue3-toastify'
import { CreateProductDTO } from '~/products/types/index'
import ProductApi from '~/api/Product/ProductApi'
import { ResultType } from '~/common/types/ResponseDTO'
import 'vue3-toastify/dist/index.css'
const store = useModal()

const form = reactive<CreateProductDTO>({
  description: '',
  name: '',
  price: 0,
  quantity: 0,
})
async function createProduct() {
  const response = await ProductApi.createProduct(form)
  switch (response.type) {
    case ResultType.success:
      toast.success(response.message, {
        autoClose: 1000,
      })
      store.setFormValue(response.data)
      store.closeModal()
      break
    case ResultType.warning:
      toast.warning(response.message, {

        autoClose: 1000,
      })
      break
    default:
      break
  }
}
</script>

<template>
  <div class="wrapper">
    <form class="form">
      <div>
        <label for="">Nome do produto</label>
        <VInputText v-model="form.name" placeholder="Nome" />
      </div>
      <div>
        <label for="">Descrição</label>
        <VInputText v-model="form.description" placeholder="Descrição" />
      </div>
      <div>
        <label for="">Preço</label>
        <VInputText v-model="form.price" type="number" placeholder="Preço" />
      </div>
      <div>
        <label for="">Quantidade</label>
        <VInputText v-model="form.quantity" type="number" placeholder="Quantidade" />
      </div>
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
  height: 450px;
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
