<script lang="ts" setup>
import { CreateProductDTO } from '~/products/types/index'
import ProductApi from '~/api/Product/ProductApi'
import { ResultType } from '~/common/types/ResponseDTO'

const modal = useModal()
const toast = useToast()

const form = reactive<CreateProductDTO>({
  description: '',
  name: '',
  price: 0,
  quantity: 0,
})
async function createProduct() {
  const response = await ProductApi.create(form)
  switch (response.type) {
    case ResultType.success:
      toast.success(response.message)
      modal.setFormValue(response.data)
      modal.close()
      break
    case ResultType.warning:
      toast.warning(response.message)
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
    <div class="flex items-center self-center gap-4">
      <VButton :transparent="true" @click="modal.close">
        Cancelar
      </VButton>
      <VButton @click="createProduct">
        Cadastrar
      </VButton>
    </div>
  </div>
</template>

<style scoped>

.wrapper {
  width: 600px;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

</style>
