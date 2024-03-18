<script lang="ts" setup>
import Dropdown from 'primevue/dropdown'
import ClientApi from '~/api/Client/ClientApi'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const modal = useModal()
const inputtOptions = [
  { value: 'Debito', name: 'Debito' },
  { value: 'Credito', name: 'Credito' },
]

const selectInputOption = ref()
const value = ref(0)

async function addClientInput() {
  const payload = {
    id: props.id,
    value: value.value,
    type: selectInputOption.value.value,
  }

  await ClientApi.updateBalance(payload)
  modal.close()
}
</script>

<template>
  <div class="wrapper">
    <form class="form">
      <div>
        <label for="">Valor</label>
        <VInputText v-model="value" placeholder="Valor" />
      </div>
      <div>
        <Dropdown
          v-model="selectInputOption"
          class="shadow-md w-full"
          :options="inputtOptions"
          option-label="name"
          placeholder="Forma de pagamento"
        />
      </div>
    </form>
    <div class="flex items-center gap-2 self-center">
      <VButton :transparent="true" @click="modal.close">
        Cancelar
      </VButton>
      <VButton @click="addClientInput">
        Incluir
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
