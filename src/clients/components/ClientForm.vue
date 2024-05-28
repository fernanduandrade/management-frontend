<script lang="ts" setup>
import { CreateClientDTO } from '~/clients/types/index'
import ClientApi from '~/api/Client/ClientApi'
import { ResultType } from '~/common/types/ResponseDTO'

const modal = useModal()
const toast = useToast()

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

watch(() => form.phone, (newValue) => {
  form.phone = newValue.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1)$2-$3')
})

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
        <VInputText v-model="form.phone" type="text" placeholder="Telefone" :max-length="14" />
      </div>
    </form>
    <div class="flex items-center gap-2 self-center">
      <VButton :transparent="true" @click="modal.close">
        Cancelar
      </VButton>
      <VButton @click="createClient">
        Cadastrar
      </VButton>
    </div>
  </div>
</template>

<style scoped>

.wrapper {
  width: 600px;
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
