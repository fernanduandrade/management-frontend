<script lang="ts" setup>
import { toast } from 'vue3-toastify'
import { CreateClientDTO } from '~/clients/types/index'
import ClientApi from '~/api/Client/ClientApi'
import useModal from '~/common/logic/use-modal'
import { ResultType } from '~/common/types/ResponseDTO'
import 'vue3-toastify/dist/index.css'
const store = useModal()

const form = reactive<CreateClientDTO>({
  credit: 0,
  debt: 0,
  isActive: true,
  lastName: '',
  name: '',
  phone: '',
})
async function createClient() {
  const response = await ClientApi.createClient(form)
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
        <label for="">Nome do cliente</label>
        <VInputText v-model="form.name" placeholder="Nome" />
      </div>
      <div>
        <label for="">Sobrenome do cliente</label>
        <VInputText v-model="form.lastName" placeholder="Sobrenome" />
      </div>
      <div>
        <label for="">Crédito</label>
        <VInputText v-model="form.credit" type="number" placeholder="Crédito" />
      </div>
      <div>
        <label for="">Débito</label>
        <VInputText v-model="form.debt" type="number" placeholder="Débito" />
      </div>
      <div>
        <label for="">Telefone</label>
        <VInputText v-model="form.phone" type="number" placeholder="Telefone" />
      </div>
    </form>
    <div class="form__button">
      <VButton @click="createClient">
        Cadastrar
      </VButton>
    </div>
  </div>
</template>

<style scoped>

.wrapper {
  width: 600px;
  height: 650px;
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
