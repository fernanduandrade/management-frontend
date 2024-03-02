<script lang="ts" setup>
import OrderApi from '~/api/Order/OrderApi'

const modal = useModal()
const clientName = ref('')
async function createOrder() {
  await OrderApi.addOrder({ clientName: clientName.value })
  modal.closeModal()
}
</script>

<template>
  <main class="container">
    <form class="form">
      <div>
        <VInputText v-model="clientName" type="text" placeholder="Nome" />
      </div>
    </form>
    <div class="form__button">
      <VButton @click="createOrder">
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
